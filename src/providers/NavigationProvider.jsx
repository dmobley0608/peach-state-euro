'use client'
import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const NavigationContext = createContext({
    isNavigating: false,
    setIsNavigating: () => { }
});

export const useNavigation = () => useContext(NavigationContext);

export function NavigationProvider({ children }) {
    const [isNavigating, setIsNavigating] = useState(false);
    const pathname = usePathname();
    const previousPathname = useRef(pathname);
    const searchParams = useSearchParams();

    useEffect(() => {
        setIsNavigating(true);
        const timeout = setTimeout(() => setIsNavigating(false), 500);
        return () => clearTimeout(timeout);
    }, [pathname, searchParams, previousPathname.current]); 

    return (
        <NavigationContext.Provider value={{ isNavigating, setIsNavigating }}>
            {children}
        </NavigationContext.Provider>
    );
}
