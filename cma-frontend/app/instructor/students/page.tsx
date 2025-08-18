import { Box, Paper, Stack, Toolbar, Typography } from "@mui/material"
import { TableStudentList } from "./table-student-list.comp";
import { AddStudentForm } from "./add-student-form.comp";

export default function StudentsPage() {
  return (
      <Stack direction={'column'} spacing={4} sx={{marginLeft: 2}}>
        <Typography component={'h1'} variant="h6">{'Student Management'}</Typography>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Stack direction={'row'} spacing={2} justifyContent={'space-between'} sx={{marginLeft: 2}}>
          <Typography component={'h1'} variant="h4">{'Students'}</Typography>
          <AddStudentForm/>
        </Stack>
          
        <TableStudentList/>
        </Paper>
      </Stack>
  );
}
