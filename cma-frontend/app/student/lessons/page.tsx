import { Stack, Typography } from "@mui/material";
import { TableLessonMark } from "./table-lesson-mark.comp";

export default function MyLessonPage() {
    return <Stack direction={'column'} spacing={4} sx={{marginLeft: 2}}>
          <Typography component={'h1'} variant="h6">{'My Lessons'}</Typography>
          <TableLessonMark/>
        </Stack>
}