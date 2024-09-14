import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask, toggleTaskCompletion } from '../redux/actions'; // Added addTask here

const TaskList = ({ category, onEditTask }) => {
    const tasks = useSelector(state => state.tasks.tasks);
    const dispatch = useDispatch();
    const [sortOption, setSortOption] = useState('priority');

    useEffect(() => {
        const interval = setInterval(() => {
            // Automatically create new tasks for recurring tasks
            tasks.forEach(task => {
                if (task.recurring === 'daily') {
                    const dueDate = new Date(task.dueDate);
                    const today = new Date();
                    if (today > dueDate) {
                        const nextDueDate = new Date();
                        nextDueDate.setDate(today.getDate() + 1);
                        dispatch(addTask(task.text, task.priority, nextDueDate.toISOString().split('T')[0], new Date().toISOString(), 'daily'));
                    }
                } else if (task.recurring === 'weekly') {
                    const dueDate = new Date(task.dueDate);
                    const today = new Date();
                    if (today > dueDate) {
                        const nextDueDate = new Date();
                        nextDueDate.setDate(today.getDate() + 7);
                        dispatch(addTask(task.text, task.priority, nextDueDate.toISOString().split('T')[0], new Date().toISOString(), 'weekly'));
                    }
                }
            });
        }, 86400000); // Check daily
        return () => clearInterval(interval);
    }, [tasks, dispatch]);

    const handleSort = (option) => {
        setSortOption(option);
    };

    const sortedTasks = tasks.sort((a, b) => {
        if (sortOption === 'priority') {
            const priorities = { 'High': 3, 'Medium': 2, 'Low': 1 };
            return priorities[b.priority] - priorities[a.priority];
        } else if (sortOption === 'dueDate') {
            return new Date(a.dueDate) - new Date(b.dueDate);
        } else if (sortOption === 'createdDate') {
            return new Date(a.createdDate) - new Date(b.createdDate);
        }
        return 0;
    });

    const filteredTasks = sortedTasks.filter(task => {
        if (category === 'important') return task.priority === 'High';
        if (category === 'today') return new Date(task.dueDate).toDateString() === new Date().toDateString();
        if (category === 'planned') return new Date(task.dueDate) > new Date();
        return true;
    });

    return (
        <div>
            <select onChange={(e) => handleSort(e.target.value)} value={sortOption}>
                <option value="priority">Sort by Priority</option>
                <option value="dueDate">Sort by Due Date</option>
                <option value="createdDate">Sort by Created Date</option>
            </select>
            <ul>
                {filteredTasks.map((task) => (
                    <li key={task.id}>
                        <input 
                            type="checkbox" 
                            checked={task.completed} 
                            onChange={() => dispatch(toggleTaskCompletion(task.id))} 
                        />
                        {task.text} - {task.priority} - Due: {task.dueDate}
                        <button onClick={() => onEditTask(task.id)}>Edit</button>
                        <button onClick={() => dispatch(deleteTask(task.id))}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
