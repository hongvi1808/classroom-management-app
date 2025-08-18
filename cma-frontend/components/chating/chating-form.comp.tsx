'use client'
import { ButtonIcon } from "@/components/button/button-icon.comp";
import { TextFiledControlBase } from "@/components/textfield/textfield.comp";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import { Paper } from "@mui/material";

interface IChattingFormProps {
    onSendText: (message: string) => void
}
export function ChatingForm(props: IChattingFormProps) {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const values = event.currentTarget;
        const formData = new FormData(values);
        const data: any = Object.fromEntries(formData.entries())
        if (!data?.message?.trim()) return;
        props.onSendText(data?.message?.trim())
        values.reset()
    }
    return <Paper
        elevation={3}
        component={'form'}
        onSubmit={handleSubmit}
        id="chating-form-id"
        sx={{
            p: 1,
            display: "flex",
            alignItems: "center",
            borderRadius: "2rem",
        }}
    >
        <TextFiledControlBase
            name="message"
            inputProps={{
                placeholder: "Texting something...",
                sx: { "& fieldset": { border: "none" } },
                // onKeyDown: (e) => e.key === "Enter" && props.onSendText(e.currentTarget?.textContent)

            }} />
        <ButtonIcon buttonProps={{ color: 'primary', type: 'submit', form: 'chating-form-id' }}
            iconComp={<PaperAirplaneIcon color="primary" />} />
    </Paper>
}