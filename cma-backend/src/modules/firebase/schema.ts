export const USER_COLLECTION_NAME = 'user';
export interface UserCollection {
    id: string;
    name: string;
    email: string;
    password: string;
    username: string;
    phoneNumber: string;
    alive: boolean;
    active: boolean;
    lessons: LessonCollection[] | any[]
    createdAt: number;
    updatedAt: number;
    accessCode?: string;
    role: string; // e.g., 'student', 'instructor'
}

export interface LessonCollection {
    id: string;
    title: string;
    description: string;
    status: string; // e.g., 'active', 'completed', 
    deliveriedAt: number; // in minutes
    completedAt: number;
}