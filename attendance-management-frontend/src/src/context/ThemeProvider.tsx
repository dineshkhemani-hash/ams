import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'auto';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const getInitialTheme = () => {
    if (typeof window === "undefined") return 'auto';
    return (localStorage.getItem("theme") || "auto") as Theme;
}
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // const [theme, setTheme] = useState<Theme>(() => {
    //     const savedTheme = localStorage.getItem('theme');
    //     return (savedTheme as Theme) || 'light';
    // });
    const [theme, setTheme] = useState<Theme>(getInitialTheme);
    // useEffect(() => {
    //     localStorage.setItem('theme', theme);

    //     if (theme === 'dark') {
    //         //tailwind v3 version 
    //         // document.documentElement.classList.add('dark');

    //     } else {
    //         // document.documentElement.classList.remove('dark');
    //     }
    // }, [theme]);
    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme])
    useEffect(() => {
        if (theme != 'auto') {
            document.documentElement.dataset.theme = theme;
            return;
        }
        //for auto mode
        const mediaQuery = window.matchMedia('(prefers-color-scheme:dark)');

        //v4 version 
        document.documentElement.dataset.theme = mediaQuery.matches ? 'dark' : 'light';

        // Update theme when system preference changes
        function handleChange(e) {
            document.documentElement.dataset.theme = e.matches ? 'dark' : 'light';
        }
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme])
    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};