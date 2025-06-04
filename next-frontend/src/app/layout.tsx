import "../styles/globals.css";
import {ThemeProvider} from "@/components/theme-provider"
import React from "react";
import AuthProvider from "@/components/auth-provider";

import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
});

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <Analytics/>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </ThemeProvider>
            </body>
        </html>
    );
}
