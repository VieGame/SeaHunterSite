import { generateContactConfirmationEmailHTML, generateContactNotificationEmailHTML, generateContactNotificationEmailText } from '@/lib/email-template';
import fs from 'fs/promises';
import nodemailer from 'nodemailer';
import path from 'path';

// Configure your Gmail transport
// It's recommended to use environment variables for sensitive information
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

interface EmailOptions {
    to: string;
    subject: string;
    text?: string;
    html?: string;
    htmlFilePath?: string;
}

export async function sendEmail({
    to,
    subject,
    text,
    html,
    htmlFilePath,
}: EmailOptions) {
    try {
        let emailHtml = html;

        if (htmlFilePath) {
            const filePath = path.resolve(htmlFilePath);
            emailHtml = await fs.readFile(filePath, 'utf-8');
        }

        const mailOptions = {
            from: process.env.GMAIL_USER, // Sender address
            to, // Recipient address
            subject, // Subject line
            text, // Plain text body
            html: emailHtml, // HTML body
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; // Re-throw the error for further handling if needed
    }
}

/**
 * Send contact notification email to admin
 * @param contactData - Contact form data
 * @param messageId - The ID of the saved contact message
 * @returns Email send result
 */
export async function sendContactNotificationEmail(
    contactData: { name: string; email: string; subject: string; message: string },
    messageId: string
) {
    try {

        const subject = `New Contact Message: ${contactData.subject}`;
        const html = generateContactNotificationEmailHTML(
            contactData.name,
            contactData.email,
            contactData.subject,
            contactData.message
        );
        const text = generateContactNotificationEmailText(
            contactData.name,
            contactData.email,
            contactData.subject,
            contactData.message,
            messageId
        );

        // Send to admin email (can be configured via environment variable)
        const adminEmail = process.env.ADMIN_EMAIL || process.env.GMAIL_USER;
        if (!adminEmail) {
            throw new Error('Admin email not configured');
        }

        return await sendEmail({
            to: adminEmail,
            subject,
            html,
            text
        });
    } catch (error) {
        console.error('Failed to send contact notification email:', error);
        throw error;
    }
}

/**
 * Send confirmation email to user who submitted contact form
 * @param to - User's email address
 * @param name - User's name
 * @returns Email send result
 */
export async function sendContactConfirmationEmail(to: string, name: string) {
    try {

        const subject = 'Message Received - Game Platform';
        const html = generateContactConfirmationEmailHTML(name);

        return await sendEmail({
            to,
            subject,
            html,
        });
    } catch (error) {
        console.error('Failed to send contact confirmation email:', error);
        throw error;
    }
}
