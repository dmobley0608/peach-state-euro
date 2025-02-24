"use client"
import { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { SignInButton, UserButton, SignedIn, SignedOut } from '@clerk/clerk-react';
import { useNavigation } from '@/providers/NavigationProvider';
import { set } from 'sanity';

const Header = () => {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const pathname = usePathname();
    const { setIsNavigating } = useNavigation();

    // Close mobile menu when pathname changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        // Handle scroll and click outside logic
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
            setPrevScrollPos(currentScrollPos);
            if (isMobileMenuOpen) setIsMobileMenuOpen(false);
        };

        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMobileMenuOpen(false);
            }
        };

        // Add navigation click handler
        const handleNavigationClick = (e) => {
            const link = e.target.closest('a');
            if (link?.href?.startsWith(window.location.origin)) {
                setIsNavigating(true);
            }
        };

        // Add event listeners
        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        document.addEventListener('click', handleNavigationClick);

        // Cleanup
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
            document.removeEventListener('click', handleNavigationClick);
        };
    }, [prevScrollPos, isMobileMenuOpen, setIsNavigating]);

    // Hide header on homepage
    if (pathname === '/') return null;

    return (
        <header
            className={`w-full transition-transform duration-300 z-50 ${visible ? 'translate-y-0' : '-translate-y-full'
                }`}
        >
            {/* Overlay with fade transition */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 transition-opacity duration-300 z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            <nav ref={menuRef} className="bg-gradient-to-r from-[#ffcba4] via-[#ff8c69] to-black px-4 py-3 relative z-50">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo or Brand */}
                    <Link href="/" className="text-white font-bold text-xl">
                        Peach State Euro
                    </Link>

                    {/* Navigation Links - Desktop */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link
                            href="/services"
                            className="text-white hover:text-gray-200 transition-colors"
                        >
                            Services
                        </Link>
                        <Link
                            href="/gallery"
                            className="text-white hover:text-gray-200 transition-colors"
                        >
                            Gallery
                        </Link>
                        <Link
                            href="/trophy-room"
                            className="text-white hover:text-gray-200 transition-colors"
                        >
                            Trophy Room
                        </Link>
                    </div>

                    {/* Auth Buttons */}
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu with height transition */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
                        ${isMobileMenuOpen ? 'h-[156px] opacity-100' : 'h-0 opacity-0'}`}
                >
                    <div className="px-2 py-3 space-y-1">
                        <Link
                            href="/services"
                            className="block text-white hover:text-gray-200 transition-colors py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Services
                        </Link>
                        <Link
                            href="/gallery"
                            className="block text-white hover:text-gray-200 transition-colors py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Gallery
                        </Link>
                        <Link
                            href="/trophy-room"
                            className="block text-white hover:text-gray-200 transition-colors py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Trophy Room
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;