'use client'

import { Box, Drawer, Icon, List, ListItem, ListItemButton, ListItemText, Stack, Toolbar, useMediaQuery, useTheme } from "@mui/material"
import {  StarIcon } from "@heroicons/react/16/solid";
import { usePathname, useRouter } from "next/navigation";

type MenuType ={ text: string; href: string; icon: any}
export interface SitebarProps {
  open: boolean;
  menus: MenuType[]; 
  isOverSmViewport: boolean
}
export function Sitebar(props: SitebarProps) {
       const router = useRouter()
       const pathname = usePathname();

    return <Drawer
            variant={props.isOverSmViewport ? 'permanent' : 'temporary'}
            open={props.open}
        >
            <Toolbar />
            <List>
                {props.menus?.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{ display: "block" }}>
                        <ListItemButton
                        selected={item.href === pathname}
                            sx={{
                                minWidth: props.open? 240 : 120,
                                display: "flex",
                                justifyContent:  props.open ? 'flex-start' : "center",
                                alignItems: "center",
                                margin: 1,
                                borderRadius: 2
                            }}
                            onClick={() => router.push(item.href)}
                        >
                            <Stack spacing={props.open ? 1 : 0} direction={props.open ? 'row' : 'column'}
                                sx={{
                                    justifyContent: props.open ? 'flex-start' : "center",
                                    alignItems: props.open ? 'flex-start' : "center",
                                }}>

                                <Icon sx={{ justifyContent: 'center', alignContent: 'center', }} >
                                    {item.icon || <StarIcon width={20} height={20} />}
                                </Icon>
                                <ListItemText primary={item.text} sx={{
                                    textAlign: props.open ? "left" : "center",
                                    "& .MuiTypography-root": {
                                        fontSize: props.open ? "1rem" : "0.75rem",
                                        fontWeight: props.open ? 500 : 400,
                                    },
                                    marginY: props.open ? 'inherit': 0
                                }} />
                            </Stack>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>

}