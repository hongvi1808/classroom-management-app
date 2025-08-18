'use client'
import { authApis } from "@/base/apis/auth.api"
import { showAlertError } from "@/base/ui/toaster"
import { validEmail, validRequire } from "@/base/uitls"
import { TextFiledControlBase } from "@/components/textfield/textfield.comp"
import { Box, Button } from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation";

export function EmailLoginForm() {
    const router = useRouter();

    const { mutate, isPending } = useMutation({
        mutationFn: authApis.loginPhone,
        onError: (error) => {
            console.error('Error calling api:', error);
            showAlertError(error.message)

        },
        onSuccess: (data) => {
            localStorage.setItem('email', data.email)
            router.push('/login/verify-email')
        },
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries())
        mutate(data)
    }
    return <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
        <TextFiledControlBase
            name='email'
            getErrorMessage={validEmail}
            inputProps={{ placeholder: 'Your email', required: true, type: 'email' }}
        />
        <Button
            type="submit"
            fullWidth
            loading={isPending}
            variant="contained"
        >
            {'Submit'}
        </Button>
    </Box>
}