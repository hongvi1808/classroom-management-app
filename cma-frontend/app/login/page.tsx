import { TextFiledControlBase } from "@/components/textfield/textfield.comp";
import { Box, Button, Card, Divider, FormControl, FormLabel, Input, Link, Stack, TextField, Typography } from "@mui/material";
import { HomeLoginForm } from "./home-login-form.comp";
import { ButtonBase } from "@/components/button/button.comp";
import NextLink from "next/link";

export default function Login() {
  return (
    <Stack spacing={4} sx={{ justifyContent: "center", padding: 2, }}>
      <Typography component={'h1'} variant="h4"></Typography>
      <Typography
        component="h1"
        variant="h4"
        textAlign={'center'}
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
      >
        {'Log in'}
      </Typography>
      <HomeLoginForm />
      <Divider>
        <Typography sx={{ color: 'text.secondary' }}>or</Typography>
      </Divider>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <ButtonBase component={NextLink}
          fullWidth
          href="/login/phone"
          variant="outlined" children="Log in with Phone Number" />
        <ButtonBase component={NextLink}
          href="/login/email"
          fullWidth
          variant="outlined" children="Log in with Email" />
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