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
    return (<></>)
}
