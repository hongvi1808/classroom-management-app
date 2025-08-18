import apiBase from "../axios/api-base";

const urlDefault = '/instructor';

export const instructorApis = {
    addStudent: (data: any) => {
        return apiBase.post(`${urlDefault}/add-student`, data, { hasAuth: true });
    },
    getStudents: () => {
        return apiBase.get(`${urlDefault}/students`, { hasAuth: true });
    },
    getStudentByPhone: (phone: string) => {
        return apiBase.get(`${urlDefault}/student/${phone}`, { hasAuth: true });
    },
    updateStudent: (data: any) => {
        return apiBase.put(`${urlDefault}/edit-student/${data.id}`, data, { hasAuth: true });
    },
    deleteStudent: (phoneNumber: any) => {
        return apiBase.delete(`${urlDefault}/student/${phoneNumber}`, { hasAuth: true });
    },
    assignLesson: (data: any) => {
        return apiBase.post(`${urlDefault}/assign-lesson`, data, { hasAuth: true });
    },

}