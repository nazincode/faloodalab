"use client";

import { useTheme } from "next-themes";
import { Sun } from "lucide-react";
import { Moon } from "lucide-react";

export default function ThemeToggle() {
    // access current theme and setTheme function
    const { theme, setTheme } = useTheme();

    // return button component which will show either a sun or moon depending on which theme is toggled
    return <button
        // {/* use inline function to setTheme, if the current theme is "dark" apply light mode, and if not, apply dark */}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
        {/* show one icon at a time using scale-0 only shown on dark mode*/}
        <Sun size={24} className="absolute transition-all color-black rotate-90 scale-0 dark:rotate-0 dark:scale-100"/>
        <Moon size={24} className="transition-all rotate-0 scale-100 dark:-rotate-90 dark:scale-0"/>
    </button>
}