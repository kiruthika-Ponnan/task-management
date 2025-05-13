import express from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';
import authRoutes from './routes/auth.routes';
import taskRoutes from './routes/task.routes';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 4000;

AppDataSource.initialize()
    .then(() => {
        console.log('Database connection established');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to database:', error);
    }); 