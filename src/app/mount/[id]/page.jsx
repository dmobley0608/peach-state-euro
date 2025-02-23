import Header from '@/components/layout/Header';
import { getProductById, getImagesByProductCategory } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import ImageGallery from '@/components/gallery/ImageGallery';

export default async function ProductPage({ params }) {
    const { id } = params;
    const [product, images] = await Promise.all([
        getProductById(id),
        getImagesByProductCategory(id),
    ]);

    return (
        <>
            <div className="container mx-auto px-4 py-8 bg-neutral-100">
                {/* Main product section */}
                <div className="flex flex-col md:flex-row md:space-x-8 mb-12">
                    {/* Left side - Main Image */}
                    {product.image && <div className="md:w-1/2 mb-6 md:mb-0">
                        <div className="relative aspect-square w-full max-w-[400px] md:max-w-none md:w-[400px] mx-auto">
                            <Image
                                src={urlFor(product.image).url()}
                                alt={product.title}
                                fill
                                className="object-cover rounded-lg"
                                priority
                            />
                        </div>

                    </div>
                    }


                    {/* Right side - Product Info */}
                    <div className="md:w-1/2">
                        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
                        <p className="text-2xl font-semibold text-gray-800 mb-4">
                            ${product.price.toFixed(2)}
                        </p>
                        <div className="prose max-w-none mb-6">
                            <p className="text-gray-600">{product.description}</p>
                        </div>
                    </div>
                </div>

                {/* Gallery Section */}
                {images.length > 0 &&
                    <>
                        <h2 className="text-2xl font-bold mb-6">Mount Gallery</h2>
                        <ImageGallery images={images} />
                    </>
                }
            </div>
        </>
    );
}