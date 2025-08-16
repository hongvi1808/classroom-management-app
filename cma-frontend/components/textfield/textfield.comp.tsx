'use client'
import { BaseTextFieldProps, FormControl, FormLabel, TextField, } from "@mui/material";
import { useState } from "react";

export function TextFieldBase(props: BaseTextFieldProps) {
    return <TextField
        fullWidth
        size="small"
        {...props}
    />
}

export interface ITextFieldControlBaseProps {
    name: string
    label?: string
    inputProps?: BaseTextFieldProps
    getErrorMessage?: (value: any) => string | undefined

}
export function TextFiledControlBase(props: ITextFieldControlBaseProps) {
    const [errorMessage, setErrorMessage] = useState<string>();
    const onBlurHandle = (event: any) => {
        const value = event.target.value;
        if (props.getErrorMessage) {
            const message = props.getErrorMessage(value)
            setErrorMessage(message)
        }
    }
    return <FormControl>
        {!!props.label && <FormLabel htmlFor={props.name}>{props.label}</FormLabel>}
        <TextFieldBase
            autoComplete={props.name}
            name={props.name}
            id={props.name}
            fullWidth
            onBlur={onBlurHandle}
            error={!!errorMessage}
            helperText={errorMessage}
            color={errorMessage ? 'error': 'primary'}
            {...props.inputProps}
        />
    </FormControl>
}