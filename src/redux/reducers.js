const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
const savedLocation = localStorage.getItem('location') || '';

const initialState = {
    tasks: savedTasks,
    isLoggedIn: false,
    location: savedLocation
};

export default function taskReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_TASK':
            return { 
                ...state, 
                tasks: [...state.tasks, action.payload] 
            };
        case 'DELETE_TASK':
            const filteredTasks = state.tasks.filter(task => task.id !== action.payload);
            return {
                ...state,
                tasks: filteredTasks
            };
        case 'LOGIN':
            return {
                ...state,
                isLoggedIn: true
            };
        case 'LOGOUT':
            return {
                ...state,
                isLoggedIn: false
            };
        case 'SET_LOCATION':
            return {
                ...state,
                location: action.payload
            };
        case 'UPDATE_TASK':
            return {
                ...state,
                tasks: state.tasks.map(task => task.id === action.payload.id ? action.payload : task)
            };
        case 'TOGGLE_TASK_COMPLETION':
            return {
                ...state,
                tasks: state.tasks.map(task => task.id === action.payload ? { ...task, completed: !task.completed } : task)
            };
        default:
            return state;
    }
}
