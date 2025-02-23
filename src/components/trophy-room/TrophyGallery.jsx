'use client'
import { useState } from 'react';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import { IoEllipsisVertical, IoTrash, IoPencil } from 'react-icons/io5';
import VoteButton from './VoteButton';
import EditPhotoModal from './EditPhotoModal';
import { useTrophies } from '@/contexts/TrophyContext';
import { deletePhoto } from '@/utils/photo';
import TrophyTabs, { TrophyTabPanel } from './TrophyTabs';

export default function TrophyGallery() {
    const { trophies, updateTrophyVotes, updateTrophyDetails, activeCategory, removeTrophy } = useTrophies();
    const [editingPhoto, setEditingPhoto] = useState(null);
    const { user } = useUser();

    const handleDelete = async (trophy) => {
        if (window.confirm('Are you sure you want to delete this photo? This action cannot be undone.')) {
            try {
                await deletePhoto(trophy.id, trophy.image_url);
                removeTrophy(trophy.id);
            } catch (error) {
                console.error('Error deleting photo:', error);
                alert('Failed to delete photo: ' + error.message);
            }
        }
    };

    const TrophyGrid = ({ trophies, title }) => (
        <div className="mb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {trophies.map((trophy) => (
                    <div key={trophy.id} className="relative group">
                        <div className="aspect-square relative overflow-hidden rounded-lg">
                            <Image
                                src={trophy.image_url}
                                alt={trophy.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 768px) 50vw, 25vw"
                            />
                            {/* Owner Controls */}
                            {user?.id === trophy.user_id && (
                                <>
                                    {/* Edit Button */}
                                    <button
                                        onClick={() => setEditingPhoto(trophy)}
                                        className="absolute top-2 left-2 p-2 bg-black/60 hover:bg-black/80
                                                 text-white rounded-full transition-all duration-200
                                                 hover:scale-110"
                                        title="Edit photo"
                                    >
                                        <IoPencil className="w-4 h-4" />
                                    </button>
                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleDelete(trophy)}
                                        className="absolute top-2 right-2 p-2 bg-red-500/60 hover:bg-red-500/80
                                                 text-white rounded-full transition-all duration-200
                                                 hover:scale-110"
                                        title="Delete photo"
                                    >
                                        <IoTrash className="w-4 h-4" />
                                    </button>
                                </>
                            )}
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                            <p className="text-white bg-black/20 mb-2 rounded">{trophy.title}</p>
                            <VoteButton
                                photoId={trophy.id}
                                initialVotes={trophy.votes}
                                onVoteSuccess={(newVotes) => updateTrophyVotes(trophy.id, newVotes)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const currentTrophies = trophies.filter(t => t.category === activeCategory);

    return (
        <>
            <TrophyGrid
                trophies={currentTrophies}
                title={`${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Trophies`}
            />

            {editingPhoto && (
                <EditPhotoModal
                    photo={editingPhoto}
                    isOpen={true}
                    onClose={() => setEditingPhoto(null)}
                    onUpdate={(updatedPhoto) => {
                        updateTrophyDetails(updatedPhoto.id, updatedPhoto);
                        setEditingPhoto(null);
                    }}
                />
            )}
        </>
    );
}
