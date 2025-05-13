import create from 'zustand';
import { tasks } from '../api';
import { Task } from '../types';

interface TasksStore {
    tasks: Task[];
    loading: boolean;
    error: string | null;
    fetchTasks: () => Promise<void>;
    createTask: (title: string, description: string) => Promise<void>;
    updateTask: (id: number, updates: Partial<Task>) => Promise<void>;
    deleteTask: (id: number) => Promise<void>;
}

export const useTasksStore = create<TasksStore>((set) => ({
    tasks: [],
    loading: false,
    error: null,

    fetchTasks: async () => {
        set({ loading: true, error: null });
        try {
            const { data } = await tasks.getAll();
            set({ tasks: data, loading: false });
        } catch (error) {
            set({ error: 'Failed to fetch tasks', loading: false });
        }
    },

    createTask: async (title: string, description: string) => {
        try {
            const { data } = await tasks.create(title, description);
            set((state) => ({
                tasks: [...state.tasks, data]
            }));
        } catch (error) {
            set({ error: 'Failed to create task' });
        }
    },

    updateTask: async (id: number, updates: Partial<Task>) => {
        try {
            const { data } = await tasks.update(id, updates);
            set((state) => ({
                tasks: state.tasks.map((task) =>
                    task.id === id ? { ...task, ...data } : task
                )
            }));
        } catch (error) {
            set({ error: 'Failed to update task' });
        }
    },

    deleteTask: async (id: number) => {
        try {
            await tasks.delete(id);
            set((state) => ({
                tasks: state.tasks.filter((task) => task.id !== id)
            }));
        } catch (error) {
            set({ error: 'Failed to delete task' });
        }
    }
})); 