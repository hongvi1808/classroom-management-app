import Container, { Service } from "typedi";
import { FirestoreService } from "../firebase/firestore.service";
import { InstructorService } from "../instructor/service";
import { USER_COLLECTION_NAME } from "../firebase/schema";
import { formatPhoneNumber } from "../../utils/function";
import { ROLE_INSTRCTOR } from "../../utils/constant";

@Service()
export class StudentService {
    private firestoreService: FirestoreService;
    private instructorService: InstructorService;
    constructor() {
        this.firestoreService = Container.get(FirestoreService)
        this.instructorService = Container.get(InstructorService)
    }

    public async getMyLessons(phone: string) {
        const studentDoc = await this.instructorService.getStudentById(phone);
        return studentDoc.lessons;
    }
    public async getProfile(phone: string) {
        const studentDoc = await this.instructorService.getStudentById(phone);
        return { id: studentDoc.id, name: studentDoc.name, phoneNumber: studentDoc.phoneNumber, email: studentDoc.email, active: studentDoc.active, createdAt: studentDoc.createdAt };
    }

    public async markLessonDone(phone: string, lessonId: string) {
        const studentDoc = await this.instructorService.getStudentById(phone);

        const lessons = studentDoc.lessons || [];
        const lesson = lessons.find((lesson: any) => lesson.id === lessonId);
        if (!lesson) {
            throw { message: 'Lesson not found', code: 'LESSON_NOT_FOUND' };
        }
        lesson.status = 'done';
        lesson.completedAt = new Date().getTime();
        return await this.firestoreService.update(USER_COLLECTION_NAME, studentDoc.id, {
            updatedAt: new Date().getTime(),
            lessons
        });
    }
    public async editProfile(studentId: string, data: { name: string, email: string, phoneNumber: string }) {
        return await this.instructorService.editStudent(studentId, data)
    }
    public async getInstructor() {
        const students = await this.firestoreService.findAllBy(USER_COLLECTION_NAME, { filed: 'role', op: '==', value: ROLE_INSTRCTOR });
        return students.docs.map(doc => doc.data());
    }
}