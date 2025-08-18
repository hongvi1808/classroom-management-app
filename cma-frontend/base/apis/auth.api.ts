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
    verifyEmailByCode: (data: any) => {
        return apiBase.post(`${urlDefault}/validate-email-access-code`, data);
    },
    verifyEmail: (data: any) => {
        return apiBase.put(`${urlDefault}/verify-email/${data}`, {});
    },
    setupAccount: (data: any) => {
        return apiBase.put(`${urlDefault}/account-setup/${data?.id}`, data);
    },
    loginAccount: (data: any) => {
        return apiBase.post(`${urlDefault}/login`, data);
    },
    logout: () => {
        return apiBase.post(`${urlDefault}/logout`, {});
    },
}