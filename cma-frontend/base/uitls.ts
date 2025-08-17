export const validRequire = (value: string) => {
    if (!value.trim()) return '*Required field'
}
export  const validPhone = (value: string) => {
        if (validRequire(value)) return validRequire(value)
        if (!(/^(0|\+84)(\d{9})$/).test(value)) return 'Your number phone is invalid (in Vietnam)'
    }
export    const validEmail = (value: string) => {
        if (validRequire(value)) return validRequire(value)
        if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(value)) return 'Your email is invalid'
    }

export const SESSION_LOCAL_STORAGE_KEY = 'session'

export const ROLE_INSTRCTOR = 'INSTRUCTOR';
export const ROLE_STUDENT = 'STUDENT';