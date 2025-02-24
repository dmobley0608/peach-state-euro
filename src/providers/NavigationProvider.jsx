'use client'
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';

const NavigationContext = createContext({
    isNavigating: false,
    setIsNavigating: () => { }
});

export const useNavigation = () => useContext(NavigationContext);

export function NavigationProvider({ children }) {
    const [isNavigating, setIsNavigating] = useState(false);
    const pathname = usePathname();

    const startNavigation = useCallback(() => {
        setIsNavigating(true);
    }, []);

    const endNavigation = useCallback(() => {
        setIsNavigating(false);
    }, []);

    useEffect(() => {
        if (isNavigating) {
            const timeout = setTimeout(endNavigation, 1500);
            return () => clearTimeout(timeout);
        }
    }, [isNavigating, endNavigation]);

    useEffect(() => {
        startNavigation();
    }, [pathname, startNavigation]);

    return (
        <NavigationContext.Provider value={{
            isNavigating,
            setIsNavigating: startNavigation
        }}>
            {children}
        </NavigationContext.Provider>
    );
}
