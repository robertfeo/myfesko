import type { TurnstileServerValidationResponse } from '@marsidev/react-turnstile'

const verifyEndpoint = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
const secret = process.env.CLOUDFLARE_TURNSTILE_SECRET!

export async function POST(request: Request) {
    const { token } = (await request.json()) as { token: string }

    console.log('Verifying Turnstile token')

    const res = await fetch(verifyEndpoint, {
        method: 'POST',
        body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    })

    const data = (await res.json()) as TurnstileServerValidationResponse

    console.log(data.success ? 'Turnstile verification successful' : 'Turnstile verification failed')

    return new Response(JSON.stringify(data), {
        status: data.success ? 200 : 400,
        headers: {
            'content-type': 'application/json'
        }
    })
}
