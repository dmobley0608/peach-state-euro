import { getAllImages, getAllCategories } from '@/sanity/lib/client';
import ImageGallery from '@/components/gallery/ImageGallery';
import CategoryNav from '@/components/gallery/CategoryNav';

export default async function MainGalleryPage() {
    const [images, categories] = await Promise.all([
        getAllImages(),
        getAllCategories()
    ]);

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-white text-center mb-12">
                Gallery
            </h1>

            <CategoryNav categories={categories} />

            {images.length > 0 ? (
                <ImageGallery images={images} />
            ) : (
                <p className="text-center text-white text-xl">
                    No images available
                </p>
            )}
        </div>
    );
}
