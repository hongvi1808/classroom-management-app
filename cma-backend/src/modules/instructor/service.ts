import 'reflect-metadata';
import Container, { Service } from "typedi";
import { FirestoreService } from "../firebase/firestore.service";
import { v7 as uuidv7 } from 'uuid';
import { USER_COLLECTION_NAME, UserCollection } from "../firebase/schema";
import { MailService } from "../mail/mail.service";
import { ROLE_STUDENT } from "../../utils/constant";
import { formatPhoneNumber } from '../../utils/function';

@Service()
export class InstructorService {
    private firestoreService: FirestoreService;
    private mailService: MailService;
    constructor() {
        this.firestoreService = Container.get(FirestoreService);
        this.mailService = Container.get(MailService);
    }

    public async addStudent(data: { name: string, phoneNumber: string, email: string }) {
        const phone = formatPhoneNumber(data.phoneNumber);
        const userDoc = await this.firestoreService.findOneBy(USER_COLLECTION_NAME, { filed: 'id', op: '==', value: phone });
        if (userDoc) throw { code: 'PHONE_NUMBER_EXISTED', message: 'Phone number is existed' }
        const dataStudent: UserCollection = {
            id: formatPhoneNumber(data.phoneNumber),
            name: data.name,
            email: data.email,
            password: '', // Assuming password is not required here
            username: '', // Assuming username is not required here
            phoneNumber: formatPhoneNumber(data.phoneNumber),
            active: false, alive: true,
            lessons: [],
            role: ROLE_STUDENT,
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime()
        }
        const res = await this.firestoreService.create(USER_COLLECTION_NAME, dataStudent);
        const mailContent = `<p>Click <a href=${process.env.SECURE_ACCOUNT_PAGE_LINK}/${dataStudent.id} >tại đây</a> để xác thực tài khoản </p> `
        await this.mailService.sendMail(data.email, 'Xác thực tài khoản', mailContent);
        return res
    }
    public async assignLesson(data: { studentPhones: string[], title: string, description: string }) {
        const datas = data.studentPhones.map(async (i: string) => {
            const found = await this.firestoreService.findById(USER_COLLECTION_NAME, i)
            if (!found.exists()) return null;
            const lessonFound = found.data().lessons || []
            lessonFound.push({
                id: uuidv7(),
                title: data.title,
                description: data.description,
                status: 'pending',
                deliveredAt: new Date().getTime(),
                completedAt: 0

            })
            return ({
                id: i,
                data: {
                    updatedAt: new Date().getTime(),
                    lessons: lessonFound
                }
            })

        })
        const resultData = await Promise.all(datas);

        await this.firestoreService.updateMany(USER_COLLECTION_NAME, resultData.filter((r) => r !== null))
        return true;
    }
    public async getStudents() {
        const students = await this.firestoreService.findAllBy(USER_COLLECTION_NAME, { filed: 'role', op: '==', value: ROLE_STUDENT });
        return students.docs.map(doc => doc.data());
    }

    public async getStudentById(phone: string) {
        const studentDoc = await this.firestoreService.findOneBy(USER_COLLECTION_NAME, { filed: 'id', op: '==', value: phone });
        if (!studentDoc) {
            throw { message: 'Student not found', code: 'STUDENT_NOT_FOUND' }
        }
        return studentDoc
    }
    public async getStudentByPhone(phone: string) {
        const studentDoc = await this.firestoreService.findOneBy(USER_COLLECTION_NAME, { filed: 'phoneNumber', op: '==', value: formatPhoneNumber(phone) });
        if (!studentDoc) {
            throw { message: 'Student not found', code: 'STUDENT_NOT_FOUND' }
        }
        return studentDoc
    }

    public async editStudent(phone: string, data: { name?: string, email?: string, phoneNumber ?: string }) {
        const phoneFormated = formatPhoneNumber(data?.phoneNumber || '')
        const studentDoc = await this.getStudentById(phone);
        const updatedData: any = { updatedAt: new Date().getTime() };
        if (data.name !== studentDoc.name) updatedData.name = data.name;
        if (phoneFormated  !== studentDoc.phoneNumber) updatedData.phoneNumber = phoneFormated;
        if (data.email !== studentDoc.email) {
            updatedData.email = data.email;
            updatedData.active = false;
            const mailContent = `<p>Click <a href=${process.env.SECURE_ACCOUNT_PAGE_LINK}/${studentDoc.id} >tại đây</a> để xác thực tài khoản </p> `
            await this.mailService.sendMail(updatedData.email, 'Xác thực tài khoản', mailContent);
        }
        return await this.firestoreService.update(USER_COLLECTION_NAME, studentDoc.id, updatedData);
    }
    public async deleteStudent(phone: string) {
        const studentDoc: UserCollection = await this.getStudentById(phone);
        const updatedData: any = { updatedAt: new Date().getTime(), alive: false };
        return await this.firestoreService.update(USER_COLLECTION_NAME, studentDoc.id, updatedData);
    }
}