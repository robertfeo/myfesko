/* eslint-disable react/jsx-no-undef */
import { Image } from "@nextui-org/react";
import { User } from "@prisma/client";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ChatProps {
    className?: string;
    user: User;
    session: Session;
    websocket: WebSocket;
}

type Message = {
    sender: {
        id: string;
        firstname: string;
        lastname: string;
        image: string | null;
    };
    text: string;
    timestamp: string;
};

const Chat = ({ className, user, websocket, session }: ChatProps) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const handleSendOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (message.trim() !== '') {
            const msgData = {
                sender: {
                    id: session.user.id,
                    firstname: session.user.firstname || '', // Assuming the firstname is the first part of the name
                    lastname: session.user.lastname || '', // Assuming the lastname is the second part of the name, if present
                    image: session.user.image,
                },
                text: message,
                timestamp: new Date().toISOString(),
            };
            // Sending the message object as a JSON string
            if (websocket) {
                websocket.send(JSON.stringify(msgData));
            } else {
                toast.error('WebSocket connection is not established');
            }
            setMessage(''); // Clear the input field after sending
        }
    };

    useEffect(() => {
        const receiveMessage = (event: MessageEvent) => {
            const incomingMessage = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, incomingMessage]);
        };

        if (websocket) {
            websocket.addEventListener('message', receiveMessage);
        }

        return () => {
            if (websocket) {
                websocket.removeEventListener('message', receiveMessage);
            }
        };
    }, [websocket]); // Depend on the WebSocket connection

    return (
        <div className="">
            {messages.map((msg, index) => (
                <div key={index} className={`chat ${msg.sender.id === session!.user!.id ? 'chat-end' : 'chat-start'}`}>
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <Image src={msg.sender?.image || 'https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'} alt="Profile" width={40} height={40} className="rounded-full" />
                        </div>
                    </div>
                    <div className="chat-header">
                        {msg.sender.firstname} {msg.sender.lastname}
                        <time className="text-xs opacity-50">{msg.timestamp}</time>
                    </div>
                    <div className="chat-bubble">{msg.text}</div>
                    <div className="chat-footer opacity-50">
                        Delivered
                    </div>
                </div>
            ))}

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
    );
};

export default Chat;