import apiBase from "../axios/api-base";

const urlDefault = '/student';

export const studentApis = {
    getMyLesson: (data:any) => {
       return apiBase.get(`${urlDefault}/my-lessons?phone=${data}`,{ hasAuth: true });
    },
    getProfile: (data:any) => {
       return apiBase.get(`${urlDefault}/profile?phone=${data}`,{ hasAuth: true });
    },
    markLessonDone: (data: any) => {
        return apiBase.post(`${urlDefault}/mark-lesson-done`, data, { hasAuth: true });
    },
    editProfile: (data: any) => {
        return apiBase.put(`${urlDefault}/edit-profile/${data.id}`, data, { hasAuth: true });
    },
    getInstructorList: () => {
       return apiBase.get(`${urlDefault}/instructor`,{ hasAuth: true });
    },

}