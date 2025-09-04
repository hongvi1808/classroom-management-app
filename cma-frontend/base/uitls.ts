import crypto from "crypto";

export const validRequire = (value: string) => {
    if (!value.trim()) return '*Required field'
}
export const validPhone = (value: string) => {
    if (validRequire(value)) return validRequire(value)
    if (!(/^(0|\+84)(3|5|7|8|9)[0-9]{8}$/).test(value)) return 'Your number phone is invalid (in Vietnam)'
}
export const validEmail = (value: string) => {
    if (validRequire(value)) return validRequire(value)
    if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(value)) return 'Your email is invalid'
}

export const regexVaid = (name: string) => {
    if (!name) return {}
    switch (name) {
        case 'phoneNumber': return { pattern: "^(0|\\+84)(3|5|7|8|9)[0-9]{8}$" }
        case 'email': return { pattern: "^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$" }


        default: return {}
    }
}

export const SESSION_LOCAL_STORAGE_KEY = 'session'

export const ROLE_INSTRCTOR = 'INSTRUCTOR';
export const ROLE_STUDENT = 'STUDENT';

export enum SocketStatusEnum {
  INIT = 0,
  CONNECTING = 1,
  CONNECTED = 2,
  ERR = 3,
  RECONNECTING = 4,
  RECONNECTINGFAIL = 5,
  RECONNECTED = 6,
  DISCONNECTED = 7,
}

export const getSessionLocal = () => {
    if (typeof window === 'undefined') return null
    const token = localStorage.getItem(SESSION_LOCAL_STORAGE_KEY)
    const tokenObj = token ? JSON.parse(token) : null
    return tokenObj
}

export const createRoomIdChat = (user1: string, user2: string) => {
    const sorted = [user1, user2].sort().join("_");
    return crypto.createHash("md5").update(sorted).digest("hex");
}

export const formatDate = (da: number | Date): string => {
    if (!da) return ''
    const date = new Date(da);
    const h = date.getHours().toString().padStart(2, "0");
    const m = date.getMinutes().toString().padStart(2, "0");
    const d = date.getDate().toString().padStart(2, "0");
    const mo = (date.getMonth() + 1).toString().padStart(2, "0"); // tháng tính từ 0
    const y = date.getFullYear();
    return `${h}:${m} ${d}-${mo}-${y}`;
}

export const formatPhone = (phone: string) => {
    if (!phone) return ''
    // Bỏ khoảng trắng, dấu gạch ngang nếu có
    let cleaned = phone?.replace(/\D/g, "");

    // Nếu bắt đầu bằng 84 → thay bằng 0
    if (cleaned?.startsWith("84")) {
        cleaned = "0" + cleaned.slice(2);
    }

    return cleaned;
}

