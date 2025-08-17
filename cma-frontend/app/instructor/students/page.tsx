import { Box, Stack, Toolbar, Typography } from "@mui/material"
import { TableStudentList } from "./table-student-list.comp";
import { AddStudentForm } from "./add-student-form.comp";

export default function StudentsPage() {
  return (
      <Stack direction={'column'} spacing={4} sx={{marginLeft: 2}}>
        <Typography component={'h1'} variant="h6">{'Student Management'}</Typography>
        <Stack direction={'row'} spacing={2} justifyContent={'space-between'} sx={{marginLeft: 2}}>
          <Typography component={'h1'} variant="h4">{'Students'}</Typography>
          <AddStudentForm/>
        </Stack>
        <TableStudentList/>
      </Stack>
  );
}
