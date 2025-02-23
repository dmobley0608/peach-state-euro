"use client"
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { ImageKitProvider, IKUpload } from 'imagekitio-next';
import { supabase } from '@/lib/supabase';
import { IoCloudUpload } from "react-icons/io5";

const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
const authenticator = async () => {
    try {
        const response = await fetch("/api/imagekit/auth");

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};

export default function UploadModal({ isOpen, onClose, remainingUploads }) {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(null);
    const { user } = useUser();

    // Cleanup function for unsaved image
    const cleanupImage = async () => {
        if (uploadedImage) {
            try {
                const fileId = uploadedImage.fileId || uploadedImage.url.split('/').pop().split('.')[0];
                await fetch('/api/imagekit/delete', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ fileId }),
                });
            } catch (error) {
                console.error('Error cleaning up image:', error);
            }
        }
    };

    // Handle modal closure
    const handleClose = async () => {
        if (uploadedImage && !confirm('Are you sure you want to close? The uploaded image will be discarded.')) {
            return;
        }
        await cleanupImage();
        setUploadedImage(null);
        onClose();
    };

    // Clean up on unmount if there's an unsaved image
    useEffect(() => {
        return () => {
            if (uploadedImage && !isOpen) {
                cleanupImage();
            }
        };
    }, []);

    const checkCategoryLimit = async (category) => {
        const { data: userPhotos } = await supabase
            .from('trophy_photos')
            .select('id')
            .eq('user_id', user.id)
            .eq('category', category);

        return userPhotos?.length || 0;
    };

    const onError = (err) => {
        console.error("Upload error:", err);
        setIsUploading(false);
        alert("Failed to upload image: " + err.message);
    };

    const onSuccess = async (res) => {
        // Ensure we're using the full HTTPS URL
        const imageUrl = res.url.startsWith('http')
            ? res.url
            : `https://ik.imagekit.io/7a4ad0swj${res.url}`;

        setUploadedImage({
            ...res,
            url: imageUrl,
            fileId: res.fileId // Store the fileId for cleanup
        });
        setIsUploading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const category = e.target.category.value;
        const currentCount = await checkCategoryLimit(category);

        if (currentCount >= 3) {
            alert(`You can only have 3 photos in the ${category} category. Please delete one to upload more.`);
            return;
        }

        if (!uploadedImage) {
            alert("Please upload an image first");
            return;
        }

        try {
            const { error } = await supabase.from('trophy_photos').insert({
                user_id: user.id.toString(),
                image_url: uploadedImage.url, // Using the full URL
                title: e.target.title.value,
                category: e.target.category.value,
                votes: 0
            });

            if (error) throw error;

            setUploadedImage(null); // Clear the image state on successful save
            alert("Trophy uploaded successfully!");
            onClose();
            window.location.reload();
        } catch (error) {
            console.error('Error saving to database:', error);
            alert('Failed to save: ' + error.message);
            await cleanupImage(); // Clean up image if save fails
        }
    };

    const onUploadStart = () => {
        setIsUploading(true);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Upload Trophy</h2>
                    <span className="text-sm text-gray-600">
                        {remainingUploads} uploads remaining
                    </span>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Photo
                        </label>
                        <div className={`relative ${isUploading ? 'opacity-50' : ''}`}>
                            <ImageKitProvider
                                urlEndpoint={urlEndpoint}
                                publicKey={publicKey}
                                authenticator={authenticator}
                            >
                                <IKUpload
                                    fileName={`trophy-${Date.now()}`}
                                    onSuccess={onSuccess}
                                    onError={onError}
                                    onUploadStart={onUploadStart}
                                    folder="/peach-state-euro/trophies"
                                    className="w-full"
                                />
                            </ImageKitProvider>

                            {/* Upload Status */}
                            {isUploading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded">
                                    <div className="flex items-center space-x-2 text-white">
                                        <IoCloudUpload className="animate-bounce text-2xl" />
                                        <span>Uploading...</span>
                                    </div>
                                </div>
                            )}

                            {/* Upload Success Preview */}
                            {uploadedImage && (
                                <div className="mt-2 p-2 bg-green-50 rounded flex items-center">
                                    <div className="w-12 h-12 relative">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={uploadedImage.url}
                                            alt="Preview"
                                            className="w-full h-full object-cover rounded"
                                        />
                                    </div>
                                    <span className="ml-2 text-green-600 text-sm">Image uploaded successfully!</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Select a category</option>
                            <option value="hunting">Hunting</option>
                            <option value="fishing">Fishing</option>
                        </select>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-2 pt-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isUploading || !uploadedImage}
                            className="px-4 py-2 text-sm font-medium text-white bg-green-600
                                     hover:bg-green-700 rounded-md disabled:opacity-50"
                        >
                            Save Trophy
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
