/**
 * Generate HTML template for contact message notification email to admin
 */
export function generateContactNotificationEmailHTML(
    name: string,
    email: string,
    subject: string,
    message: string
): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Contact Message Received - Game Platform</title>
    <style type="text/css">
        /* Client-specific resets */
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; }

        /* General Styling */
        body {
            font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #fcfcfc; /* k-white-50 */
            margin: 0;
            padding: 0;
            background-color: #1d1d32; /* k-violet-400 */
        }
        a {
            text-decoration: none;
        }
        /* Ensure images are responsive */
        img {
            max-width: 100%;
            height: auto;
            display: block;
        }
        /* Outlook specific fixes */
        .outlook-fix {
            width:100%;
            display:block;
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #1d1d32; font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #fcfcfc;">
    <!-- Outer Table for Centering and Max Width -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <!-- Main Container Table -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #2a2a47; border-radius: 12px; overflow: hidden;">
                    <tr>
                        <td>
                            <!-- Header Section -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                <tr>
                                    <td align="center" style="padding: 30px 20px; background: linear-gradient(135deg, #78cf39, #5cc511); color: white; border-top-left-radius: 12px; border-top-right-radius: 12px;">
                                        <h1 style="margin: 0; font-size: 28px; font-weight: 600; color: #ffffff;">&#128236; Thank You for Your Message!</h1>
                                        <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px; color: #ffffff;">Game Platform Support</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px;">
                            <!-- Content Section -->
                            <p style="margin: 0 0 20px 0; font-size: 16px; color: #f1f1f1;">Hi ${name},</p>
                            <p style="margin: 0 0 20px 0; font-size: 16px; color: #f1f1f1;">We've received your contact message and appreciate you reaching out. Our team will review your inquiry and get back to you as soon as possible.</p>

                            <!-- Message Card -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #4e4e66; border-left: 4px solid #78cf39; padding: 20px; margin-bottom: 20px; border-radius: 0 8px 8px 0;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <div style="margin-bottom: 15px;">
                                            <span style="font-weight: 600; color: #78cf39; display: block; margin-bottom: 5px; font-size: 14px;">Your Email:</span>
                                            <div style="color: #ececec; background-color: #838394; padding: 8px 12px; border-radius: 6px; border: 1px solid #a8a8b4; font-size: 15px;">${email}</div>
                                        </div>

                                        <div style="margin-bottom: 15px;">
                                            <span style="font-weight: 600; color: #78cf39; display: block; margin-bottom: 5px; font-size: 14px;">Subject:</span>
                                            <div style="color: #ececec; background-color: #838394; padding: 8px 12px; border-radius: 6px; border: 1px solid #a8a8b4; font-size: 15px;">${subject}</div>
                                        </div>

                                        <div style="margin-bottom: 15px;">
                                            <span style="font-weight: 600; color: #78cf39; display: block; margin-bottom: 5px; font-size: 14px;">Your Message:</span>
                                            <div style="color: #ececec; background-color: #838394; padding: 8px 12px; border-radius: 6px; border: 1px solid #a8a8b4; white-space: pre-wrap; line-height: 1.7; font-size: 15px;">${message}</div>
                                        </div>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin: 0 0 20px 0; font-size: 16px; color: #f1f1f1;">We aim to respond to all inquiries within 24-48 hours. Thank you for your patience!</p>
                            <p style="margin: 0; font-size: 16px; color: #f1f1f1;">Best regards,</p>
                            <p style="margin: 0; font-size: 16px; color: #f1f1f1;">The Game Platform Team</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <!-- Footer Section -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                <tr>
                                    <td align="center" style="background-color: #1a1a2b; padding: 20px; text-align: center; color: #a8a8b4; font-size: 13px; border-bottom-left-radius: 12px; border-bottom-right-radius: 12px;">
                                        <p style="margin: 0 0 5px 0;">This email was automatically generated by the Game Platform contact system.</p>
                                        <p style="margin: 0;">Message sent at: ${new Date().toLocaleString()}</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;
}

/**
 * Generate plain text template for contact message notification email
 */
export function generateContactNotificationEmailText(
    name: string,
    email: string,
    subject: string,
    message: string,
    messageId: string
): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Contact Message Received - Game Platform</title>
    <style type="text/css">
        /* Client-specific resets */
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; }

        /* General Styling */
        body {
            font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #fcfcfc; /* k-white-50 */
            margin: 0;
            padding: 0;
            background-color: #1d1d32; /* k-violet-400 */
        }
        a {
            text-decoration: none;
        }
        /* Ensure images are responsive */
        img {
            max-width: 100%;
            height: auto;
            display: block;
        }
        /* Outlook specific fixes */
        .outlook-fix {
            width:100%;
            display:block;
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #1d1d32; font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #fcfcfc;">
    <!-- Outer Table for Centering and Max Width -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <!-- Main Container Table -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #2a2a47; border-radius: 12px; overflow: hidden;">
                    <tr>
                        <td>
                            <!-- Header Section -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                <tr>
                                    <td align="center" style="padding: 30px 20px; background: linear-gradient(135deg, #78cf39, #5cc511); color: white; border-top-left-radius: 12px; border-top-right-radius: 12px;">
                                        <h1 style="margin: 0; font-size: 28px; font-weight: 600; color: #ffffff;">&#128236; Thank You for Your Message!</h1>
                                        <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px; color: #ffffff;">Game Platform Support</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px;">
                            <!-- Content Section -->
                            <p style="margin: 0 0 20px 0; font-size: 16px; color: #f1f1f1;">Hi ${name},</p>
                            <p style="margin: 0 0 20px 0; font-size: 16px; color: #f1f1f1;">We've received your contact message and appreciate you reaching out. Our team will review your inquiry and get back to you as soon as possible.</p>

                            <!-- Message Card -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #4e4e66; border-left: 4px solid #78cf39; padding: 20px; margin-bottom: 20px; border-radius: 0 8px 8px 0;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <div style="margin-bottom: 15px;">
                                            <span style="font-weight: 600; color: #78cf39; display: block; margin-bottom: 5px; font-size: 14px;">Your Email:</span>
                                            <div style="color: #ececec; background-color: #838394; padding: 8px 12px; border-radius: 6px; border: 1px solid #a8a8b4; font-size: 15px;">${email}</div>
                                        </div>

                                        <div style="margin-bottom: 15px;">
                                            <span style="font-weight: 600; color: #78cf39; display: block; margin-bottom: 5px; font-size: 14px;">Subject:</span>
                                            <div style="color: #ececec; background-color: #838394; padding: 8px 12px; border-radius: 6px; border: 1px solid #a8a8b4; font-size: 15px;">${subject}</div>
                                        </div>

                                        <div style="margin-bottom: 15px;">
                                            <span style="font-weight: 600; color: #78cf39; display: block; margin-bottom: 5px; font-size: 14px;">Your Message:</span>
                                            <div style="color: #ececec; background-color: #838394; padding: 8px 12px; border-radius: 6px; border: 1px solid #a8a8b4; white-space: pre-wrap; line-height: 1.7; font-size: 15px;">${message}</div>
                                        </div>

                                        <div>
                                            <span style="font-weight: 600; color: #78cf39; display: block; margin-bottom: 5px; font-size: 14px;">Reference ID:</span>
                                            <div style="color: #ececec; background-color: #838394; padding: 8px 12px; border-radius: 6px; border: 1px solid #a8a8b4; font-size: 15px;">${messageId}</div>
                                        </div>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin: 0 0 20px 0; font-size: 16px; color: #f1f1f1;">We aim to respond to all inquiries within 24-48 hours. Thank you for your patience!</p>
                            <p style="margin: 0; font-size: 16px; color: #f1f1f1;">Best regards,</p>
                            <p style="margin: 0; font-size: 16px; color: #f1f1f1;">The Game Platform Team</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <!-- Footer Section -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                <tr>
                                    <td align="center" style="background-color: #1a1a2b; padding: 20px; text-align: center; color: #a8a8b4; font-size: 13px; border-bottom-left-radius: 12px; border-bottom-right-radius: 12px;">
                                        <p style="margin: 0 0 5px 0;">This email was automatically generated by the Game Platform contact system.</p>
                                        <p style="margin: 0;">Message sent at: ${new Date().toLocaleString()}</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
}

/**
 * Generate HTML template for auto-reply confirmation email to user
 */
export function generateContactConfirmationEmailHTML(name: string): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Message Received - Game Platform</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8fafc;
        }
        .container {
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #10b981, #3b82f6);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }
        .content {
            padding: 30px;
        }
        .highlight-box {
            background-color: #f0f9ff;
            border: 1px solid #0ea5e9;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            text-align: center;
        }
        .footer {
            background-color: #f9fafb;
            padding: 20px;
            text-align: center;
            color: #6b7280;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✅ Message Received!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Thank you for contacting us</p>
        </div>
        
        <div class="content">
            <p>Hi ${name},</p>
            
            <p>Thank you for reaching out to Game Platform! We've successfully received your message and appreciate you taking the time to contact us.</p>
            
            <div class="highlight-box">
                <h3 style="margin-top: 0; color: #0ea5e9;">What happens next?</h3>
                <p style="margin-bottom: 0;">Our support team will review your message and respond within 24-48 hours. We'll get back to you at the email address you provided.</p>
            </div>
            
            <p>In the meantime, feel free to:</p>
            <ul>
                <li>Browse our game collection</li>
                <li>Check out our help center for quick answers</li>
                <li>Follow us on social media for updates</li>
            </ul>
            
            <p>We appreciate your interest in Game Platform and look forward to helping you!</p>
            
            <p>Best regards,<br>
            The Game Platform Team</p>
        </div>
        
        <div class="footer">
            <p>This is an automated confirmation email. Please do not reply to this message.</p>
            <p>If you need immediate assistance, please visit our help center.</p>
        </div>
    </div>
</body>
</html>`;
}