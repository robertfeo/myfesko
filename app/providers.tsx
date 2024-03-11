/* eslint-disable react/jsx-no-undef */
'use client'

import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }, session : SessionProviderProps) {
    return (
        <SessionProvider session={session.session}>
            <NextUIProvider>
                <NextThemesProvider attribute="class" defaultTheme="light">
                    {children}
                </NextThemesProvider>
            </NextUIProvider>
        </SessionProvider>
    )
}