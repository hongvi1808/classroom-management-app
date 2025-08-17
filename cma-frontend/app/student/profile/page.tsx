import { Paper, Stack, Typography } from "@mui/material";
import { UpdateProfileForm } from "./update-profile-form.comp";

export default async function Profile() {
    
    return <Stack direction={'column'} spacing={4} sx={{marginLeft: 2}}>
        <Typography component={'h1'} variant="h6">{'Profile'}</Typography>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <UpdateProfileForm />
        </Paper>
      </Stack>
}