import { Geist, Geist_Mono } from "next/font/google";
import '../globals.css'
import StyleRoot from "@/base/ui/style-root";
import Stack from '@mui/material/Stack';
import ReactQueryProvider from "@/base/react-query/provider";
import { Paper } from "@mui/material";
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function AuthRootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ReactQueryProvider>
                    <StyleRoot>
                        <Stack sx={{
                            minHeight: '100%', height: '100vh', justifyContent: 'center', alignItems: 'center',
                            background: "radial-gradient(ellipse at 60% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))"
                        }}>
                            <Paper elevation={5} sx={{ minWidth: '30%', padding: 2, borderRadius: 2, }}>
                                {children}
                            </Paper>
                        </Stack>
                    </StyleRoot>
                </ReactQueryProvider>
            </body>
        </html>
    );
}
