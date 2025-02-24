'use client'
import { useNavigation } from '@/providers/NavigationProvider';

export default function LoadingBar() {
    const { isNavigating } = useNavigation();

    if (!isNavigating) return null;

    return (
        <div className="fixed top-0 left-0 right-0 h-screen bg-gradient-to-r from-orange-500/80 to-orange-900/80 z-[9999]">
            <div className="w-full h-full animate-loading-bar bg-gradient-to-r from-transparent to-white/25" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-2xl">
                Loading...
            </div>
        </div>
    );
}
