"use client"
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoFilter } from "react-icons/io5";

const CategoryNav = ({ categories }) => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="mb-8 relative">
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-lg text-white mb-4"
            >
                <IoFilter className="text-xl" />
                <span>Filter Categories</span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
                <div className="flex flex-wrap justify-center gap-4 py-2">
                    <Link
                        href="/gallery"
                        className={`px-4 py-2 rounded-full transition-colors whitespace-nowrap
                            ${pathname === '/gallery'
                                ? 'bg-white/20 text-white'
                                : 'text-white/70 hover:text-white hover:bg-white/10'}`}
                    >
                        All Photos
                    </Link>
                    {categories?.map((category) => (
                        <Link
                            key={category._id}
                            href={`/gallery/${category.slug.current}`}
                            className={`px-4 py-2 rounded-full transition-colors whitespace-nowrap
                                ${pathname === `/gallery/${category.slug.current}`
                                    ? 'bg-white/20 text-white'
                                    : 'text-white/70 hover:text-white hover:bg-white/10'}`}
                        >
                            {category.title}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Mobile Sliding Menu */}
            <div
                className={`md:hidden fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Overlay */}
                <div
                    className="absolute inset-0 bg-black/50 transition-opacity"
                    onClick={() => setIsOpen(false)}
                />

                {/* Menu Content */}
                <div className="absolute right-0 h-full w-64 bg-gray-900 p-6 overflow-y-auto">
                    <div className="flex flex-col space-y-3">
                        <h3 className="text-white text-lg font-semibold mb-4">Categories</h3>
                        <Link
                            href="/gallery"
                            onClick={() => setIsOpen(false)}
                            className={`px-4 py-2 rounded-lg transition-colors
                                ${pathname === '/gallery'
                                    ? 'bg-white/20 text-white'
                                    : 'text-white/70 hover:text-white hover:bg-white/10'}`}
                        >
                            All Photos
                        </Link>
                        {categories?.map((category) => (
                            <Link
                                key={category._id}
                                href={`/gallery/${category.slug.current}`}
                                onClick={() => setIsOpen(false)}
                                className={`px-4 py-2 rounded-lg transition-colors
                                    ${pathname === `/gallery/${category.slug.current}`
                                        ? 'bg-white/20 text-white'
                                        : 'text-white/70 hover:text-white hover:bg-white/10'}`}
                            >
                                {category.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default CategoryNav;
