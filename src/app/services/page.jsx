import Header from '@/components/layout/Header';
import Announcement from '@/components/layout/Announcement';
import PriceSheet from '@/components/services/PriceSheet';
import { getAllProducts } from '@/sanity/lib/client';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';




export default async function ServicesPage() {

    const products = await getAllProducts();
    const productsWithImages = products.filter(p => p.image);
    const productsWithoutImages = products.filter(p => !p.image);

    return (
        <main className=""> {/* Warm background */}
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold text-white text-center mb-12">Our Services</h1>

                {/* Products with images */}
                {productsWithImages.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {productsWithImages.map((product, index) => (
                            <Link
                                href={`/mount/${product._id}`}
                                key={product._id}
                                className={`text-center text-white group opacity-0 animate-fadeIn`}
                                style={{ animationDelay: `${index * 0.2}s` }}
                            >
                                <div
                                    className="relative w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] mx-auto
                                             rounded-full overflow-hidden shadow-lg
                                             transition-all duration-300 transform
                                             group-hover:scale-105 group-hover:shadow-2xl
                                             border-2 border-[#8D6E63]"
                                >
                                    <Image
                                        src={urlFor(product.image).url()}
                                        alt={product.title}
                                        fill
                                        sizes="(max-width: 640px) 200px, 250px"
                                        className="object-cover transition-transform duration-300 group-hover:scale-110 animate-fadeIn"
                                        priority

                                    />
                                </div>
                                <div className="p-6 transform transition-all duration-300 group-hover:-translate-y-1">
                                    <h3 className="text-white text-xl font-semibold mb-2">{product.title}</h3>
                                    <p className="text-white font-bold text-2xl">
                                        ${product.price.toFixed(2)}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Products without images */}
                {productsWithoutImages.length > 0 && (
                    <div className="max-w-4xl mx-auto">
                        <div className="grid gap-4">
                            {productsWithoutImages.map((service) => (
                                <Link
                                    key={service._id}
                                    href={`/mount/${service._id}`}
                                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4
                                             hover:bg-white/20 transition-all duration-300
                                             transform hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-white text-lg font-medium">{service.title}</h3>
                                        <p className="text-white font-bold">${service.price.toFixed(2)}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
