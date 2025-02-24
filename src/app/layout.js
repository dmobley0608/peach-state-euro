import {
  ClerkProvider
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from "next/font/google";
import { NavigationProvider } from '@/providers/NavigationProvider';
import { Suspense } from 'react';

import '@/styles/components.css'
import { SanityLive } from '@/sanity/lib/live';
import Header from '@/components/layout/Header';
import Announcement from '@/components/layout/Announcement';
import LoadingBar from '@/components/layout/LoadingBar';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Peach State Euro",
  description: "Developed By Tccs.Tech",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased `}
        >
          <Suspense fallback={<LoadingBar />}>
            <NavigationProvider>
              <LoadingBar />
              <Announcement />
              <Header />

              <main className="">
                {children}
              </main>
              <SanityLive />
            </NavigationProvider>
          </Suspense>
        </body>
      </html>
    </ClerkProvider>
  );
}
