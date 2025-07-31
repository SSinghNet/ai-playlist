'use client'
import "../styles/globals.css";
import {ThemeProvider} from "@/components/util/theme-provider"
import React from "react";
import AuthProvider from "@/components/util/auth-provider";

import {Inter} from "next/font/google";
import {Analytics} from "@vercel/analytics/next"
import ServiceRedirect from "@/lib/service-redirect";
import {Toaster} from "sonner";

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
});

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" className={"min-h-full"} suppressHydrationWarning>
        <head>
            <title>SSingh.Net AI Playlist Generator</title>
            <script
                async
                src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${process.env.NEXT_PUBLIC_ADSENSE_PUB_ID}`}
                crossOrigin="anonymous"
            ></script>
        </head>
        <body className={inter.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            <Analytics/>
            <AuthProvider>
                <ServiceRedirect>
                    <Toaster position={"top-center"} richColors/>
                    {children}
                </ServiceRedirect>
            </AuthProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}
