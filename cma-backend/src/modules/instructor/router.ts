import { Router } from "express";
import 'reflect-metadata';
import Container from "typedi";
import { InstructorService } from "./service";
import { errorResponse, successResponse } from "../../utils/response";

const router = Router();
const service = Container.get(InstructorService);

router.post('/add-student', async (req, res) => {
    const { name, phoneNumber, email, role } = req.body;
    try {
        const result = await service.addStudent({ name, phoneNumber, email, role });
        successResponse(res, result )
    } catch (error) {
        errorResponse(res, error)
    }
});

router.post('/assign-lesson', async (req, res) => {
    const { phoneNumber, title, description } = req.body;
    try {
        const result = await service.assignLesson({ phoneNumber, title, description });
        successResponse(res, result )
    } catch (error) {
        errorResponse(res, error)
    }
});

router.get('/students', async (req, res) => {
    try {
        const result = await service.getStudents()
        successResponse(res, result )
    } catch (error) {
        errorResponse(res, error)
    }
});

router.get('/student/:phone', async  (req, res) => {
    const { phone } = req.params;
    try {
        const result = await service.getStudentByPhone(phone);
        successResponse(res, result )
    } catch (error) {
        errorResponse(res, error)
    }
});

router.put('/edit-student:phone', async (req, res) => {
    const {  phone, } = req.params;
    try {
        const result = await service.editStudent(phone, req.body);
        successResponse(res, result )
    } catch (error) {
        errorResponse(res, error)
    }
});

router.delete('/student/:phone', async (req, res) => {
    const { phone } = req.params;
    try {
        const result = await service.deleteStudent(phone);
        successResponse(res, result )
    } catch (error) {
        errorResponse(res, error)
    }
});

export const instructorRouter =  router;