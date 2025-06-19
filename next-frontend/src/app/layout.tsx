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
            <head>
                <title>SSingh.Net AI Playlist Generator</title>
                <script
                    async
                    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${process.env.NEXT_PUBLIC_ADSENSE_PUB_ID}`}
                    crossOrigin="anonymous"
                ></script>
            </head>
            <body className={inter.className + " overflow-hidden"}>
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
            {/*<GoogleAdsense />*/}
        </html>
    );
}
