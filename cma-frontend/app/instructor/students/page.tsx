import { Box, Toolbar, Typography } from "@mui/material"

export default function StudentsPage() {
  return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minWidth: 0,
        }}
      >
        <Toolbar sx={{ displayPrint: 'none' }} />
        <Box
          component="main"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            overflow: 'auto',
          }}
        >
          {'Noi dungretet4e3t refretret4r3rfsfrerwerwr'}
        </Box>
      </Box>
  );
}
