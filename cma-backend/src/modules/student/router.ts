import { Router } from "express";
import { StudentService } from "./service";
import 'reflect-metadata';
import Container from "typedi";
import { errorResponse, successResponse } from "../../utils/response";

const router = Router();
const service = Container.get(StudentService);

router.get('/my-lessons', (req, res) => {
    const { phone } = req.query;
    try {
        const result = service.getMyLessons(phone as string);
        successResponse(res, result )
    } catch (error) {
        errorResponse(res, error)
    }
});
router.post('/mark-lesson-done', (req, res) => {
    const { phone, lessonId } = req.body;
    try {
        const result = service.markLessonDone(phone, lessonId);
        successResponse(res, result )
    } catch (error) {
        errorResponse(res, error)
    }
});
router.put('/edit-profile', (req, res) => {
    const { phone, name, email } = req.body;
    const { userId} = req.cookies.userId;
    try {
        const result = service.editProfile(userId, { name, email, phone });
        successResponse(res, result )
    } catch (error) {
        errorResponse(res, error)
    }
});



export const studentRouter =  router;