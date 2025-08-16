import { Box, Divider, Link, Stack, Typography } from "@mui/material";
import { HomeLoginForm } from "../home-login-form.comp";
import { PhoneLoginForm } from "./phone-login-form.comp";

export default function PhoneLoginPage() {
  return (
    <Stack spacing={4} sx={{ justifyContent: "center", padding: 2, }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography
        component="h1"
        variant="h4"
        textAlign={'center'}
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
      >
        {'Log in'}
      </Typography>
      <Divider>
        <Typography sx={{ color: 'text.secondary' }}>{'Please enter your phone to sign in'}</Typography>
      </Divider>
      </Box>
      <PhoneLoginForm />
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography sx={{ textAlign: 'center' }}>
         Haven't had an account ?
          <Link
            href=""
            variant="body2"
            sx={{ alignSelf: 'center' }}
          >
            {'Sign up'}
          </Link>
        </Typography>
      </Box>
    </Stack>
  )
}