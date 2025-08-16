import { Box, Divider, Link, Stack, Typography } from "@mui/material";
import { VerifyPhoneForm } from "./verify-phone-form.comp";

export default function VeryPhonePage() {
  return (
    <Stack spacing={4} sx={{ justifyContent: "center", padding: 2, }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography
        component="h1"
        variant="h4"
        textAlign={'center'}
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
      >
        {'Verify phone number'}
      </Typography>
      <Divider>
        <Typography sx={{ color: 'text.secondary' }}>{'Please enter your phone to sign in'}</Typography>
      </Divider>
      </Box>
      <VerifyPhoneForm />
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography sx={{ textAlign: 'center' }}>
          Haven't received an SMS ?
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