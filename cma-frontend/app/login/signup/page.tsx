import { ButtonBack } from "@/components/button/button-back.comp";
import { Box, Stack, Typography } from "@mui/material"
import SignUpForm from "./sign-up.component";
export default  function SignUpPage() {

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
                    {'Sign Up'}
                </Typography>
            </Box>
            <SignUpForm />
        </Stack >
    )
}