'use client'

import { Box, Toolbar, useMediaQuery, useTheme, } from "@mui/material"
import Header from "./header.comp"
import { useState } from "react";
import { BookOpenIcon, ChatBubbleLeftIcon, StarIcon, UserGroupIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import { Sitebar } from "./sitebar.comp";

export function LayoutInstructor({
    children,
}: {
    children: React.ReactNode;
}) {
    const instructorMenu = [{
        text: 'Manage Student',
        href: '/instructor/students',
        icon: <UserGroupIcon width={20} height={20} />,
    },
    {
        text: 'Manage Lesson',
        href: '/instructor/lessons',
        icon: <BookOpenIcon width={20} height={20} />,
    },
    {
        text: 'Massage',
        href: '/instructor/chat',
        icon: <ChatBubbleLeftIcon width={20} height={20} />,
    },
    ]
    const theme = useTheme();
       const isOverSmViewport = useMediaQuery(theme.breakpoints.up('sm'));

    const [open, setOpen] = useState(true);

    return <Box sx={{ display: "flex" }}>
        <Header menuOpen={open} onToggleMenu={(op) => setOpen(op)} />
        <Sitebar menus={instructorMenu} open={open} isOverSmViewport={isOverSmViewport} />

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
                    marginLeft: isOverSmViewport ? open ?'240px' : '120px': 0,
                }}
            >
                {children}
            </Box>
        </Box>

    </Box>

}