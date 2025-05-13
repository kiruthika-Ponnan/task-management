import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { Task } from './entities/Task';
import { UpdateTaskSchema1710000000000 } from './migrations/1710000000000-UpdateTaskSchema';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: false, // Disable synchronize when using migrations
    logging: process.env.NODE_ENV === 'development',
    entities: [User, Task],
    migrations: [UpdateTaskSchema1710000000000],
    subscribers: [],
}); 