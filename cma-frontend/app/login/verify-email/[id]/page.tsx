import React from "react";
import { ButtonBack } from "@/components/button/button-back.comp";
import { Box, Divider, Stack, Typography } from "@mui/material";
import VerifyEmailAccountForm from "./verify-email-form.comp";

type PageProps = {
  params: { id: string };
};
export default async function VerifyEmailAccount({params}: PageProps) {
    
    const {id} = await params
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
                <Typography sx={{ color: 'text.secondary' }}>{'Please verify your email to login'}</Typography>
            </Divider>
        </Box>
        <VerifyEmailAccountForm id={id} />
    </Stack>



}