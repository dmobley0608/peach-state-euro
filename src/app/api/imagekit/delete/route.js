import { NextResponse } from 'next/server';
import ImageKit from "imagekit";

const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
});

export async function POST(request) {
    try {
        const { fileId } = await request.json();

        if (!fileId) {
            return NextResponse.json({ error: 'File ID is required' }, { status: 400 });
        }

        try {
            // Try direct deletion first
            await imagekit.deleteFile(fileId);
        } catch (error) {
            // If direct deletion fails, try finding the file
            const files = await imagekit.listFiles({
                path: '/peach-state-euro/trophies',
                searchQuery: `name = "${fileId}"`,
            });

            if (files && files.length > 0) {
                await imagekit.deleteFile(files[0].fileId);
            } else {
                throw new Error('File not found in ImageKit');
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('ImageKit deletion error:', error);
        return NextResponse.json({
            error: error.message || 'Failed to delete image from ImageKit',
            details: error
        }, { status: 500 });
    }
}
