import React from "react";
import { ThemeProvider } from "next-themes";

export default function AppThemeProvider({ children }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
        </ThemeProvider>
    );
}
