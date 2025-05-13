import { Router } from 'express';
import { createTask, getTasks, getTask, updateTask, deleteTask } from '../controllers/task.controller';
import { auth } from '../middleware/auth';

const router = Router();

router.use(auth);

router.post('/', createTask);
router.get('/', getTasks);
router.get('/:id', getTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router; 