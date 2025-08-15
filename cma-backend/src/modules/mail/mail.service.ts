import { Service } from "typedi";
import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();
@Service()
export class MailService {
    private transport: any
    constructor() {
        this.transport = nodemailer.createTransport({
            host: process.env.SMTP_HOST,    
            port: parseInt(process.env.SMTP_PORT || '456'),
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.STMP_PASSWORD,
            },
        });
    }
    public async sendMail(to: string, subject: string, text: string) {
        try {
            const mailOptions = {
                from: 'no-reply@cma.com',
                to,
                subject,
                text,
                html: text,
            };
            await this.transport.sendMail(mailOptions);
            console.log(`Email sent to ${to}`);
        } catch (error) {
            console.error(`Failed to send email to ${to}:`, error);
        }
    }
}