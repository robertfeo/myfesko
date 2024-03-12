import { Account, User } from "@prisma/client";
import type { Server as HTTPServer } from 'http';
import type { Socket as NetSocket } from 'net';
import type { NextApiResponse } from 'next';
import type { Server as IOServer } from 'socket.io';

declare module "next-auth" {
    interface Session {
        user: User;
        account: Account;
        session: Session;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        user: User;
        account: Account;
        session: Session;
    }
}

declare module "socket.io" {
    interface ServerToClientEvents {
        noArg: () => void;
        basicEmit: (a: number, b: string, c: Buffer) => void;
        withAck: (d: string, callback: (e: number) => void) => void;
    }

    interface ClientToServerEvents {
        hello: () => void;
    }

    interface InterServerEvents {
        ping: () => void;
    }

    interface SocketData {
        user: User;
    }

    interface SocketServer extends HTTPServer {
        io?: IOServer | undefined
    }

    interface SocketWithIO extends NetSocket {
        server: SocketServer
    }

    interface NextApiResponseWithSocket extends NextApiResponse {
        socket: SocketWithIO
    }
}