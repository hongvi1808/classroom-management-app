import { UserIcon } from "@heroicons/react/16/solid"
import { Avatar, Box, Icon, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material"

interface IMessageBoxProps {
    text: string
    isOwn: boolean

}
export function MessageBox(props: IMessageBoxProps) {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: props.isOwn ? "flex-end" : "flex-start",
                mb: 1,
            }}
        >
            <Box
                sx={{
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    maxWidth: "70%",
                    bgcolor: props.isOwn ? "primary.main" : "grey.300",
                    color: props.isOwn ? "white" : "black",
                }}
            >
                <Typography variant="body1">{props.text}</Typography>
            </Box>
        </Box>
    )


}