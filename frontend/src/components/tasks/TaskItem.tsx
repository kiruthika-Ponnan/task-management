import React, { useState } from 'react';
import { useTasksStore } from '../../store/tasks';
import { Task } from '../../types';

interface TaskItemProps {
    task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const { updateTask, deleteTask } = useTasksStore();

    const handleUpdate = async () => {
        await updateTask(task.id, { title, description });
        setIsEditing(false);
    };

    const handleToggleComplete = () => {
        updateTask(task.id, { completed: !task.completed });
    };

    if (isEditing) {
        return (
            <div className="bg-white p-4 rounded-lg shadow">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full mb-2 p-2 border rounded"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full mb-2 p-2 border rounded"
                />
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={() => setIsEditing(false)}
                        className="px-3 py-1 text-gray-600 hover:text-gray-800"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdate}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Save
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={handleToggleComplete}
                        className="mt-1"
                    />
                    <div>
                        <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                            {task.title}
                        </h3>
                        <p className={`text-gray-600 ${task.completed ? 'line-through' : ''}`}>
                            {task.description}
                        </p>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setIsEditing(true)}
                        className="text-gray-600 hover:text-gray-800"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => deleteTask(task.id)}
                        className="text-red-600 hover:text-red-800"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}; 