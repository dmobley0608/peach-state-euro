'use client'
import { useTrophies } from '@/contexts/TrophyContext';
import TrophyTabs, { TrophyTabPanel } from './TrophyTabs';
import Image from 'next/image';
import VoteButton from './VoteButton';

export default function TopTrophies() {
    const { getTrophiesByCategory, updateTrophyVotes, activeCategory } = useTrophies();

    const topTrophies = getTrophiesByCategory(activeCategory).slice(0, 3);

    const TrophySection = ({ trophies }) => (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {trophies.map((trophy, index) => (
                <div key={trophy.id} className="relative">
                    <div className="aspect-square relative overflow-hidden rounded-lg">
                        <Image
                            src={trophy.image_url}
                            alt={trophy.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            priority={index < 3}
                        />
                    </div>
                    <div className="absolute top-2 left-2 bg-black/60 px-3 py-1 rounded-full text-white">
                        #{index + 1} • {trophy.votes} votes
                    </div>
                    <div className="absolute bottom-2 right-2">
                    <p className="hidden md:block text-white bg-black/20 mb-2 rounded">{trophy.title}</p>
                        <VoteButton
                            photoId={trophy.id}
                            initialVotes={trophy.votes}
                            onVoteSuccess={(newVotes) => updateTrophyVotes(trophy.id, newVotes)}
                        />
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="mb-12">
            <TrophySection trophies={topTrophies} />
        </div>
    );
}
