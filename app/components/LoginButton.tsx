'use client'

import { useSession } from 'next-auth/client';

export default function LoginButton() {
    const { data: session } = useSession();
    return (
        <div>LoginButton</div>
    )
}