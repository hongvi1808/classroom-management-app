'use client'
import { instructorApis } from "@/base/apis/instructor.api";
import { showAlertError, showAlertSuccess } from "@/base/ui/toaster";
import { ROLE_INSTRCTOR, ROLE_STUDENT, validEmail, validPhone, validRequire } from "@/base/uitls";
import { AutocompleteBase } from "@/components/autocomplete/autocomplete-base.comp";
import { ButtonIconText } from "@/components/button/buton-iconText.comp";
import TableBase from "@/components/table/table-base.comp";
import { TextFiledControlBase } from "@/components/textfield/textfield.comp";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/16/solid";
import { Box, Chip, Grid, Stack, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useMutation, useQuery } from "@tanstack/react-query";

export function UpdateStudentForm({ phone }: { phone: string }) {
    const { isLoading, data } = useQuery({
        queryKey: ['student', phone],
        queryFn: () => instructorApis.getStudentByPhone(phone),
        enabled: !!phone
    })
    const { mutate, isPending } = useMutation({
        mutationFn: instructorApis.updateStudent,
        onError: (error) => {
            console.error('Error calling api:', error);
            showAlertError(error.message)

        },
        onSuccess: (data) => {
            showAlertSuccess('Update Successfully!')
        },
    });
    const columns: GridColDef[] = [
        {
            field: 'order', headerName: 'Order', renderCell: (params) => {
                return params.api.getRowIndexRelativeToVisibleRows(params.id) + 1;
            }
        },
        { field: 'title', headerName: 'Title Lesson', flex: 0.2 },
        { field: 'description', headerName: 'Description', flex: 0.3 },
        {
            field: 'status', headerName: 'Status', flex: 0.1,
            renderCell: (params) => (
                <Chip
                    label={params.row.status}
                    color={params.row.status === 'done' ? "success" : "warning"}
                    size="medium"
                    variant="filled"
                />
            ),
        },

        // { field: 'deliveredAt', headerName: 'Assigned At', flex: 0.1 },
        // { field: 'completedAt', headerName: 'Completed At', flex: 0.1 },
    ];
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const datas = Object.fromEntries(formData.entries())
        datas.id = phone;
        mutate(datas)
    }
    return <Stack spacing={2}>
        <Stack direction={'row'} spacing={2} justifyContent={'space-between'}>
            <Typography component={'h1'} variant="h4">{'Student Information'}</Typography>
            <ButtonIconText
                iconComp={<ArrowRightStartOnRectangleIcon height={20} width={20} />}
                title={'Update Info'}
                buttonProps={{ size: 'medium', loading: isPending, type: 'submit', form: 'update-student-form' }}
            />
        </Stack>
        <Box
            component="form"
            id="update-student-form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, }}
        >


            <Grid container rowSpacing={3} columnSpacing={{ sm: 3, md: 5 }}>
                <Grid size={6} >
                    <TextFiledControlBase
                        name='name'
                        label="Name"
                        inputProps={{ defaultValue: data?.name }}
                        getErrorMessage={validRequire}
                    />
                </Grid>
                <Grid size={6}>
                    <AutocompleteBase<string, false>
                        options={[ROLE_INSTRCTOR, ROLE_STUDENT]}
                        label="Role"
                        name="role"
                        default={data?.role}
                        renderInput={(param) => <></>}
                    />

                </Grid>
                <Grid size={6}>
                    <TextFiledControlBase
                        name='phoneNumber'
                        label="Phone Number"
                        getErrorMessage={validPhone}
                        inputProps={{ type: 'tel', defaultValue: data?.phoneNumber, disabled: true }}
                    />
                </Grid>
                <Grid size={6}>
                    <TextFiledControlBase
                        name='email'
                        label="Email"
                        getErrorMessage={validEmail}
                        inputProps={{ type: 'email', defaultValue: data?.email }}
                    />
                </Grid>
            </Grid>
        </Box>
        <TableBase sx={{ marginTop: 2 }} loading={isLoading} rows={data?.lessons || []} columns={columns} />
    </Stack>

}