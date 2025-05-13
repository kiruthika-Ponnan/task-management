import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column({ type: 'text', nullable: true })
    description!: string;

    @Column({ default: false })
    completed!: boolean;

    @Column()
    user_id!: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt!: Date;

    constructor(partial: Partial<Task> = {}) {
        Object.assign(this, partial);
    }
} 