import { supabase } from '@/lib/supabase';

export async function deletePhoto(photoId, imageUrl) {
    try {
        // Delete from Supabase first
        const { error: dbError } = await supabase
            .from('trophy_photos')
            .delete()
            .eq('id', photoId);

        if (dbError) throw dbError;

        // Extract file ID from ImageKit URL
        // Example URL: https://ik.imagekit.io/7a4ad0swj/peach-state-euro/trophies/trophy-1234567890
        const matches = imageUrl.match(/\/([^/]+)$/);
        const fileId = matches ? matches[1].split('.')[0] : null;

        if (!fileId) {
            throw new Error('Could not extract file ID from URL');
        }

        console.log('Attempting to delete ImageKit file:', fileId);

        // Delete from ImageKit using API route
        const response = await fetch('/api/imagekit/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fileId,
                filePath: `/peach-state-euro/trophies/${fileId}` // Include full path
            }),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Failed to delete image from ImageKit');
        }

        return { success: true };
    } catch (error) {
        console.error('Error deleting photo:', error);
        throw error;
    }
}
