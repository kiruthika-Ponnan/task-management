export interface User {
    id: number;
    email: string;
}

export interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface ApiError {
    error: string | { [key: string]: string[] };
} 