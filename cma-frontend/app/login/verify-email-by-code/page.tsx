import { Box, Divider, Icon, Link, Stack, Typography } from "@mui/material";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { ButtonBack } from "@/components/button/button-back.comp";
import { VerifyEmailForm } from "./verify-email-form";

export default function VerifyEmailPage() {
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
                    {'Verify email'}
                </Typography>
                <Divider>
                    <Typography sx={{ color: 'text.secondary' }}>{'Please enter your email to sign in'}</Typography>
                </Divider>
            </Box>
            <VerifyEmailForm />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography sx={{ textAlign: 'center' }}>
                    {"Hasn't received an email? "}
                    <Link
                        href=""
                        variant="body2"
                        sx={{ alignSelf: 'center' }}
                    >
                        {'Resend'}
                    </Link>
                </Typography>
            </Box>
        </Stack>
    )
}