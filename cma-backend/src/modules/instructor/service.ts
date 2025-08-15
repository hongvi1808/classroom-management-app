import { Service } from "typedi";
import { FirestoreService } from "../firebase/firestore.service";
import { v7 as uuidv7 } from 'uuid';
import { USER_COLLECTION_NAME, UserCollection } from "../firebase/schema";
import { MailService } from "../mail/mail.service";
import { ROLE_STUDENT } from "../../utils/constant";

@Service()
export class InstructorService {
    private firestoreService: FirestoreService;
    private mailService: MailService;
    constructor(firestoreService: FirestoreService, mailService: MailService) {
        this.firestoreService = firestoreService;
        this.mailService = mailService;
    }

    public async addStudent(data: { name: string, phoneNumber: string, email: string }) {
        const dataStudent: UserCollection = {
            id: uuidv7(),
            name: data.name,
            email: data.email,
            password: '', // Assuming password is not required here
            username: '', // Assuming username is not required here
            phoneNumber: data.phoneNumber,
            alive: true,
            lesson: [],
            role: ROLE_STUDENT,
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime()
        }
        const res = await this.firestoreService.create(USER_COLLECTION_NAME, dataStudent);
        const mailContent = `<p>Click <a href=${process.env.SECURE_ACCOUNT_PAGE_LINK}/${dataStudent.id} >tại đây</a> để xác thực tài khoản </p> `
        await this.mailService.sendMail( data.email,'Xác thực tài khoản',mailContent);
        return res
    }
    public async assignLesson(data: { studentPhone: string, title: string, description: string }) {
        const studentDoc = await this.getStudentByPhone(data.studentPhone);
        const assigned = (studentDoc?.lessons || [])
        assigned.push({
                id: uuidv7(),
                title: data.title,
                description: data.description,
                status: 'pending',
                deliveredAt: new Date().getTime(),
                completedAt: 0

            })

        return await this.firestoreService.update(USER_COLLECTION_NAME, studentDoc.id, {
            updatedAt: new Date().getTime(),
            lessons: assigned

        });
    }
    public async getStudents() {
        const students = await this.firestoreService.findAllBy(USER_COLLECTION_NAME, { filed: 'role', op: '==', value: ROLE_STUDENT });
        return students.docs.map(doc => doc.data());
    }

    public async getStudentByPhone(phone: string) {
        const studentDoc = await this.firestoreService.findOneBy(USER_COLLECTION_NAME, { filed: 'phoneNumber', op: '==', value: phone });
        if (!studentDoc) {
            throw { message: 'Student not found', code: 'STUDENT_NOT_FOUND' }
        }
        return studentDoc
    }

    public async editStudent(phone: string, data: { name?: string, email?: string }) {
        const studentDoc = await this.getStudentByPhone(phone);
        const updatedData: any = { updatedAt: new Date().getTime() };
        if (data.name) updatedData.name = data.name;
        if (data.email) updatedData.email = data.email;
        return await this.firestoreService.update(USER_COLLECTION_NAME, studentDoc.id, updatedData);
    }
    public async deleteStudent(phone: string) {
        const studentDoc = await this.getStudentByPhone(phone);
        return this.firestoreService.delete(USER_COLLECTION_NAME, studentDoc.id);
    }
}