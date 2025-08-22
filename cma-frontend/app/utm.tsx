'use client'
import { getSessionLocal, ROLE_INSTRCTOR, ROLE_STUDENT, SESSION_LOCAL_STORAGE_KEY } from "@/base/uitls";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function UtmPage() {
    const router = useRouter();

    const session = getSessionLocal()
    useEffect(() => {
        if (session?.role === ROLE_INSTRCTOR) return router.replace('/instructor')
        if (session?.role === ROLE_STUDENT) return router.replace('/student')
        return router.replace('/login')
    }, [session])
    return (<></>)
}
