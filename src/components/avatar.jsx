import React from 'react';

export const Avatar = ({ initials = 'U', square = false, className = '' }) => {
    return (
        <div
            className={`flex items-center justify-center font-bold text-sm ${
                square ? 'rounded-md' : 'rounded-full'
            } ${className}`}
        >
            {initials}
        </div>
    );
};

export default Avatar;
