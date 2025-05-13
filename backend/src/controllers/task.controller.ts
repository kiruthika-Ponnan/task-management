import { Response } from 'express';
import { AppDataSource } from '../data-source';
import { Task } from '../entities/Task';
import { AuthRequest } from '../middleware/auth';
import { z } from 'zod';

const taskRepository = AppDataSource.getRepository(Task);

const taskSchema = z.object({
    title: z.string().min(1),
    description: z.string(),
    completed: z.boolean().default(false),
});

export const createTask = async (req: AuthRequest, res: Response) => {
    try {
        const taskData = taskSchema.parse(req.body);
        const task = taskRepository.create({
            ...taskData,
            user_id: req.user!.id,
        });

        await taskRepository.save(task);
        res.status(201).json(task);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.errors });
        }
        res.status(500).json({ error: 'Server error' });
    }
};

export const getTasks = async (req: AuthRequest, res: Response) => {
    try {
        const tasks = await taskRepository.find({
            where: { user_id: req.user!.id },
            order: { createdAt: 'DESC' },
        });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const getTask = async (req: AuthRequest, res: Response) => {
    try {
        const task = await taskRepository.findOne({
            where: { id: parseInt(req.params.id), user_id: req.user!.id },
        });

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
    try {
        const taskData = taskSchema.partial().parse(req.body);
        const task = await taskRepository.findOne({
            where: { id: parseInt(req.params.id), user_id: req.user!.id },
        });

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        Object.assign(task, taskData);
        await taskRepository.save(task);
        res.json(task);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.errors });
        }
        res.status(500).json({ error: 'Server error' });
    }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
    try {
        const task = await taskRepository.findOne({
            where: { id: parseInt(req.params.id), user_id: req.user!.id },
        });

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        await taskRepository.remove(task);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}; 