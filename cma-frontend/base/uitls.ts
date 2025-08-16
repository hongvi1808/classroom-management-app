export const validRequire = (value: string) => {
    if (!value.trim()) return '*Required field'
}

export const SESSION_LOCAL_STORAGE_KEY = 'session'

export const ROLE_INSTRCTOR = 'INSTRUCTOR';
export const ROLE_STUDENT = 'STUDENT';