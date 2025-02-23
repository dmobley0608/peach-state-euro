'use client'
import { useTrophies } from '@/contexts/TrophyContext';
import { useRouter, useSearchParams } from 'next/navigation';

export default function CategoryNav() {
    const { activeCategory, setActiveCategory } = useTrophies();
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        const params = new URLSearchParams(searchParams);
        params.set('category', category);
        router.push(`/trophy-room?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-lg bg-gray-800 p-1">
                <button
                    className={`px-6 py-3 rounded-lg transition-colors ${activeCategory === 'hunting'
                            ? 'bg-green-600 text-white'
                            : 'text-gray-300 hover:text-white'
                        }`}
                    onClick={() => handleCategoryChange('hunting')}
                >
                    Hunting Trophies
                </button>
                <button
                    className={`px-6 py-3 rounded-lg transition-colors ${activeCategory === 'fishing'
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-300 hover:text-white'
                        }`}
                    onClick={() => handleCategoryChange('fishing')}
                >
                    Fishing Trophies
                </button>
            </div>
        </div>
    );
}
