import apiBase from "../axios/api-base";

const urlDefault = '/instructor';

export const instructorApis = {
    addStudent: (data: any) => {
        return apiBase.post(`${urlDefault}/add-student`, data, {hasAuth: true});
    },
    getStudents: () => {
        return apiBase.get(`${urlDefault}/students`, {hasAuth: true});
    }
}