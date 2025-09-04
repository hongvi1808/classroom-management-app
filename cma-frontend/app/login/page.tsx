import { Box,  Divider, Icon, Link, Stack, Typography } from "@mui/material";
import { HomeLoginForm } from "./home-login-form.comp";
import { ButtonBase } from "@/components/button/button-base.comp";
import NextLink from "next/link";
import { DevicePhoneMobileIcon, EnvelopeIcon } from "@heroicons/react/16/solid";
import { ButtonBack } from "@/components/button/button-back.comp";

export default function Login() {
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
          {'Log in'}
        </Typography>
      </Box>
      <HomeLoginForm />
      <Divider>
        <Typography sx={{ color: 'text.secondary' }}>or</Typography>
      </Divider>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <ButtonBase component={NextLink}
          fullWidth
          href="/login/phone"
          variant="outlined"
          children={<Stack spacing={2} direction={'row'} >
            <Icon sx={{ justifyContent: 'center', alignContent: 'center' }} >
              <DevicePhoneMobileIcon width={20} height={20} color="primary" />
            </Icon>
            {'Log in with Phone Number'}
          </Stack>} />
        <ButtonBase component={NextLink}
          href="/login/email"
          fullWidth
          variant="outlined"
          children={<Stack spacing={2} direction={'row'} >
            <Icon sx={{ justifyContent: 'center', alignContent: 'center' }} >
              <EnvelopeIcon width={20} height={20} color="primary" />
            </Icon>
            {'Log in with Email'}
          </Stack>} />
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