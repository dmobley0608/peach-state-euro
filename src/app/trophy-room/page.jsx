import { Suspense } from 'react';
import TopTrophies from '@/components/trophy-room/TopTrophies';
import TrophyGallery from '@/components/trophy-room/TrophyGallery';
import UploadButton from '@/components/trophy-room/UploadButton';
import Loading from './loading';
import { supabase } from '@/lib/supabase';
import { TrophyProvider } from '@/contexts/TrophyContext';
import CategoryNav from '@/components/trophy-room/CategoryNav';
import AnnouncementBarTrophyRoom from '@/components/trophy-room/AnnouncementBarTrophyRoom';

async function getAllTrophies() {
    const { data } = await supabase
        .from('trophy_photos')
        .select('*')
        .order('votes', { ascending: false });
    return data || [];
}

export default async function TrophyRoomPage({ searchParams }) {
    const initialTrophies = await getAllTrophies();
    const sp = await searchParams;
    const initialCategory = sp.category || 'hunting';

    return (
        <div className="container mx-auto px-4 pb-12">
            <AnnouncementBarTrophyRoom />
            <h1 className="text-4xl font-bold text-white text-center mb-8">Trophy Room</h1>

            <TrophyProvider
                initialTrophies={initialTrophies}
                initialCategory={initialCategory}
            >
                <CategoryNav />

                <Suspense fallback={<Loading />}>
                    <TopTrophies />
                </Suspense>

                <div className="my-8 text-center">
                    <UploadButton />
                </div>
                <Suspense fallback={<Loading />}>
                    <TrophyGallery />
                </Suspense>
            </TrophyProvider>
        </div>
    );
}
