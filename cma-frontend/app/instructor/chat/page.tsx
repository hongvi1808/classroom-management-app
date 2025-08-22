'use client'
import { Box, CircularProgress, Divider, Paper, Stack, Typography } from "@mui/material";
import { ChatingForm } from "../../../components/chating/chating-form.comp";
import { MessageBox } from "@/components/chating/message-box.comp";
import { useCallback, useEffect, useState } from "react";
import { getSessionLocal } from "@/base/uitls";
import { useMutation, useQuery } from "@tanstack/react-query";
import { instructorApis } from "@/base/apis/instructor.api";
import { ListUser } from "@/components/chating/list-user.comp";
import { useSocket } from "@/base/socket/useSocket";
import { showAlertError } from "@/base/ui/toaster";

export default function ChatingPage() {
    const phoneHost = getSessionLocal()?.phoneNumber
    const { socketClient, socketStatus } = useSocket(getSessionLocal()?.accessToken);
    const [receiver, setReceiver] = useState<any>()
    const [messages, setMessages] = useState<{ id: string; roomId: string, senderId: string; text: string, receiverId: string }[]>([]);
    const { data: studentList } = useQuery({
        queryKey: ['students'],
        queryFn: instructorApis.getStudents
    });
    const { isLoading, data } = useQuery({
        queryKey: ['message-history', [phoneHost, receiver?.id]],
        queryFn: async () => await instructorApis.getMessageHistory([phoneHost, receiver?.id]),
        enabled: !!phoneHost && !!receiver?.id,
    });
    const { mutate, isPending } = useMutation({
        mutationFn: instructorApis.pushMessage,
        onError: (error) => {
            console.error('Error calling api:', error);
            showAlertError(error.message)

        },
        onSuccess: (data) => {
            messages.push(data)
        },
    });
    const onHandleSelect = useCallback((user: any) => {
        setReceiver(user)
        setMessages([])
    }, [])
    useEffect(() => setReceiver(studentList?.[0]), [studentList])

   useEffect(() => {
        if (!socketClient || receiver?.id) return;
        socketClient.on('chating', (mes: any) => {
            setMessages((previous) => [...previous, mes] )
        })
        return () => {socketClient.off('disconnect')}
    }, [socketClient, receiver?.id])


    const handleSendText = useCallback(async (text: string) => {
        const data = {
            text,
            senderId: phoneHost,
            receiverId: receiver?.id,
            id: ''

        }
        mutate(data)
    }, [mutate, phoneHost, receiver?.id])
    return <Stack direction={'column'} spacing={4} sx={{ marginLeft: 2 }}>
        <Paper elevation={3} sx={{ p: 2, borderRadius: 1 }}>
            <Stack direction={'row'} spacing={2} justifyContent={'space-between'} sx={{ marginLeft: 2, marginBottom: 2 }}>
                <Stack flex={3}>
                    <Typography component={'h1'} variant="h6">{'List User'}</Typography>

                    <ListUser onSelectUser={onHandleSelect} defaultSelected={studentList?.[0]} users={studentList || []} />
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
                        {isLoading ? <Stack height={'100%'} alignItems={'center'} justifyContent={'center'}><CircularProgress /></Stack> :
                            (data?.history || []).map((m: any) => (
                                <MessageBox key={m.id} text={m.text} isOwn={m.receiverId === receiver?.id} />
                            ))}
                        {(messages || []).filter(i => i?.roomId === data?.roomId).map((m) => (
                            <MessageBox key={m.id} text={m.text} isOwn={m.receiverId === receiver?.id} />
                        ))}
                    </Box>


                    <ChatingForm isPending={isPending} onSendText={handleSendText} />
                </Stack>
            </Stack>

        </Paper>
    </Stack>

}
