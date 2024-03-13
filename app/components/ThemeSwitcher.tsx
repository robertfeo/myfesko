// app/components/ThemeSwitcher.tsx
"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/20/solid"; // Import SunIcon for light mode
import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Toggle theme function
    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <>
            <Button className="rounded-full" isIconOnly variant="light" aria-label="Toggle theme" size="sm" onClick={toggleTheme}>
                {/* Display the appropriate icon based on the current theme */}
                {theme === 'dark' ? <SunIcon className="w-4" /> : <MoonIcon className="w-3" />}
            </Button>
        </>
    );
};
