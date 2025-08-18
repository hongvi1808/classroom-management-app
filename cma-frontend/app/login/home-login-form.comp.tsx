'use client'
import { validRequire } from "@/base/uitls"
import { TextFiledControlBase } from "@/components/textfield/textfield.comp"
import { Box, Button } from "@mui/material"

export function HomeLoginForm() {
    
    const validUsername = (value: string) => {
       if (validRequire(value)) return validRequire(value)
        if (!(/^[a-z0-9]+$/).test(value)) return 'Use only letters and numbers, no spaces or accents'
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data =  Object.fromEntries(formData.entries())
        // TODO call api post
    }
    return <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
        <TextFiledControlBase
            name='username'
            getErrorMessage={validUsername}
            inputProps={{placeholder: 'Your username', required: true,}}
        />
        <TextFiledControlBase
            name='password'
            getErrorMessage={validRequire}
            inputProps={{placeholder: 'Your password', type: 'password', required: true}}
        />
        <Button
            type="submit"
            fullWidth
            variant="contained"
        >
            {'Submit'}
        </Button>
    </Box>
}