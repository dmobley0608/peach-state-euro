'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const TrophyContext = createContext({});

export function TrophyProvider({ children, initialTrophies, initialCategory }) {
    const [trophies, setTrophies] = useState(initialTrophies);
    const [activeCategory, setActiveCategory] = useState(initialCategory || 'hunting');

    const getTrophiesByCategory = (category) => {
        return trophies
            .filter(t => t.category === category)
            .sort((a, b) => b.votes - a.votes);
    };

    useEffect(() => {
        const channel = supabase
            .channel('trophy_changes')
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'trophy_photos'
                },
                async () => {
                    // Fetch fresh data to ensure correct ordering
                    const { data: freshData } = await supabase
                        .from('trophy_photos')
                        .select('*')
                        .order('votes', { ascending: false });

                    if (freshData) {
                        setTrophies(freshData);
                    }
                }
            )
            .subscribe();

        return () => supabase.removeChannel(channel);
    }, []);

    const updateTrophyVotes = (trophyId, newVotes) => {
        setTrophies(current =>
            current.map(t =>
                t.id === trophyId
                    ? { ...t, votes: newVotes }
                    : t
            ).sort((a, b) => b.votes - a.votes)
        );
    };

    const updateTrophyDetails = (trophyId, updates) => {
        setTrophies(current =>
            current.map(t =>
                t.id === trophyId
                    ? { ...t, ...updates }
                    : t
            )
        );
    };

    const removeTrophy = (trophyId) => {
        setTrophies(current => current.filter(t => t.id !== trophyId));
        // Trigger real-time update through subscription
        supabase.channel('trophy_changes').send({
            type: 'broadcast',
            event: 'DELETE',
            payload: { id: trophyId }
        });
    };

    return (
        <TrophyContext.Provider value={{
            trophies,
            getTrophiesByCategory,
            updateTrophyVotes,
            updateTrophyDetails,
            removeTrophy,
            activeCategory,
            setActiveCategory
        }}>
            {children}
        </TrophyContext.Provider>
    );
}

export const useTrophies = () => useContext(TrophyContext);
