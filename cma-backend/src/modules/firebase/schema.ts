export interface UserCollection {
    id: string;
    name: string;
    email: string;
    password: string;
    username: string;
    phoneNumber: string;
    alive: boolean;
    lesson: LessonCollection[] | any[]
    createdAt: number;
    updatedAt: number;
    accessCode?: string;
    role: string; // e.g., 'student', 'instructor'
    isVerified?: boolean;
}

export interface LessonCollection {
    id: string;
    title: string;
    description: string;
    status: string; // e.g., 'active', 'completed', 
    deliveriedAt: number; // in minutes
    completedAt: number;
}