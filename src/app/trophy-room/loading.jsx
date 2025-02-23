export default function Loading() {
    return (
        <div className="animate-pulse">
            {/* Top 3 loading skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-gray-700/20 rounded-lg aspect-square" />
                ))}
            </div>

            {/* Gallery loading skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="bg-gray-700/20 rounded-lg aspect-square" />
                ))}
            </div>
        </div>
    );
}
