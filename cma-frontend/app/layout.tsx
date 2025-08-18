import { Geist, Geist_Mono } from "next/font/google";
import './globals.css'
import StyleRoot from "@/base/ui/style-root";
import ReactQueryProvider from "@/base/react-query/provider";
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
                        {children}
                    </StyleRoot>
                </ReactQueryProvider>
            </body>
        </html>
    );
}
