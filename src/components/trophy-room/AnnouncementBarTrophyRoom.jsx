"use client"
import { useUser } from '@clerk/nextjs';
import React from 'react'

const AnnouncementBarTrophyRoom = () => {
    const { user } = useUser();

    if (user) {
        return null;
    }
    return (
        <div className='position-fixed  top-0 left-0 w-full bg-primary bg-black/10 text-white text-center py-2 font-bold rounded
   tracking-widest '>
            <div className='container mx-auto flex items-center justify-center space-x-3'>
                <div className='animate-bounce'>🔥</div>
                <div className='animate-pulse'> Sign in or register to upload your trophy photos! IT'S FREE!</div>
                <div className='animate-bounce'>🔥</div>
            </div>
        </div>
    )
}

export default AnnouncementBarTrophyRoom
