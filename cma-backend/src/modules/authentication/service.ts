import "reflect-metadata";
import Container, { Service } from "typedi";
import { FirestoreService } from "../firebase/firestore.service";
import { TwilioService } from "../twilio/twilio.service"
import { v7 as uuidv7 } from 'uuid';;
import { formatPhoneNumber, gen6DigitCode } from "../../utils/function";
import { generateAccessToken } from "../../utils/jwt";
import { ROLE_INSTRCTOR } from "../../utils/constant";
import { MailService } from "../mail/mail.service";
import * as bcrypt from 'bcrypt';
import { USER_COLLECTION_NAME } from "../firebase/schema";

@Service()
export class AuthenticationService {
    private firestoreService: FirestoreService;
    private twilioService: TwilioService;
    private mailService: MailService;
    constructor( ) {
        this.firestoreService = Container.get(FirestoreService);
        this.twilioService = Container.get(TwilioService);
        this.mailService = Container.get(MailService);
    }

    public async createAccessCode(phoneNumber: string) {
        const codeDigit = gen6DigitCode();
        const phone = formatPhoneNumber(phoneNumber);
        // find user by phone number
        const userDoc = await this.firestoreService.findOneBy(USER_COLLECTION_NAME, { filed: 'phoneNumber', op: '==', value: phone });
        if (!userDoc) {
            const id = uuidv7();
            await this.firestoreService.create(USER_COLLECTION_NAME, {
                phoneNumber: phone,
                id,
                role: ROLE_INSTRCTOR,
                accessCode: codeDigit,
                createdAt: new Date().getTime(),
                updatedAt: new Date().getTime()
            });
            // await this.firestoreService.update(USER_COLLECTION_NAME, id, {
            //     accessCode: codeDigit,
            // })
        }
        else await this.firestoreService.update(USER_COLLECTION_NAME, userDoc.id, {
            accessCode: codeDigit,
        })
        // send code to twilio
        await this.twilioService.sendSMS(phoneNumber, `Your access code is: ${codeDigit}`);
        return { phoneNumber: phone };
    }

    public async validateAccessCode(phoneNumber: string, accessCode: string) {
        const userDoc = await this.firestoreService.findOneBy(USER_COLLECTION_NAME, { filed: 'phoneNumber', op: '==', value: phoneNumber });
        if (accessCode === userDoc?.accessCode) {
            await this.firestoreService.update(USER_COLLECTION_NAME, userDoc.id, { accessCode: '', updatedAt: new Date().getTime() });
            const token = await generateAccessToken({ userId: userDoc.id, role: userDoc.role });
            return token;
        } else {
            throw { message: 'Invalid access code', code: 'INVALID_ACCESS_CODE' };
        }
    }

    public async loginWithEmail(email: string) {
        const codeDigit = gen6DigitCode();
        const userDoc = await this.firestoreService.findOneBy(USER_COLLECTION_NAME, { filed: 'email', op: '==', value: email });
        if (!userDoc.isVerified)
            throw { message: 'User is not verified email', code: 'USER_NOT_VERIFIED_EMAIL' };
        await this.firestoreService.update(USER_COLLECTION_NAME, userDoc.id, {
            accessCode: codeDigit,
        })
        await this.mailService.sendMail(email, 'Your access code', `Your access code is: ${codeDigit}`);
        return { email };
    }

    public async validateEmail(email: string, accessCode: string) {
        const userDoc = await this.firestoreService.findOneBy(USER_COLLECTION_NAME, { filed: 'email', op: '==', value: email });
        if (userDoc && userDoc.accessCode === accessCode) {
            await this.firestoreService.update(USER_COLLECTION_NAME, userDoc.id, { accessCode: '', updatedAt: new Date().getTime() });
            const token = await generateAccessToken({ userId: userDoc.id, role: userDoc.role });
            return token;
        } else {
            throw { message: 'Invalid email or access code', code: 'INVALID_EMAIL_ACCESS_CODE' };
        }
    }

    public async setupAccount(id: string, body: {username: string, password: string}) {
        const userDoc = await this.firestoreService.findById(USER_COLLECTION_NAME, id);
        const hashedPassword = await bcrypt.hash(body.password, 10)
        if (!userDoc.exists()) {
            throw { message: 'Verify failed', code: 'FAILED_VERIFY' };
        }
        await this.firestoreService.update(USER_COLLECTION_NAME, id, { 
            isVerified: true,
            username: body.username,
            password: hashedPassword, 
            updatedAt: new Date().getTime() });
        return true;
    }
    public async login(username: string, password: string) {
        const userDoc = await this.firestoreService.findOneBy(USER_COLLECTION_NAME, { filed: 'username', op: '==', value: username });
        if (!userDoc.exists()) {
            throw { message: 'Username is not existed', code: 'USERNAME_NOTE_EXISTED' };
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        if (userDoc.password !== hashedPassword) {
            throw { message: 'Password is not correct', code: 'PASSWORD_NOT_CORRECT'};
        }

        const token = await generateAccessToken({ userId: userDoc.id, role: userDoc.role });
        return token;
    }

}
