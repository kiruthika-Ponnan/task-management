import axios from 'axios';
import { Task, AuthResponse } from '../types';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to add the auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle auth errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const auth = {
    register: (email: string, password: string) =>
        api.post<AuthResponse>('/api/auth/register', { email, password }),
    
    login: (email: string, password: string) =>
        api.post<AuthResponse>('/api/auth/login', { email, password }),
};

export const tasks = {
    getAll: () => api.get<Task[]>('/api/tasks'),
    
    getOne: (id: number) => api.get<Task>(`/api/tasks/${id}`),
    
    create: (title: string, description: string) => 
        api.post<Task>('/api/tasks', { title, description }),
    
    update: (id: number, data: Partial<Task>) =>
        api.put<Task>(`/api/tasks/${id}`, data),
    
    delete: (id: number) => api.delete(`/api/tasks/${id}`),
};

export default api; 