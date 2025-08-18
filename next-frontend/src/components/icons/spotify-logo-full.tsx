// components/SpotifyLogoFull.tsx
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface SpotifyLogoFullProps {
    className?: string;
    inverted?: boolean;
}

export default function SpotifyLogoFull({ className, inverted=false }: SpotifyLogoFullProps) {
    const { theme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;
    const logoSrc =
        currentTheme === "light"
            ? inverted ?  "/Full_Logo_Black_CMYK.svg" : "/Full_Logo_White_CMYK.svg"
            : inverted ?  "/Full_Logo_White_CMYK.svg" : "/Full_Logo_Black_CMYK.svg";

    return (
        <Image
            src={logoSrc}
            width={823.46}
            height={225.25}
            className={`h-auto ${className ?? ""}`}
            alt="Spotify Logo"
        />
    );
}
