import Swal, { SweetAlertOptions } from 'sweetalert2'

export const showAlertError = (errMessage: string | any,  option?: SweetAlertOptions) => Swal.fire({
    title: "Oops...",
    text: errMessage,
    icon: 'error',
    confirmButtonText: 'CLOSE',
    ...option
});
export const showAlertSuccess = (message: string | any,  option?: SweetAlertOptions) => Swal.fire({
    title: 'SUCCESS',
    text: message,
    icon: 'success',
    confirmButtonText: 'CLOSE',
    ...option
});
export const showAlertQuestion = (question: string | any, option?: SweetAlertOptions) => Swal.fire({
    text: 'Do you want to continue?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: "Continue",
    ...option
});