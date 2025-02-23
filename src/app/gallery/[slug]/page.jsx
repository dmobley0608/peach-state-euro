import { getImagesByCategorySlug, getCategoryBySlug, getAllCategories } from '@/sanity/lib/client';
import ImageGallery from '@/components/gallery/ImageGallery';
import CategoryNav from '@/components/gallery/CategoryNav';

export default async function GalleryPage({ params }) {
    const { slug } = params;
    const [images, category, categories] = await Promise.all([
        getImagesByCategorySlug(slug),
        getCategoryBySlug(slug),
        getAllCategories()
    ]);

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-white text-center mb-12">
                {category?.title || 'Gallery'}
            </h1>

            <CategoryNav categories={categories} />

            {images.length > 0 ? (
                <ImageGallery images={images} />
            ) : (
                <p className="text-center text-white text-xl">
                    No images found in this category
                </p>
            )}
        </div>
    );
}
