import './Errors.css';
import React from 'react';

function Errors({ isShown, children }) {

    if (!isShown) {
        return null
    }

    return (
        <div className='error'>
            <p className='error__text'>
                {children}
            </p>
        </div>
    );
};

export default Errors;