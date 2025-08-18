import { UserIcon } from "@heroicons/react/16/solid"
import { Avatar, Icon, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material"
import { useEffect, useState } from "react"

interface IListUserProps {
    users: any[]
    defaultSelected: any
    onSelectUser: (user: any) => void

}
export function ListUser(props: IListUserProps) {
    const [selected, setSelected] = useState<any>()
    useEffect(() => { setSelected(props.defaultSelected) }, [props.defaultSelected])
    const onSelectUser =(user: any) => {
        setSelected(user)
        props.onSelectUser(user)
    }
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {(props.users || []).map((item, key) => (
                <ListItemButton selected={item.id === selected?.id} key={key} onClick={() => onSelectUser(item)}>
                    <ListItemAvatar>
                        <Avatar>
                            <Icon><UserIcon /></Icon>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={item.name || 'INSTRUCTOR'} secondary={item.phoneNumber} />
                </ListItemButton>
            ))}

        </List>
    )


}