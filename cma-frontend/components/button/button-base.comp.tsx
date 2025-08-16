'use client';
import { Button, ButtonProps } from '@mui/material';
import * as React from 'react';

export function ButtonBase(props: ButtonProps) {
    return (
        <Button 
            sx={{
                textTransform: 'none',
                transition: 'color 0.3s ease, opacity 0.3s ease',
                '&:hover ': {
                    opacity: 0.8
                },
            }} {...props} />
    );
}


