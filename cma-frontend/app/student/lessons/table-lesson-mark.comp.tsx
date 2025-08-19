'use client'

import { studentApis } from "@/base/apis/student.api"
import { showAlertError } from "@/base/ui/toaster";
import { formatDate, getSessionLocal } from "@/base/uitls";
import { ButtonIconText } from "@/components/button/buton-iconText.comp";
import TableBase from "@/components/table/table-base.comp";
import { CheckIcon, DocumentMinusIcon } from "@heroicons/react/16/solid";
import { Box, Chip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export function TableLessonMark() {
    const queryClient = useQueryClient();
    const phoneNumber = getSessionLocal()?.phoneNumber
    const { isLoading, data } = useQuery({
        queryKey: ['lessons',phoneNumber],
        queryFn: () => studentApis.getMyLesson(phoneNumber),
        enabled: !!phoneNumber
    })
     const { mutate, isPending } = useMutation({
        mutationFn: studentApis.markLessonDone,
        onError: (error) => {
            console.error('Error calling api:', error);
            showAlertError(error.message)

        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['lessons', phoneNumber] });
        },
    });
    const columns: GridColDef[] = [
        {
            field: 'order', headerName: 'Order', renderCell: (params) => {
                return params.api.getRowIndexRelativeToVisibleRows(params.id) + 1;
            }
        },
        { field: 'title', headerName: 'Title Lesson', flex: 2 },
        { field: 'description', headerName: 'Description', flex: 3 },
        {
            field: 'deliveredAt', headerName: 'Assigned At', flex: 2, renderCell: (params) => (
                <>{formatDate(params.row.deliveredAt)}</>
            ),
        },
        {
            field: 'status', headerName: 'Status', flex: 2,
            renderCell: (params) => (
                <Chip
                    label={params.row.status}
                    color={params.row.status === 'done' ? "success" : "warning"}
                    size="medium"
                    variant={params.row.status === 'done' ? "filled" : "outlined"}
                />
            ),
        },
        {
            field: "action",
            headerName: "", flex: 2,
            renderCell: (params) => (params.row.status === 'pending' ? <ButtonIconText iconComp={<CheckIcon height={20} width={20} />}
                buttonProps={{ color: 'primary', variant:'outlined', loading: isPending }}
                title="Check Done"
                onClick={() => mutate({phone:phoneNumber, lessonId:params.row.id})} />:  <>{formatDate(params.row.completedAt)}</>
            ),
        },

        // { field: 'deliveredAt', headerName: 'Assigned At', flex: 0.1 },
        // { field: 'completedAt', headerName: 'Completed At', flex: 0.1 },
    ];
    return <TableBase sx={{ marginTop: 2 }} loading={isLoading} rows={data || []} columns={columns} />

}