import React from 'react';
import './Header.css';

const Header = ({ toggleTheme, currentTheme }) => {
    return (
        <header className="header">
            <h1>Task Manager</h1>
            <button onClick={toggleTheme} className="theme-toggle">
                {currentTheme === 'light' ? '🌙' : '☀️'}
            </button>
        </header>
    );
};

export default Header;
