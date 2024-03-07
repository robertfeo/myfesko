/* eslint-disable react/jsx-no-undef */
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const ChatPage = async () => {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    return (
        <div className="flex flex-col items-center">
            <h1>Chat</h1>
            <p>Welcome, {user?.firstname}!</p>
        </div>
    );
};

export default ChatPage;
