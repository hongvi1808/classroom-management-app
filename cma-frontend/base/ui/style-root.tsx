'use client'

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

const theme = createTheme({
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "#f7fcff"
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: "#f7fcff"
                },
            },
        },
    }
});

const StyleRoot = ({ children }: Readonly<{ children: React.ReactNode }>) => (
    <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    </AppRouterCacheProvider>
)

export default StyleRoot;