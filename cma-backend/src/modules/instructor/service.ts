import { Service } from "typedi";
import { FiretoreService } from "../firebase/firestore.service";
import { v7 as uuidv7 } from 'uuid';

@Service()
export class InstructorService {
    private firestoreService: FiretoreService;
    constructor(firestoreService: FiretoreService) {
        this.firestoreService = firestoreService;
    }

    public async addStudent(data: { name: string, phoneNumber: string, email: string }) {
        const res = await this.firestoreService.create('student', {
            name: data.name,
            id: uuidv7(),
            phoneNumber: data.phoneNumber,
            email: data.email,
            lessions: [],
            alive: true,
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime()
        });
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

        return await this.firestoreService.update('student', studentDoc.id, {
            updatedAt: new Date().getTime(),
            lessons: assigned

        });
    }
    public async getStudents() {
        const students = await this.firestoreService.findAll('student');
        return students.docs.map(doc => doc.data());
    }

    public async getStudentByPhone(phone: string) {
        const studentDoc = await this.firestoreService.findOneBy('student', { filed: 'phoneNumber', op: '==', value: phone });
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
        return await this.firestoreService.update('student', studentDoc.id, updatedData);
    }
    public async deleteStudent(phone: string) {
        const studentDoc = await this.getStudentByPhone(phone);
        return this.firestoreService.delete('student', studentDoc.id);
    }
}