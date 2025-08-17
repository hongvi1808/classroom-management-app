'use client'
import { instructorApis } from "@/base/apis/instructor.api";
import { showAlertError, showAlertSuccess } from "@/base/ui/toaster";
import { ROLE_INSTRCTOR, ROLE_STUDENT, validEmail, validPhone, validRequire } from "@/base/uitls";
import { AutocompleteBase } from "@/components/autocomplete/autocomplete-base.comp";
import { ButtonIconText } from "@/components/button/buton-iconText.comp";
import { ButtonIcon } from "@/components/button/button-icon.comp";
import { TextFieldBase, TextFiledControlBase } from "@/components/textfield/textfield.comp";
import { ArrowPathIcon, ArrowRightStartOnRectangleIcon, PlusIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper, Stack, styled, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function AddStudentForm() {
    const queryClient = useQueryClient();
    const [freshAt, setFreshAt] = useState<number>(0)
    const { mutate, isPending } = useMutation({
        mutationFn: instructorApis.addStudent,
        onError: (error) => {
            console.error('Error calling api:', error);
            showAlertError(error.message)

        },
        onSuccess: (data) => {
            //fresh data
            showAlertSuccess('Added a student!')
            onToggleDiaglog()
            queryClient.invalidateQueries({ queryKey: ['students'] });
        },
    });


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries())
        mutate(data)
    }
    const [open, setOpen] = useState(false);

    const onToggleDiaglog = () => {
        setOpen(!open)
    }
    return <Box>
        <Stack direction={'row'} spacing={2}>
            <ButtonIconText
                iconComp={<PlusIcon height={20} width={20} />}
                onClick={(e => onToggleDiaglog())}
                title={'Add Student'}
                buttonProps={{ size: 'medium' }}
            />
            <ButtonIcon
                onClick={() => setFreshAt(Date.now())}
                buttonProps={{ size: 'medium', variant: 'outlined' }}
                iconComp={<ArrowPathIcon height={20} width={20} />} />
        </Stack>
        <Dialog fullWidth maxWidth={'md'} open={open} onClose={onToggleDiaglog}>
            <DialogTitle><Typography component={'h1'} variant="h4">{'Add new student'}</Typography></DialogTitle>
            <DialogContent>
                <Box
                    component="form"
                    id="add-student-form"
                    onSubmit={handleSubmit}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2, }}
                >
                    <Grid container rowSpacing={3} columnSpacing={{ sm: 3, md: 5 }}>
                        <Grid size={6} >
                            <TextFiledControlBase
                                name='name'
                                label="Name"
                                getErrorMessage={validRequire}
                            />
                        </Grid>
                        <Grid size={6}>
                            <AutocompleteBase<string, false>
                                options={[ROLE_INSTRCTOR, ROLE_STUDENT]}
                                label="Role"
                                name="role"
                                defaultValue={ROLE_STUDENT}
                                renderInput={(param) => <></>}
                            />

                        </Grid>
                        <Grid size={6}>
                            <TextFiledControlBase
                                name='phoneNumber'
                                label="Phone Number"
                                getErrorMessage={validPhone}
                                inputProps={{ type: 'tel' }}
                            />
                        </Grid>
                        <Grid size={6}>
                            <TextFiledControlBase
                                name='email'
                                label="Email"
                                getErrorMessage={validEmail}
                                inputProps={{ type: 'email' }}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions sx={{ margin: 2 }} >
                <ButtonIconText iconComp={<XMarkIcon height={20} width={20} />}
                    title="Cancel"
                    buttonProps={{ color: 'error', variant: 'outlined', size: 'medium' }}
                    onClick={() => onToggleDiaglog()}
                />
                <ButtonIconText
                    iconComp={<ArrowRightStartOnRectangleIcon height={20} width={20} />}
                    title="Submit" buttonProps={{ type: "submit", size: 'medium', loading: isPending, form: 'add-student-form' }}
                />
            </DialogActions>
        </Dialog>
    </Box>

}