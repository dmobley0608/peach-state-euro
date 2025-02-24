'use client'
import { useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function Template({ children }) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        const handleStart = () => {
            document.dispatchEvent(new Event('navigationstart'))
        }

        const handleEnd = () => {
            document.dispatchEvent(new Event('navigationend'))
        }

        router.events?.on('routeChangeStart', handleStart)
        router.events?.on('routeChangeComplete', handleEnd)
        router.events?.on('routeChangeError', handleEnd)

        return () => {
            router.events?.off('routeChangeStart', handleStart)
            router.events?.off('routeChangeComplete', handleEnd)
            router.events?.off('routeChangeError', handleEnd)
        }
    }, [router])

    return children
}
