import { Service } from "typedi";
import { FiretoreService } from "../firebase/firestore.service";
import { InstructorService } from "../instructor/service";

@Service()
export class StudentService {
    private firestoreService: FiretoreService;
    private instructorService: InstructorService;
    constructor(firestoreService: FiretoreService, instructorService: InstructorService) {
        this.firestoreService = firestoreService;
        this.instructorService = instructorService;
    }

    public async getMyLessons(phone: string) {
        const studentDoc = await this.instructorService.getStudentByPhone(phone);
        return studentDoc.lessons || [];
    }

    public async markLessonDone(phone: string, lessonId: string) {
        const studentDoc = await this.instructorService.getStudentByPhone(phone);

        const lessons = studentDoc.lessons || [];
        const lesson = lessons.find((lesson: any) => lesson.id === lessonId);
        if (!lesson) {
            throw { message: 'Lesson not found', code: 'LESSON_NOT_FOUND' };
        }
        lesson.status = 'done';
        lesson.completedAt = new Date().getTime();
        return await this.firestoreService.update('user', studentDoc.id, {
            updatedAt: new Date().getTime(),
            lessons
        });
    }
    public async editProfile(studentId: string, data: { name: string, email: string, phone: string }) {
        return await this.firestoreService.update('user', studentId, data);
    }
}