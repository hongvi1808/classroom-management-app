import { Twilio } from "twilio";
import { Service } from "typedi";
import * as dotenv from "dotenv";
dotenv.config();
@Service()
export class TwilioService {
    private client: Twilio;

    constructor() {
        this.client = new Twilio(
            process.env.TWILIO_ACCOUNT_SID || '',
            process.env.TWILIO_AUTH_TOKEN || ''
        );
    }

    async sendSMS(to: string, body: string): Promise<void> {
        try {
            await this.client.messages.create({
                body,
                to,
                messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID || '',
            });
            console.log(`SMS sent to ${to}`);
        } catch (error) {
            console.error(`Failed to send SMS to ${to}:`, error);
        }
    }

}