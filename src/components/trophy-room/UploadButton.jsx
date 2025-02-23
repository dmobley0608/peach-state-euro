'use client'
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { supabase } from '@/lib/supabase';
import { useTrophies } from '@/contexts/TrophyContext';
import { IoAdd } from "react-icons/io5";
import UploadModal from './UploadModal';

export default function UploadButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uploadCounts, setUploadCounts] = useState({ hunting: 0, fishing: 0 });
    const { isSignedIn, user } = useUser();
    const { activeCategory, trophies } = useTrophies();

    useEffect(() => {
        if (isSignedIn) {
            fetchUploadCounts();
        }
    }, [isSignedIn, user, isModalOpen, trophies]); // Add trophies dependency

    const fetchUploadCounts = async () => {
        try {
            const [huntingData, fishingData] = await Promise.all([
                supabase
                    .from('trophy_photos')
                    .select('id')
                    .eq('user_id', user.id)
                    .eq('category', 'hunting'),
                supabase
                    .from('trophy_photos')
                    .select('id')
                    .eq('user_id', user.id)
                    .eq('category', 'fishing')
            ]);

            setUploadCounts({
                hunting: huntingData.data?.length || 0,
                fishing: fishingData.data?.length || 0
            });
        } catch (error) {
            console.error('Error fetching upload counts:', error);
        }
    };

    if (!isSignedIn) {
        return null;
    }

    const remainingUploads = 3 - uploadCounts[activeCategory];

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                disabled={remainingUploads === 0}
                className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg
                    transition-all duration-300 ${remainingUploads === 0
                        ? 'bg-gray-500 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700'
                    } text-white`}
            >
                <IoAdd className="text-xl" />
                <span>Upload Trophy</span>
                <span className="ml-2 px-2 py-1 bg-black/20 rounded-full text-sm">
                    {remainingUploads} left
                </span>
            </button>

            <UploadModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                remainingUploads={remainingUploads}
            />
        </>
    );
}
