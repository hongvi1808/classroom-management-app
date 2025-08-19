'use client'
import { instructorApis } from "@/base/apis/instructor.api";
import { showAlertError, showAlertSuccess } from "@/base/ui/toaster";
import { ButtonIcon } from "@/components/button/button-icon.comp";
import TableBase from "@/components/table/table-base.comp";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";
import { Box, Chip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function TableStudentList() {
    const router = useRouter()
    const queryClient = useQueryClient();

    const { isLoading, data } = useQuery({
        queryKey: ['students'],
        queryFn: instructorApis.getStudents
    } );
    const { mutate, isPending } = useMutation({
        mutationFn: instructorApis.deleteStudent,
        onError: (error) => {
            console.error('Error calling api:', error);
            showAlertError(error.message)

        },
        onSuccess: (data) => {
            //fresh data
            showAlertSuccess('Deleted a student!')
            queryClient.invalidateQueries({ queryKey: ['students'] });
        },
    });

    const columns: GridColDef[] = [
        {
            field: 'order', headerName: 'Order', renderCell: (params) => {
                return params.api.getRowIndexRelativeToVisibleRows(params.id) + 1;
            }
        },
        { field: 'name', headerName: 'Name', flex: 0.25 },
        { field: 'phoneNumber', headerName: 'Phone Number', flex: 0.25 },
        { field: 'email', headerName: 'Email', flex: 0.25 },
        {field: 'active', headerName: 'Status', flex: 0.2, renderCell: (params) => (
                <Chip
                    label={params.row.active? 'Active' : 'Unverified'}
                    color={params.row.active ? "success" : "warning"}
                    size="medium"
                    variant="filled"
                />
            ),
        },
        {field: "action",
            headerName: "", flex: 0.25,
            renderCell: (params) => (
                <Box>
                    <ButtonIcon iconComp={<PencilSquareIcon height={20} width={20} />}
                        buttonProps={{ color: 'primary' }}
                        onClick={() => router.push(`/instructor/students/${params.row.phoneNumber}`)} />
                    <ButtonIcon iconComp={<TrashIcon height={20} width={20} />}
                        buttonProps={{ color: 'error', loading: isPending }}
                        onClick={() => mutate(params.row.phoneNumber)} />

                </Box>
            ),
        },
    ];
    return <TableBase loading={isLoading} rows={data} columns={columns} />

}