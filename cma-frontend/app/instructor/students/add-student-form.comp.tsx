'use client'
import { instructorApis } from "@/base/apis/instructor.api";
import { showAlertError, showAlertSuccess } from "@/base/ui/toaster";
import { ROLE_INSTRCTOR, ROLE_STUDENT, validEmail, validPhone, validRequire } from "@/base/uitls";
import { AutocompleteBase } from "@/components/autocomplete/autocomplete-base.comp";
import { ButtonIconText } from "@/components/button/buton-iconText.comp";
import { ButtonIcon } from "@/components/button/button-icon.comp";
import { TextFieldBase, TextFiledControlBase } from "@/components/textfield/textfield.comp";
import { ArrowPathIcon, ArrowRightStartOnRectangleIcon, BookmarkIcon, PlusIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper, Stack, styled, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function AddStudentForm() {
    const queryClient = useQueryClient();
    const [selectedPhones,setSelectedPhones] = useState<string[]>([])
    const { isLoading, data: students } = useQuery({
        queryKey: ['students'],
        queryFn: instructorApis.getStudents
    })
    const { mutate, isPending } = useMutation({
        mutationFn: instructorApis.addStudent,
        onError: (error) => {
            console.error('Error calling api:', error);
            showAlertError(error.message)

        },
        onSuccess: (data) => {
            //fresh data
            showAlertSuccess('Added a student!')
            onToggleAddDiaglog()
            queryClient.invalidateQueries({ queryKey: ['students'] });
        },
    });
    const { mutate: mutateAssign, isPending: assignPending } = useMutation({
        mutationFn: instructorApis.assignLesson,
        onError: (error) => {
            console.error('Error calling api:', error);
            showAlertError(error.message)
        },
        onSuccess: (data) => {
            //fresh data
            showAlertSuccess('Assign lesson successfully!')
            onToggleAssignDiaglog()
            queryClient.invalidateQueries({ queryKey: ['students'] });
        },
    });


    const handleSubmitAdd = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries())
        mutate(data)
    }
    const handleSubmitAssign = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries())
        mutateAssign({title: data.title, description: data.description, studentPhones: selectedPhones })
    }
    const [openAddDiag, setOpenAddDiag] = useState(false);
    const [openAssignDiag, setOpenAssignDiag] = useState(false);

    const onToggleAddDiaglog = () => {
        setOpenAddDiag(!openAddDiag)
    }
    const onToggleAssignDiaglog = () => {
        setOpenAssignDiag(!openAssignDiag)
    }
    return <Box>
        <Stack direction={'row'} spacing={2}>
            <ButtonIconText
                iconComp={<PlusIcon height={20} width={20} />}
                onClick={(e => onToggleAddDiaglog())}
                title={'Add Student'}
                buttonProps={{ size: 'medium' }}
            />
            <ButtonIconText
                iconComp={<BookmarkIcon height={20} width={20} />}
                onClick={(e => onToggleAssignDiaglog())}
                title={'Assign Lesson'}
                buttonProps={{ size: 'medium', color: 'secondary',loading: assignPending }}
            />
        </Stack>
        <Dialog fullWidth maxWidth={'md'} open={openAddDiag} onClose={onToggleAddDiaglog}>
            <DialogTitle>Add new student</DialogTitle>
            <DialogContent>
                <Box
                    component="form"
                    id="add-student-form"
                    onSubmit={handleSubmitAdd}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2, }}
                >
                    <Grid container rowSpacing={3} columnSpacing={{ sm: 3, md: 5 }}>
                        <Grid size={6} >
                            <TextFiledControlBase
                                name='name'
                                label="Name*"
                                inputProps={{required: true}}
                                getErrorMessage={validRequire}
                            />
                        </Grid>
                        <Grid size={6}>
                            <AutocompleteBase<string, false>
                                options={[ROLE_INSTRCTOR, ROLE_STUDENT]}
                                label="Role"
                                name="role"
                                disabled
                                defaultValue={ROLE_STUDENT}
                                renderInput={(param) => <></>}
                            />

                        </Grid>
                        <Grid size={6}>
                            <TextFiledControlBase
                                name='phoneNumber'
                                label="Phone Number*"
                                getErrorMessage={validPhone}
                                inputProps={{required: true}}
                            />
                        </Grid>
                        <Grid size={6}>
                            <TextFiledControlBase
                                name='email'
                                label="Email*"
                                getErrorMessage={validEmail}
                                inputProps={{required: true}}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions sx={{ margin: 2 }} >
                <ButtonIconText iconComp={<XMarkIcon height={20} width={20} />}
                    title="Cancel"
                    buttonProps={{ color: 'error', variant: 'outlined', size: 'medium' }}
                    onClick={() => onToggleAddDiaglog()}
                />
                <ButtonIconText
                    iconComp={<ArrowRightStartOnRectangleIcon height={20} width={20} />}
                    title="Submit" 
                    buttonProps={{ type: "submit", size: 'medium', loading: isPending, form: 'add-student-form' }}
                />
            </DialogActions>
        </Dialog>
        <Dialog fullWidth maxWidth={'md'} open={openAssignDiag} onClose={onToggleAssignDiaglog}>
            <DialogTitle>Assign lesson for students</DialogTitle>
            <DialogContent>
                <Box
                    component="form"
                    id="assign-lesson-form"
                    onSubmit={handleSubmitAssign}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2, }}
                >
                            <TextFiledControlBase
                                name='title'
                                label="Title Lesson*"
                                inputProps={{required: true}}
                                getErrorMessage={validRequire}
                            />
                            <AutocompleteBase<any, true>
                                multiple
                                // required
                                options={students || []}
                                label="Assign to Students"
                                name="students"
                                loading={isLoading}
                                getOptionLabel={(op) => op.name }
                                values={(value) => setSelectedPhones(value?.map((i:any)=> i.phoneNumber) || [])}
                                renderInput={(param) => <></>}
                            />

                            <TextFiledControlBase
                                name='description'
                                label="Description Lesson*"
                                getErrorMessage={validRequire}
                                inputProps={{multiline: true, rows: 4, required: true}}
                            />
                </Box>
            </DialogContent>
            <DialogActions sx={{ margin: 2 }} >
                <ButtonIconText iconComp={<XMarkIcon height={20} width={20} />}
                    title="Cancel"
                    buttonProps={{ color: 'error', variant: 'outlined', size: 'medium' }}
                    onClick={() => onToggleAssignDiaglog()}
                />
                <ButtonIconText
                    iconComp={<ArrowRightStartOnRectangleIcon height={20} width={20} />}
                    title="Submit" buttonProps={{ type: "submit", size: 'medium', loading: isPending, form: 'assign-lesson-form' }}
                />
            </DialogActions>
        </Dialog>
    </Box>

}