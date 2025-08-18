'use client'
import { studentApis } from "@/base/apis/student.api";
import { showAlertError, showAlertSuccess } from "@/base/ui/toaster";
import { getSessionLocal, validEmail, validPhone, validRequire } from "@/base/uitls";
import { ButtonIconText } from "@/components/button/buton-iconText.comp";
import { TextFiledControlBase } from "@/components/textfield/textfield.comp";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/16/solid";
import { Avatar, Box, Chip, Grid, Stack, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";

export function UpdateProfileForm() {
    const phoneNumber = getSessionLocal()?.phoneNumber

    const { isLoading, data } = useQuery({
        queryKey: ['profile', phoneNumber],
        queryFn: () => studentApis.getProfile(phoneNumber),
        enabled: !!phoneNumber
    })
    const { mutate, isPending } = useMutation({
        mutationFn: studentApis.editProfile,
        onError: (error) => {
            console.error('Error calling api:', error);
            showAlertError(error.message)

        },
        onSuccess: (data) => {
            showAlertSuccess('Update Successfully!')
        },
    });
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const datas = Object.fromEntries(formData.entries())
        datas.id = phoneNumber;
        mutate(datas)
    }
    return <Stack spacing={2}>
        <Stack direction={'row'} spacing={2} justifyContent={'space-between'}>
            <Typography component={'h1'} variant="h4">{'Update Information'}</Typography>
            <ButtonIconText
                iconComp={<ArrowRightStartOnRectangleIcon height={20} width={20} />}
                title={'Update Info'}
                buttonProps={{ size: 'medium', loading: isPending, type: 'submit', form: 'update-profile-form' }}
            />
        </Stack>
        <Box
            component="form"
            id="update-profile-form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex',  flexDirection: 'column', gap: 2, }}
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
                    <TextFiledControlBase
                        name='phoneNumber'
                        label="Phone Number"
                        getErrorMessage={validPhone}
                        inputProps={{ type: 'tel', defaultValue: data?.phoneNumber }}
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
                <Grid alignSelf={'center'} size={6} >
                    <Typography >{`Created At: ${new Date(data?.createdAt)}`}</Typography>
                </Grid>
                <Grid size={6} >
                    <Chip
                        label={data?.active ? 'Active' : 'Blocked'}
                        color={data?.active ? "success" : "warning"}
                        size="medium"
                        variant={data?.active ? "filled" : "outlined"}
                    />
                </Grid>
            </Grid>
        </Box>
    </Stack>

}