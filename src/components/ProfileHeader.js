import React from 'react';

const ProfileHeader = ({ name, avatarVisible }) => {
    return (
        <div className="profile-header">
            {/* Conditionally rendering the image based on avatarVisible prop */}
            {avatarVisible && (
                <img
                    src="https://i.pinimg.com/236x/bf/57/02/bf57026ee75af2f414000cec322f7404.jpg"
                    alt="Profile Avatar"
                    className="profile-avatar"
                />
            )}
            <h2>{name}</h2>
        </div>
    );
};

export default ProfileHeader;
