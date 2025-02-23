"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { IoCloseCircle } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const ImageGallery = ({ images }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    // Add check for mobile device
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768); // 768px is typical md breakpoint
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handlePrevious = (e) => {
        e.stopPropagation();
        setSelectedImageIndex(prev =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    const handleNext = (e) => {
        e.stopPropagation();
        setSelectedImageIndex(prev =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    };

    const handleKeyDown = (e) => {
        if (selectedImageIndex === null) return;

        if (e.key === 'ArrowLeft') handlePrevious(e);
        if (e.key === 'ArrowRight') handleNext(e);
        if (e.key === 'Escape') setSelectedImageIndex(null);
    };

    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [selectedImageIndex]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="">
            {/* Image Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images?.map((image, index) => (
                    <div
                        key={image._id}
                        className={`relative aspect-square transition-opacity animate-fadeIn
                            ${!isMobile ? 'cursor-pointer hover:opacity-90' : ''}`}
                        onClick={() => !isMobile && setSelectedImageIndex(index)}
                    >
                        <Image
                            src={urlFor(image.image).url()}
                            alt={image.title || "Gallery image"}
                            fill
                            sizes="(max-width: 640px) 100vw,
                                   (max-width: 768px) 50vw,
                                   (max-width: 1024px) 33vw,
                                   25vw"
                            className="object-cover rounded-lg"
                            loading='lazy'
                        />
                    </div>
                ))}
            </div>

            {/* Modal - Only render on non-mobile devices */}
            {!isMobile && selectedImageIndex !== null && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedImageIndex(null)}
                >
                    <div className="relative max-w-4xl w-full h-auto">
                        <button
                            className="absolute -top-4 -right-4 text-white text-4xl z-10 hover:text-gray-300"
                            onClick={() => setSelectedImageIndex(null)}
                        >
                            <IoCloseCircle />
                        </button>

                        {/* Navigation Buttons */}
                        <button
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl z-10 hover:text-gray-300 bg-black bg-opacity-50 rounded-full p-2"
                            onClick={handlePrevious}
                        >
                            <IoIosArrowBack />
                        </button>
                        <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl z-10 hover:text-gray-300 bg-black bg-opacity-50 rounded-full p-2"
                            onClick={handleNext}
                        >
                            <IoIosArrowForward />
                        </button>

                        <div className="relative aspect-[4/3] w-full">
                            <Image
                                src={urlFor(images[selectedImageIndex].image).url()}
                                alt={images[selectedImageIndex].title || "Enlarged gallery image"}
                                fill
                                sizes="100vw"
                                className="object-contain rounded-lg"
                                priority
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageGallery;
