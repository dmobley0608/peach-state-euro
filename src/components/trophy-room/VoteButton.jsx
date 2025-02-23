'use client'
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { supabase } from '@/lib/supabase';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';

export default function VoteButton({ photoId, initialVotes, onVoteSuccess }) {
    const [votes, setVotes] = useState(initialVotes);
    const [hasVoted, setHasVoted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { user, isSignedIn } = useUser();

    useEffect(() => {
        if (isSignedIn) {
            checkUserVote();
        } else {
            setIsLoading(false);
        }
    }, [photoId, user]);

    const checkUserVote = async () => {
        try {
            const { data } = await supabase
                .from('votes')
                .select('*')
                .eq('photo_id', photoId)
                .eq('user_id', user.id)
                .maybeSingle();

            setHasVoted(!!data);
        } catch (error) {
            console.error('Error checking vote:', error);
        }
        setIsLoading(false);
    };

    const handleVote = async () => {
        if (!isSignedIn) {
            alert('Please sign in to vote!');
            return;
        }

        try {
            setIsLoading(true);

            if (hasVoted) {
                // Remove vote
                const { error: removeVoteError } = await supabase
                    .from('votes')
                    .delete()
                    .eq('photo_id', photoId)
                    .eq('user_id', user.id);

                if (removeVoteError) throw removeVoteError;

                // Decrement vote count
                const { error: updateError } = await supabase
                    .from('trophy_photos')
                    .update({ votes: votes - 1 })
                    .eq('id', photoId);

                if (updateError) throw updateError;

                setVotes(prev => prev - 1);
                setHasVoted(false);
                onVoteSuccess?.(votes - 1);
            } else {
                // Add vote (existing add vote logic)
                const { error: voteError } = await supabase
                    .from('votes')
                    .insert({
                        photo_id: photoId,
                        user_id: user.id
                    });

                if (voteError) throw voteError;

                // Increment vote count
                const { error: updateError } = await supabase
                    .from('trophy_photos')
                    .update({ votes: votes + 1 })
                    .eq('id', photoId);

                if (updateError) throw updateError;

                setVotes(prev => prev + 1);
                setHasVoted(true);
                onVoteSuccess?.(votes + 1);
            }
        } catch (error) {
            console.error('Error managing vote:', error);
            alert('Failed to manage vote: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleVote}
            disabled={!isSignedIn || isLoading}
            className={`flex items-center space-x-1 px-3 py-1 rounded-full
                transition-all duration-300 ${hasVoted
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
            title={hasVoted ? "Click to remove vote" : "Click to vote"}
        >
            {hasVoted ? (
                <IoHeart className="text-lg" />
            ) : (
                <IoHeartOutline className="text-lg" />
            )}
            <span>{votes}</span>
        </button>
    );
}
