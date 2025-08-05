'use client'
import React from 'react';
import {SessionProvider} from "next-auth/react";
import {DemoModeProvider} from "@/context/DemoModeContext";

function AuthProvider({children}: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <DemoModeProvider>
                {children}
            </DemoModeProvider>
        </SessionProvider>
    )
}

export default AuthProvider;
