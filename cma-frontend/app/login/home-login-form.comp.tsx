'use client'
import { authApis } from "@/base/apis/auth.api";
import { showAlertError, showAlertSuccess } from "@/base/ui/toaster";
import { SESSION_LOCAL_STORAGE_KEY, validRequire } from "@/base/uitls"
import { TextFiledControlBase } from "@/components/textfield/textfield.comp"
import { Box, Button } from "@mui/material"
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function HomeLoginForm() {
    const router = useRouter()
    const { mutate, isPending } = useMutation({
        mutationFn: authApis.loginAccount,
        onError: (error) => {
            console.error('Error calling api:', error);
            showAlertError(error.message)
        },
        onSuccess: (data) => {
            localStorage.setItem(SESSION_LOCAL_STORAGE_KEY, JSON.stringify(data))
            router.push('/')

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
        // TODO call api post
        mutate(data)
    }
    return <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
        <TextFiledControlBase
            name='username'
            getErrorMessage={validUsername}
            inputProps={{ placeholder: 'Your username', required: true, }}
        />
        <TextFiledControlBase
            name='password'
            getErrorMessage={validRequire}
            inputProps={{ placeholder: 'Your password', type: 'password', required: true }}
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