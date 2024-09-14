import React from 'react';

const Sidebar = ({ setCategory, className }) => {
    return (
        <div className={`sidebar ${className}`}>
            <h2>Categories</h2>
            <ul>
                <li onClick={() => setCategory('today')}>Today</li>
                <li onClick={() => setCategory('important')}>Important</li>
                <li onClick={() => setCategory('planned')}>Planned</li>
                <li onClick={() => setCategory('assignedToMe')}>Assigned to Me</li>
                <li onClick={() => setCategory('tasks')}>All Tasks</li>
            </ul>
        </div>
    );  
};

export default Sidebar;
