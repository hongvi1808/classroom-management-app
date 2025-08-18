'use client'
import { authApis } from "@/base/apis/auth.api";
import { showAlertError, showAlertSuccess } from "@/base/ui/toaster";
import { validRequire } from "@/base/uitls"
import { ButtonBack } from "@/components/button/button-back.comp";
import { TextFiledControlBase } from "@/components/textfield/textfield.comp"
import { Box, Button, Stack, Typography } from "@mui/material"
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
type Props = {
    params: { id: string };
};
export default function SetupAccountPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params);
    const router = useRouter()
    const { mutate, isPending } = useMutation({
        mutationFn: authApis.setupAccount,
        onError: (error) => {
            console.error('Error calling api:', error);
            showAlertError(error?.message)
        },
        onSuccess: (data) => {
            //fresh data
            showAlertSuccess('Created account successfully!')
            router.push('/login')

        },
    });
    const validUsername = (value: string) => {
        if (validRequire(value)) return validRequire(value)
        if (!(/^[a-z0-9]+$/).test(value)) return 'Use only letters and numbers, no spaces or accents'
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries())
        data.id = id
        mutate(data)
    }
    return (
    <Stack spacing={4} sx={{ justifyContent: "center", padding: 2, }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <ButtonBack />
            <Typography
                component="h1"
                variant="h4"
                textAlign={'center'}
                sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
            >
                {'Setup Account'}
            </Typography>
        </Box>
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
            <TextFiledControlBase
                name='username'
                label="Username"
                getErrorMessage={validUsername}
                inputProps={{ placeholder: 'Your username', required: true, }}
            />
            <TextFiledControlBase
                name='password'
                label="Password"
                getErrorMessage={validRequire}
                inputProps={{ placeholder: 'Your password', type: 'password', required: true }}
            />
            <Button
                loading={isPending}
                type="submit"
                fullWidth
                variant="contained"
            >
                {'Submit'}
            </Button>
            <Button
                onClick={() => router.push('/login/email')}
                fullWidth
                variant="text"
                color="secondary"
            >
                {'Skip'}
            </Button>
        </Box>
        </Stack >
    )
}