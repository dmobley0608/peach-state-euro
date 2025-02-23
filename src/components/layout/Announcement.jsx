"use client"
import React, { useState, useEffect } from 'react';

const Announcement = () => {
    const [gunCountdown, setGunCountdown] = useState('');
    const [archeryCountdown, setArcheryCountdown] = useState('');

    useEffect(() => {
        const calculateCountdown = () => {
            const now = new Date();
            const currentYear = now.getFullYear();

            // Create dates for this year
            let gunDate = new Date(currentYear, 9, 19); // October 19
            let archeryDate = new Date(currentYear, 8, 14); // September 14

            // If the date has passed, use next year
            if (now > gunDate) {
                gunDate = new Date(currentYear + 1, 9, 19);
            }
            if (now > archeryDate) {
                archeryDate = new Date(currentYear + 1, 8, 14);
            }

            const gunDiff = gunDate - now;
            const archeryDiff = archeryDate - now;

            const gunDays = Math.ceil(gunDiff / (1000 * 60 * 60 * 24));
            const archeryDays = Math.ceil(archeryDiff / (1000 * 60 * 60 * 24));

            setGunCountdown(`${gunDays} days until Gun Season`);
            setArcheryCountdown(`${archeryDays} days until Archery Season`);
        };

        // Calculate immediately
        calculateCountdown();

        // Then set up interval
        const timer = setInterval(calculateCountdown, 1000 * 60 * 60);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-black text-white px-5 py-2.5 flex flex-col justify-between items-center text-sm sm:flex-row md:space-x-4">
            <div>
                <a href="tel:+1234567890" className="text-white no-underline">
                    📞 (678) 769-8511
                </a>
            </div>
            <div className="relative group">
                <span className="cursor-pointer flex items-center">
                    Hunting and Fishing Regulations
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </span>

                {/* Dropdown Menu */}
                <div className="absolute z-50 left-0 top-full mt-1 w-72 bg-white rounded-lg shadow-lg
                            opacity-0 invisible group-hover:opacity-100 group-hover:visible
                            transition-all duration-300 transform origin-top scale-95 group-hover:scale-100">
                    <div className="py-2 px-4 bg-gray-900 rounded-lg">
                        <a
                            href="https://georgiawildlife.com/sites/default/files/wrd/pdf/regulations/Season%20Dates%20Jan%2024-25.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block py-2 px-4 text-white hover:bg-gray-800 rounded transition-colors"
                        >
                            Georgia Hunting Seasons and Important Dates
                        </a>

                        <a
                            href="https://georgiawildlife.com/sites/default/files/23GAHD.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block py-2 px-4 text-white hover:bg-gray-800 rounded transition-colors"
                        >
                            Georgia Hunting & Fishing Regulations
                        </a>
                    </div>
                </div>
            </div>
            <div className="flex flex-col my-2.5 sm:flex-row md:space-x-4">
                <span>{archeryCountdown}</span>
                <span>{gunCountdown}</span>
            </div>
        </div>
    );
};

export default Announcement;
