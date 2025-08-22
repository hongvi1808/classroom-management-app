'use client'
import { authApis } from "@/base/apis/auth.api";
import { showAlertError, showAlertSuccess } from "@/base/ui/toaster";
import { validRequire } from "@/base/uitls"
import { TextFiledControlBase } from "@/components/textfield/textfield.comp"
import { Box, Button } from "@mui/material"
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function SetupAccountForm({id}: {id: string}) {
    
    const router = useRouter()
    const { mutate, isPending } = useMutation({
        mutationFn: authApis.setupAccount,
        onError: (error) => {
            console.error('Error calling api:', error);
            showAlertError(error?.message)
        },
        onSuccess: (data) => {
            //fresh data
            showAlertSuccess('Created account successfully!')
            router.push('/login')

        },
    });
    const validUsername = (value: string) => {
        if (validRequire(value)) return validRequire(value)
        if (!(/^[a-z0-9]+$/).test(value)) return 'Use only letters and numbers, no spaces or accents'
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries())
        data.id = id
        mutate(data)
    }
    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
            <TextFiledControlBase
                name='username'
                label="Username"
                getErrorMessage={validUsername}
                inputProps={{ placeholder: 'Your username', required: true, }}
            />
            <TextFiledControlBase
                name='password'
                label="Password"
                getErrorMessage={validRequire}
                inputProps={{ placeholder: 'Your password', type: 'password', required: true }}
            />
            <Button
                loading={isPending}
                type="submit"
                fullWidth
                variant="contained"
            >
                {'Submit'}
            </Button>
            <Button
                onClick={() => router.push('/login/email')}
                fullWidth
                variant="text"
                color="secondary"
            >
                {'Skip'}
            </Button>
        </Box>
    )
}