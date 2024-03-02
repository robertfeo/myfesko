import nodemailer from 'nodemailer';

export async function sendMail({ to, subject, body }: { to: string, subject: string, body: string }) {
    const { SMTP_EMAIL, SMTP_GMAIL_EMAIL, SMTP_GMAIL_PASSWORD, SMTP_USER, SMTP_PASS } = process.env
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: SMTP_GMAIL_EMAIL,
            pass: SMTP_GMAIL_PASSWORD
        }
    })
    /* var transport = nodemailer.createTransport({
        host: "live.smtp.mailtrap.io",
        port: 587,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS
        }
    }) */

    try {
        /* await transport.sendMail({
            from: SMTP_EMAIL,
            to,
            subject,
            html: body
        }) */
        const testTransport = await transport.verify()
        /* console.log("Test results of Email Transport: " + testTransport) */
    }
    catch (error) {
        console.error(error)
    }

    try {
        const sendResult = await transport.sendMail({
            from: SMTP_EMAIL,
            to,
            subject,
            html: body
        })
        console.log({ sendResult })
    } catch (e) {
        console.error(e)
    }
}