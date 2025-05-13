import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Task } from './Task';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    email!: string;

    @Column()
    password_hash!: string;

    @OneToMany(() => Task, task => task.user)
    tasks!: Task[];

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt!: Date;

    constructor(partial: Partial<User> = {}) {
        Object.assign(this, partial);
    }
} 