import React, { useEffect } from 'react';
import { useTasksStore } from '../../store/tasks';
import { TaskItem } from './TaskItem';
import { CreateTaskForm } from './CreateTaskForm';

export const TaskList: React.FC = () => {
    const { tasks, loading, error, fetchTasks } = useTasksStore();

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Tasks</h1>
            </div>

            <div className="mb-8">
                <CreateTaskForm />
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
            ) : error ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <p>{error}</p>
                    <button 
                        onClick={() => fetchTasks()}
                        className="mt-2 text-sm underline hover:no-underline"
                    >
                        Try again
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {tasks.length === 0 ? (
                        <div className="text-center py-8 bg-gray-50 rounded-lg">
                            <p className="text-gray-500">No tasks yet. Create one above!</p>
                        </div>
                    ) : (
                        tasks.map((task) => (
                            <TaskItem key={task.id} task={task} />
                        ))
                    )}
                </div>
            )}
        </div>
    );
}; 