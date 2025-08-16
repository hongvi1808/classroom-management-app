'use client'
import { authApis } from "@/base/apis/auth.api"
import { showAlertError } from "@/base/ui/toaster"
import { validRequire } from "@/base/uitls"
import { TextFiledControlBase } from "@/components/textfield/textfield.comp"
import { Box, Button } from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation";

export function PhoneLoginForm() {
    const router = useRouter();

    const { mutate, isPending } = useMutation({
        mutationFn: authApis.loginPhone,
        onError: (error) => {
            console.error('Error calling api:', error);
            showAlertError(error.message)

        },
        onSuccess: (data) => {
            localStorage.setItem('phoneNumber', data.phoneNumber)
            router.push('/login/verify-phone')
        },
    });

    const validPhone = (value: string) => {
        if (validRequire(value)) return validRequire(value)
        if (!(/^(0|\+84)(\d{9})$/).test(value)) return 'Your number phone is invalid (in Vietnam)'
    }
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
            name='phoneNumber'
            getErrorMessage={validPhone}
            inputProps={{ placeholder: 'Your phone number', required: true, type: 'tel' }}
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