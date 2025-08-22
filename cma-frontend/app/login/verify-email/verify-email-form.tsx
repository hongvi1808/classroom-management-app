'use client'
import { authApis } from "@/base/apis/auth.api"
import { showAlertError } from "@/base/ui/toaster"
import { SESSION_LOCAL_STORAGE_KEY, validRequire } from "@/base/uitls"
import { TextFiledControlBase } from "@/components/textfield/textfield.comp"
import { Box, Button } from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export function VerifyEmailForm() {
    const router = useRouter();
    const { mutate, isPending } = useMutation({
        mutationFn: authApis.verifyEmailByCode,
        onError: (error) => {
            console.error('Error calling api:', error);
            showAlertError(error.message)
        },
        onSuccess: (data) => {
            localStorage.removeItem('email')
            localStorage.setItem(SESSION_LOCAL_STORAGE_KEY, JSON.stringify(data))
            router.push('/')
        },
    });

    const validCode = (value: string) => {
        if (validRequire(value)) return validRequire(value)
        if (!(/^\d{6}$/).test(value)) return 'Your code is invalid'
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries())
        
        const email = localStorage.getItem('email')
        if (!email) {
            router.replace('login/phone')
            return;
        }
        data.email = email
        mutate(data)
    }
    return <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
        <TextFiledControlBase
            name='accessCode'
            getErrorMessage={validCode}
            inputProps={{ placeholder: 'Your access code from email', required: true, type: 'tel' }}
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