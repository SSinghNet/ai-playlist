import "../styles/globals.css";
import {ThemeProvider} from "@/components/theme-provider"
import React from "react";
import AuthProvider from "@/components/auth-provider";

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <AuthProvider>
                    {children}
                </AuthProvider>
            </ThemeProvider>
            </body>
        </html>
    );
}
