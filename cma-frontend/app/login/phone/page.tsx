import { Box, Divider, Icon, Link, Stack, Typography } from "@mui/material";
import { HomeLoginForm } from "../home-login-form.comp";
import { PhoneLoginForm } from "./phone-login-form.comp";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { ButtonBack } from "@/components/button/button-back.comp";

export default function PhoneLoginPage() {
  return (
    <Stack spacing={4} sx={{ justifyContent: "center", padding: 2, }}>
      <Box sx={{ display: 'flex', flexDirection: 'column',gap: 2 }}>
       <ButtonBack/>
      <Typography
        component="h1"
        variant="h4"
        textAlign={'center'}
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
      >
        {'Log in'}
      </Typography>
        <Typography textAlign={'center'} sx={{ color: 'text.secondary' }}>{'Please enter your phone to log in'}</Typography>
      </Box>
      <PhoneLoginForm />
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography sx={{ textAlign: 'center' }}>
        {"Don't you have an account? "}
          <Link
            href="/login/signup"
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