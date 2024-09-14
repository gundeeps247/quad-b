export const addTask = (text, priority, dueDate, createdDate, recurring = 'none') => {
    const task = {
        id: Date.now(),
        text,
        priority,
        dueDate,
        createdDate,
        recurring,
        completed: false,
    };
    
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    return {
        type: 'ADD_TASK',
        payload: task,
    };
};

export const deleteTask = (id) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    return {
        type: 'DELETE_TASK',
        payload: id
    };
};

export const login = () => ({
    type: 'LOGIN'
});

export const logout = () => ({
    type: 'LOGOUT'
});

export const setLocation = (location) => {
    localStorage.setItem('location', location);
    return {
        type: 'SET_LOCATION',
        payload: location
    };
};

export const updateTask = (task) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.map(t => t.id === task.id ? task : t);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    return {
        type: 'UPDATE_TASK',
        payload: task
    };
};

export const toggleTaskCompletion = (id) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    return {
        type: 'TOGGLE_TASK_COMPLETION',
        payload: id
    };
};
