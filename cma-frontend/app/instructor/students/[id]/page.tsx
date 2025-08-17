import { Stack, Typography } from "@mui/material";
import { UpdateStudentForm } from "./update-student-form.comp";

type Props = {
  params: { id: string };
};
export default function DetailStudentPage({params}: Props) {
    
    const {id} = params
    return <Stack direction={'column'} spacing={4} sx={{marginLeft: 2}}>
        <Typography component={'h1'} variant="h6">{'Student Management'}</Typography>
        <UpdateStudentForm phone={id}/>
        {/* <TableStudentList/> */}
      </Stack>
}