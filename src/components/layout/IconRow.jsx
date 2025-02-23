import React from 'react'
import Link from 'next/link'
import { FaTools, FaImages } from 'react-icons/fa'
import { GiDeerHead } from "react-icons/gi";

const IconRow = () => {
    return (
        <div className="w-full py-8 px-2">
            <div className="container mx-auto">
                <div className="flex justify-between max-w-[600px] mx-auto space-x-8 md:space-x-16">
                    {/* Services Icon - Slide from left */}
                    <Link href="/services" className="group cursor-pointer flex flex-col items-center animate-slideFromLeft">
                        <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gray-800 flex items-center justify-center
                            transition-all duration-300 group-hover:bg-green-700">
                            <FaTools className="text-3xl md:text-4xl text-white" />
                        </div>
                        <span className="mt-2 text-white font-medium group-hover:text-green-700">Services</span>
                    </Link>

                    {/* Gallery Icon - Slide from bottom */}
                    <Link href="/gallery" className="group cursor-pointer flex flex-col items-center animate-slideFromBottom">
                        <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gray-800 flex items-center justify-center
                            transition-all duration-300 group-hover:bg-green-700">
                            <FaImages className="text-3xl md:text-4xl text-white" />
                        </div>
                        <span className="mt-2 text-white font-medium group-hover:text-green-700">Gallery</span>
                    </Link>

                    {/* Trophy Room Icon - Slide from right */}
                    <Link href="/trophy-room" className="group cursor-pointer flex flex-col items-center animate-slideFromRight">
                        <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gray-800 flex items-center justify-center
                            transition-all duration-300 group-hover:bg-green-700">
                            <GiDeerHead className="text-3xl md:text-6xl text-white" />
                        </div>
                        <span className="mt-2 text-white font-medium group-hover:text-green-700">Trophy Room</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default IconRow
