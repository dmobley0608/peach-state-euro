import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Banner from './Banner'
import IconRow from './IconRow'

const Hero = () => {
    return (
        <div className='relative'>
            <div className="hero" style={{ backgroundImage: `url('/background.jpg')` }}>
                <div className="hero-overlay" />
                <div className="relative z-10 text-center text-white px-4">
                    <Image
                        className="animate-fade-in duration-[1500ms] w-[250px] md:w-[300px] lg:w-[400px] z-20"
                        src="/peach-state-euro.png"
                        width={400}
                        height={0}
                        alt="Peach State Euro"
                        style={{ height: 'auto', zIndex: 10 }}
                    />
                </div>
            </div>

        </div>
    )
}

export default Hero
