import { Router } from "express";
import 'reflect-metadata';
import Container from "typedi";
import { InstructorService } from "./service";
import { errorResponse, successResponse } from "../../utils/response";

const router = Router();
const service = Container.get(InstructorService);

router.post('/add-student', (req, res) => {
    const { name, phoneNumber, email } = req.body;
    try {
        const result = service.addStudent({ name, phoneNumber, email });
        successResponse(res, result )
    } catch (error) {
        errorResponse(res, error)
    }
});

router.post('/assign-lesson', (req, res) => {
    const { studentPhone, title, description } = req.body;
    try {
        const result = service.assignLesson({ studentPhone, title, description });
        successResponse(res, result )
    } catch (error) {
        errorResponse(res, error)
    }
});

router.get('/students', (req, res) => {
    try {
        const result = service.getStudents
        successResponse(res, result )
    } catch (error) {
        errorResponse(res, error)
    }
});

router.get('/student:phone', (req, res) => {
    const { phone } = req.params;
    try {
        const result = service.getStudentByPhone(phone);
        successResponse(res, result )
    } catch (error) {
        errorResponse(res, error)
    }
});

router.put('/edit-student:phone', (req, res) => {
    const {  phone, } = req.params;
    try {
        const result = service.editStudent(phone, req.body);
        successResponse(res, result )
    } catch (error) {
        errorResponse(res, error)
    }
});

router.delete('/student:phone', (req, res) => {
    const { phone } = req.params;
    try {
        const result = service.deleteStudent(phone);
        successResponse(res, result )
    } catch (error) {
        errorResponse(res, error)
    }
});

export const instructorRouter =  router;