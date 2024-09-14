import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { login, logout } from './redux/actions';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import Sidebar from './components/Sidebar';
import WeatherWidget from './components/WeatherWidget';
import LocationSelector from './components/LocationSelector';
import TaskEditSidebar from './components/TaskEditSidebar';
import ProfileHeader from './components/ProfileHeader';
import './styles.css';  // Updated styles to include theme functionality

function App() {
    const [completedPercentage, setCompletedPercentage] = useState(0);
    const [category, setCategory] = useState('tasks');
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [theme, setTheme] = useState('light'); // Theme state

    const tasks = useSelector(state => state.tasks.tasks);
    const isLoggedIn = useSelector(state => state.tasks.isLoggedIn);
    const dispatch = useDispatch();

    // Calculate completed task percentage
    useEffect(() => {
        const completedTasks = tasks.filter(task => task.completed).length;
        const totalTasks = tasks.length;
        const percentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
        setCompletedPercentage(percentage);
    }, [tasks]);

    // Handle window resize to determine mobile or desktop view
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setSidebarOpen(true);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Handle task edit
    const handleEditTask = (taskId) => {
        setEditingTaskId(taskId);
    };

    // Toggle between light and dark themes
    const handleThemeToggle = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    // Close sidebar on clicking outside for mobile view
    const handleOutsideClick = (e) => {
        if (isMobile && sidebarOpen && e.target.classList.contains('overlay')) {
            setSidebarOpen(false);
        }
    };

    return (
        <div className={`app ${theme}`}>
            <div className="theme-toggle">
                <button onClick={handleThemeToggle}>
                    Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
                </button>
            </div>

            <div className="side-controls">
                {!sidebarOpen && (
                    <div className="burger-menu" onClick={() => setSidebarOpen(true)}>
                        &#9776;
                    </div>
                )}

                {sidebarOpen && (
                    <div className="close-btn" onClick={() => setSidebarOpen(false)}>
                        &times;
                    </div>
                )}
            </div>

            <Sidebar setCategory={setCategory} className={sidebarOpen ? 'sidebar-open' : 'sidebar-hidden'} />

            {isMobile && sidebarOpen && <div className="overlay active" onClick={handleOutsideClick}></div>}

            <div className="content">
                {isLoggedIn && (
                    <ProfileHeader
                        name="Gundeep Singh"
                        avatarVisible={isLoggedIn}
                    />
                )}
                <LocationSelector />
                <WeatherWidget />
                <div style={{ width: 100, height: 100 }}>
                    <CircularProgressbar value={completedPercentage} text={`${Math.round(completedPercentage)}%`} />
                </div>
                <p>{Math.round(completedPercentage)}% Completed</p>

                {isLoggedIn ? (
                    <>
                        <TaskInput />
                        <TaskList category={category} onEditTask={handleEditTask} />
                        {editingTaskId && <TaskEditSidebar taskId={editingTaskId} />}
                        <button className="primary" onClick={() => {
                            dispatch(logout());
                            setSidebarOpen(false);
                        }}>
                            Logout
                        </button>
                    </>
                ) : (
                    <button className="primary" onClick={() => dispatch(login())}>Login</button>
                )}
            </div>
        </div>
    );
}

export default App;
