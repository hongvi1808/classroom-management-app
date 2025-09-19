// import * as sgMail from '@sendgrid/mail';
import { Service } from 'typedi';
import * as dotenv from "dotenv";
const sgMail = require('@sendgrid/mail');

dotenv.config();
@Service()
export class SendGridMailService {

  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
  }

  async sendMail(to: string, subject: string, html: string) {
    if (!process.env.SENDGRID_API_KEY) {
      console.warn('No SENDGRID_API_KEY configured.');
      return false;
    }

    const msg = {
      to,
      from: process.env.MAIL_FROM || 'no-reply@example.com',
      subject,
      html,
    };

    try {
      await sgMail.send(msg);
      console.log(`Email sent to ${to}`);
      return true;
    } catch (err) {
      console.error('SendGrid error', JSON.stringify(err, null, 2));
    }
  }
}
