import React from 'react';

const CompletionStats = ({ completed, total }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const percentage = (completed / total) * 100;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="completion-stats">
            <svg width="120" height="120">
                <circle cx="60" cy="60" r={radius} stroke="lightgray" strokeWidth="5" fill="none" />
                <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    stroke="blue"
                    strokeWidth="5"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                />
            </svg>
            <p>{percentage.toFixed(1)}% Completed</p>
        </div>
    );
};


export default CompletionStats;
