'use client'

import { authApis } from "@/base/apis/auth.api";
import { showAlertError, showAlertSuccess } from "@/base/ui/toaster";
import { Button, } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

export default function VerifyEmailAccountForm({id}: {id: string}) {
    
    const router = useRouter()
    const { mutate, isPending } = useMutation({
        mutationFn: authApis.verifyEmail,
        onError: (error) => {
            console.error('Error calling api:', error);
            showAlertError(error.message)
        },
        onSuccess: (data) => {
            //fresh data
            router.push(`/login/setup-account/${id}`)
            showAlertSuccess('Verify email successfully!')

        },
    });
      return  <Button
            type="submit"
            fullWidth
            variant="contained"
            loading={isPending} onClick={() => mutate(id)}
        >
            {'Click to verify'}
        </Button>



}