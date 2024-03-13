/* eslint-disable react/no-unescaped-entities */
"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Chat from "../components/Chat";
import ChatRooms from "../components/ChatRooms";
import ChatUserProfile from "../components/ChatUserProfile";

const ChatPage = () => {
    /* const URL = process.env.NODE_ENV === 'production' ? 'Your production URL' : 'http://localhost:3001';
    const socket = io(URL); */
    const { data: session } = useSession();
    const [currentRoom, setCurrentRoom] = useState('');
    const [ws, setWs] = useState<WebSocket>();

    useEffect(() => {
        // Initialize WebSocket connection
        const wsInit = new WebSocket(`ws://localhost:3001/ws`);
        setWs(wsInit);

        wsInit.onopen = () => {
            console.log('WebSocket connection established');
        };

        wsInit.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        wsInit.onmessage = (e) => {
            // Handle incoming messages
            console.log('Message from server:', e.data);
        };

        wsInit.onclose = () => {
            console.log('WebSocket connection closed');
        };

        // Cleanup on component unmount
        return () => {
            wsInit.close();
        };
    }, []);

    /* const joinRoom = (roomName: any) => {
        if (session?.user?.id) {
            setCurrentRoom(roomName);
            socket.emit('leave room', currentRoom);
            socket.emit('join room', { username: session.user.firstname, room: roomName });
        }
    }; */

    return (
        <>
            {session?.user && ws ? (
                <div className="flex flex-row h-dvh size-auto justify-center gap-4 *:rounded-2xl *:border *:border-zinc-100 *:bg-zinc-50 dark:text-sky-300 dark:*:border-sky-500/15 dark:*:bg-sky-500/10 *:h-3/4">
                    <div className="w-2/12">
                        {/* <button onClick={() => joinRoom('room1')}>Room 1</button>
                        <button onClick={() => joinRoom('room2')}>Room 2</button> */}
                        <ChatRooms className="w-2/12" user={session.user} />
                    </div>
                    <div className="w-6/12 flex flex-col h-screen">
                        <Chat className="w-full h-full flex-1 overflow-auto" user={session.user} session={session} websocket={ws}/>
                    </div>
                    <ChatUserProfile className="w-3/12" user={session.user} />
                </div>) : (
                <div className="flex justify-center items-center h-screen">
                    <h1>Please sign in to chat</h1>
                </div>
            )}
        </>
    );
};

export default ChatPage;
