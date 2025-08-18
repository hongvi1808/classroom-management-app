'use client'

import { authApis } from "@/base/apis/auth.api";
import { showAlertError, showAlertSuccess } from "@/base/ui/toaster";
import { ButtonBack } from "@/components/button/button-back.comp";
import { ButtonBase } from "@/components/button/button-base.comp";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type Props = {
    params: { id: string };
};
export default function VerifyEmailAccount({ params }: Props) {
    const { id } = params
    const router = useRouter()
    const { mutate, isPending } = useMutation({
        mutationFn: authApis.verifyEmail,
        onError: (error) => {
            console.error('Error calling api:', error);
            showAlertError(error.message)
        },
        onSuccess: (data) => {
            //fresh data
            showAlertSuccess('Verify email successfully!')
            router.push(`/login/setup-account/${id}`)

        },
    });
    return <Stack spacing={4} sx={{ justifyContent: "center", padding: 2, }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <ButtonBack />
            <Typography
                component="h1"
                variant="h4"
                textAlign={'center'}
                sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
            >
                {'Verify email'}
            </Typography>
            <Divider>
                <Typography sx={{ color: 'text.secondary' }}>{'Please enter your email to sign in'}</Typography>
            </Divider>
        </Box>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            loading={isPending} onClick={() => mutate(id)}
        >
            {'Click to verify'}
        </Button>
    </Stack>



}