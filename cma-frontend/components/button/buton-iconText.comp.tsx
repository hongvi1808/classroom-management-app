'use client';
import { Box, Button, ButtonProps, Icon, Stack } from '@mui/material';
import * as React from 'react';
import { ButtonBase } from './button-base.comp';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';

interface IButtonIconProps {
    iconComp: any
    title: string;
    onClick?: (e: any) => void
    buttonProps?: ButtonProps

}
export function ButtonIconText(props: IButtonIconProps) {
    return (
        <ButtonBase
            color='primary'
            variant='contained'
            size={'small'}
            onClick={props.onClick}
            children={<Stack spacing={2} direction={'row'} >
                <Icon sx={{ justifyContent: 'center', alignContent: 'center' }} >
                    {props.iconComp}
                </Icon>
                {props.title}
            </Stack>}
            {...props.buttonProps} />
    );
}


