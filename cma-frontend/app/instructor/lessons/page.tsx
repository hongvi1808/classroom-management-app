import { Box, Paper, Stack, Toolbar, Typography } from "@mui/material"

export default function StudentsPage() {
  return (
      <Stack direction={'column'} spacing={4} sx={{marginLeft: 2}}>
        <Typography component={'h1'} variant="h6">{'Lesson Management'}</Typography>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            {'Tính năng đang phát triển'}
        </Paper>
      </Stack>
  );
}
