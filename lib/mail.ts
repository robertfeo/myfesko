import nodemailer from 'nodemailer';
import { activationTemplate } from './emailTemplates/activation';

export async function sendMail({ to, subject, body }: { to: string, subject: string, body: string }) {
    const { SMTP_EMAIL, SMTP_GMAIL_EMAIL, SMTP_GMAIL_PASSWORD, SMTP_USER, SMTP_PASS } = process.env
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: SMTP_GMAIL_EMAIL,
            pass: SMTP_GMAIL_PASSWORD
        }
    })

    // -------- For Mailtrap --------
    /* var transport = nodemailer.createTransport({
        host: "live.smtp.mailtrap.io",
        port: 587,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS
        }
    }) */

    // -------- For Testing --------
    /* try {
        await transport.sendMail({
            from: SMTP_EMAIL,
            to,
            subject,
            html: body
        })
        const testTransport = await transport.verify()
        console.log("Test results of Email Transport: " + testTransport)
    }
    catch (error) {
        console.error(error)
    } */

    try {
        const sendResult = await transport.sendMail({
            from: SMTP_GMAIL_EMAIL,
            to,
            subject,
            html: body
        })
        console.log({ sendResult })
    } catch (e) {
        console.error(e)
    }
}

export function compileActivationTemplate(name: string, url: string) {
    const handlebar = require('handlebars')
    const template = handlebar.compile(activationTemplate)
    const htmlBody = template({ name, url })
    return htmlBody
}