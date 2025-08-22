import { Paper, Stack, Typography } from "@mui/material";
import { UpdateStudentForm } from "./update-student-form.comp";

type PageProps = {
  params: { id: string };
};
export default async function DetailStudentPage({params}: PageProps) {
    
    const {id} = await params
    return <Stack direction={'column'} spacing={4} sx={{marginLeft: 2}}>
        <Typography component={'h1'} variant="h6">{'Student Management'}</Typography>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>

        <UpdateStudentForm phone={id}/>
        </Paper>
      </Stack>
}