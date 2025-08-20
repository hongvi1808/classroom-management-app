'use client'

import { Box, Icon, Toolbar, useMediaQuery, useTheme, } from "@mui/material"
import Header from "./header.comp"
import { useState } from "react";
import { Sitebar } from "./sitebar.comp";
import { getSessionLocal } from "@/base/uitls";
import { LightBulbIcon } from "@heroicons/react/24/outline";

export function LayoutInstructor({
    children,
    menu
}: {
    children: React.ReactNode;
    menu: any
}) {

    const theme = useTheme();
    const isOverSmViewport = useMediaQuery(theme.breakpoints.up('sm'));

    const [open, setOpen] = useState(true);

    return <Box sx={{ display: "flex" }}>
        <Header title="CMApp" logo={<Icon sx={{ justifyContent: 'center', alignContent: 'center', color: 'orange' }} >
            <LightBulbIcon />
        </Icon>} menuOpen={open} onToggleMenu={(op) => setOpen(op)} />
        <Sitebar menus={menu} open={open} isOverSmViewport={isOverSmViewport} />

        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                minWidth: 0,
            }}
        >
            <Toolbar sx={{ displayPrint: 'none' }} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    transition: "margin 0.3s",
                    marginLeft: isOverSmViewport ? open ? '240px' : '120px' : 0,
                }}
            >
                {children}
            </Box>
        </Box>

    </Box>

}