'use client';
import { Box, Button, ButtonProps, Icon } from '@mui/material';
import * as React from 'react';
import { ButtonBase } from './button-base.comp';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';

interface IButtonIconProps {
    iconComp: any
    onClick?: (e: any) => void
    buttonProps?: ButtonProps

}
export function ButtonIcon(props: IButtonIconProps) {
    return (
            <ButtonBase
                children={<Icon sx={{ justifyContent: 'center', alignContent: 'center' }} >
                    {props.iconComp}
                </Icon>}
                color='inherit'
                size={'small'}
                onClick={props.onClick}
                {...props.buttonProps}
            />
    );
}


