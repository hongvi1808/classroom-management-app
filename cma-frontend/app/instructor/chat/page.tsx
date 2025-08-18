'use client'
import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import { ChatingForm } from "../../../components/chating/chating-form.comp";
import { MessageBox } from "@/components/chating/message-box.comp";
import { db } from "@/base/firebase/firebase";
import { equalTo, onValue, orderByChild, push, query, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { createRoomIdChat, getSessionLocal } from "@/base/uitls";
import { useQuery } from "@tanstack/react-query";
import { instructorApis } from "@/base/apis/instructor.api";
import { ListUser } from "@/components/chating/list-user.comp";

export default function ChatingPage() {
    const phoneHost = getSessionLocal()?.phoneNumber
    const messagesRef = ref(db, "messages");
    const [receiver, setReceiver] = useState<any>()
    const [messages, setMessages] = useState<{ id: string; senderId: string; text: string, receiverId: string }[]>([]);
    const { isLoading, data } = useQuery({
        queryKey: ['students'],
        queryFn: instructorApis.getStudents
    });
    const onHandleSelect = (user: any) => {
        setReceiver(user)
    }
    useEffect(()=> setReceiver(data?.[0]), [data])
    useEffect(() => {
        if (!receiver) return;
        const messagesRef = ref(db, "messages");
        // Query theo điều kiện roomId
        const messagesQuery = query(
            messagesRef,
            orderByChild("roomId"),
            equalTo(createRoomIdChat(phoneHost, receiver?.id))
        );
        const unsubscribe = onValue(messagesQuery, (snapshot) => {
            const data = snapshot.val() || {};
            const parsed = Object.entries(data).map(([id, value]: any) => ({
                id: id,
                text: value.text,
                receiverId: value.receiverId,
                senderId: value.senderId,
            }));
            setMessages(parsed);
        });
        return () => unsubscribe();
    }, [receiver]);

    const handleSendText = async (text: string) => {
        await push(messagesRef,
            {
                text,
                senderId: phoneHost,
                receiverId: receiver?.id,
                roomId: createRoomIdChat(phoneHost, receiver?.id)

            }
        );
    }
    return <Stack direction={'column'} spacing={4} sx={{ marginLeft: 2 }}>
        <Paper elevation={3} sx={{ p: 2, borderRadius: 1 }}>
            <Stack direction={'row'} spacing={2} justifyContent={'space-between'} sx={{ marginLeft: 2, marginBottom: 2 }}>
                <Stack flex={3}>
                    <Typography component={'h1'} variant="h6">{'List User'}</Typography>

                     <ListUser onSelectUser={onHandleSelect} defaultSelected={data?.[0]} users={data || []} />
                </Stack>
                <Divider orientation="vertical" flexItem />
                <Stack height={'75vh'} flex={8}>
                    <Box

                        sx={{
                            flex: 1,
                            overflowY: "auto",
                            mb: 2,
                            px: 1,
                        }}
                    >
                        {messages.map((m, index) => (
                            <MessageBox key={index} text={m.text} isOwn={m.receiverId === receiver?.id} />
                        ))}
                    </Box>
                    <ChatingForm onSendText={handleSendText} />
                </Stack>
            </Stack>

        </Paper>
    </Stack>

}
