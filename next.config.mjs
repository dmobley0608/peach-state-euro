/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
            },
            {
                protocol: 'https',
                hostname: 'ik.imagekit.io',
            },
            {
                protocol: 'https',
                hostname: 'ozlvhluankvurqjpgnlo.supabase.co',
            },
            // Add production URLs for imagekit
            {
                protocol: 'https',
                hostname: '*.imagekit.io', // Wildcard for all imagekit subdomains
            }
        ],
        domains: ['ik.imagekit.io'], // Fallback for older Next.js versions
    },
    // Add this to help debug image issues in production
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
};

export default nextConfig;
