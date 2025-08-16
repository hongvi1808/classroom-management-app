import apiBase from "../axios/api-base";

const urlDefault = '/auth';

export const authApis = {
    loginPhone: (data: any) => {
        return apiBase.post(`${urlDefault}/create-access-code`, data);
    },
    verifyPhone: (data: any) => {
        return apiBase.post(`${urlDefault}/validate-access-code`, data);
    },
    loginEmail: (data: any) => {
        return apiBase.post(`${urlDefault}/login-with-email`, data);
    },
    verifyEmail: (data: any) => {
        return apiBase.post(`${urlDefault}/validate-email-access-code`, data);
    },
}