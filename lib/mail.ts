import nodemailer from 'nodemailer';
import { activationTemplate } from './emailTemplates/activation';
import { googleSignedInPassword } from './emailTemplates/googleSignedInPassword';
import { resetTemplate } from './emailTemplates/resetPass';

var handlebars = require('handlebars');

export async function sendMail({ to, subject, body }: { to: string, subject: string, body: string }) {
    const { SMTP_EMAIL, SMTP_GMAIL_EMAIL, SMTP_GMAIL_PASSWORD, SMTP_USER, SMTP_PASS } = process.env
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: SMTP_GMAIL_EMAIL,
            pass: SMTP_GMAIL_PASSWORD
        }
    })

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
    const template = handlebars.compile(activationTemplate)
    const htmlBody = template({ name, url })
    return htmlBody
}

export function compileResetTemplate(name: string, url: string) {
    const template = handlebars.compile(resetTemplate)
    const htmlBody = template({ name, url })
    return htmlBody
}

export function compileSignedWithGooglePassword(generated_password: string) {
    const template = handlebars.compile(googleSignedInPassword)
    const htmlBody = template({ generated_password })
    return htmlBody
}