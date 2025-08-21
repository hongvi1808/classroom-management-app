import { Router } from "express";
import { StudentService } from "./service";
import 'reflect-metadata';
import Container from "typedi";
import { errorResponse, successResponse } from "../../utils/response";

const router = Router();
const service = Container.get(StudentService);

router.get('/my-lessons', async (req, res) => {
    const { phone } = req.query;
    try {
        const result = await service.getMyLessons(phone as string);
        successResponse(res, result )
    } catch (error) {
        errorResponse(res, error)
    }
});
router.get('/profile', async (req, res) => {
    const { phone } = req.query;
    try {
        const result = await service.getProfile(phone as string);
        successResponse(res, result )
    } catch (error) {
        errorResponse(res, error)
    }
});
router.post('/mark-lesson-done', async (req, res) => {
    const { phone, lessonId } = req.body;
    try {
        const result = await service.markLessonDone(phone, lessonId);
        successResponse(res, result )
    } catch (error) {
        errorResponse(res, error)
    }
});
router.put('/edit-profile/:id', async (req, res) => {
    const { phoneNumber, name, email } = req.body;
    const { id} = req.params;
    try {
        const result = await service.editProfile(id, { name, email, phoneNumber });
        successResponse(res, result )
    } catch (error) {
        errorResponse(res, error)
    }
});
router.get('/instructor', async (req, res) => {
    try {
        const result = await service.getInstructor();
        successResponse(res, result )
    } catch (error) {
        errorResponse(res, error)
    }
});

router.post('/message/push', async (req, res) => {
    const { text, senderId, receiverId } = req.body;
    try {
        const result = await service.pushMessage({ text, senderId, receiverId });
        successResponse(res, result )
    } catch (error) {
        errorResponse(res, error)
    }
});

router.get('/message/history', async (req, res) => {
    try {
        const { userIds } = req.query
        const users = userIds?.toString()?.split(',')
        const result = await service.getMessageHistory(users as string[])
        successResponse(res, result )
    } catch (error) {
        errorResponse(res, error)
    }
});



export const studentRouter =  router;