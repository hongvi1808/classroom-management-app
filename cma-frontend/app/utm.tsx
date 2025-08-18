'use client'
import { ROLE_INSTRCTOR, ROLE_STUDENT, SESSION_LOCAL_STORAGE_KEY } from "@/base/uitls";
import { Box, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function UtmPage() {
    const router = useRouter();

    useEffect(() => {
        const session = localStorage.getItem(SESSION_LOCAL_STORAGE_KEY)
        const sObj = session ? JSON.parse(session) : null
        if (sObj?.role === ROLE_INSTRCTOR) return router.replace('/instructor')
        if (sObj?.role === ROLE_STUDENT) return router.replace('/student')
        return router.replace('/login')
    }, [])
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                bgcolor: "rgba(255,255,255,0.7)",
            }}
        >
            <svg width={0} height={0}>
                <defs>
                    <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#e01cd5" />
                        <stop offset="100%" stopColor="#1CB5E0" />
                    </linearGradient>
                </defs>
            </svg>
            <CircularProgress size={60} thickness={4} sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
        </Box>
    )
}
