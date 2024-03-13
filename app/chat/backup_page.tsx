/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-undef */
"use client";

import { Image } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? 'Your production URL' : 'http://localhost:3001';
const socket = io(URL);

type Message = {
    sender: {
        id: string;
        firstname: string;
        lastname: string;
        image: string | null;
    };
    text: string;
};

const ChatPage: React.FC = () => {
    const { data: session } = useSession();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        if (session?.user) {
            socket.connect();

            socket.on("connect", () => {
                const user = {
                    id: session.user.id,
                    firstname: session.user.firstname,
                    lastname: session.user.lastname,
                    image: session.user.image, // Make sure this is the image URL
                    email: session.user.email,
                    timestamp: new Date().toISOString(),
                };
                socket.emit("join", user);
            });

            socket.on("message", (data: Message) => {
                setMessages((prevMessages) => [...prevMessages, data]);
            });

            return () => {
                socket.off("connect");
                socket.off("message");
                socket.disconnect();
            };
        }
    }, [session]);

    const sendSocketEvent = () => {
        if (message.trim()) {
            const msg: Message = {
                sender: {
                    id: session!.user.id,
                    firstname: session!.user.firstname,
                    lastname: session!.user.lastname,
                    image: session!.user.image,
                },
                text: message,
            };
            socket.emit("message", msg);
            setMessage('');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const handleSendOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        sendSocketEvent();
    };

    return (
        <>
            {session?.user ? (
                
                <div className="flex flex-col items-center px-4 py-8">
                <h1 className="text-2xl font-semibold">Chat</h1>
                <p className="text-sm text-gray-600 mt-1">Welcome, {session?.user.firstname || 'User'}!</p>
                <div className="mt-4 w-full max-w-md bg-white rounded-lg shadow border p-4 space-y-4">
                    <div className="overflow-y-auto h-64">
                        {messages.map((msg, index) => (
                            <div key={index} className={`chat ${msg.sender.id === session?.user.id ? 'chat-end' : 'chat-start'}`}>
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <Image src={msg.sender.image || 'https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'} alt="Profile" width={40} height={40} className="rounded-full" />
                                    </div>
                                </div>
                                <div className="chat-header">
                                    {msg.sender.firstname} {msg.sender.lastname}
                                    <time className="text-xs opacity-50">Time</time>
                                </div>
                                <div className="chat-bubble">{msg.text}</div>
                                <div className="chat-footer opacity-50">
                                    Delivered
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex">
                        <input
                            type="text"
                            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full"
                            value={message}
                            onChange={handleInputChange}
                            placeholder="Type a message..."
                        />
                        <button
                            className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleSendOnClick}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
            ) : (
                <div className="flex justify-center items-center h-screen">
                    <h1>Please sign in to chat</h1>
                </div>
            )}
        </>
    );
};

export default ChatPage;
