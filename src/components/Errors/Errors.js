import './Errors.css';
import React, { useState } from 'react';

function Errors({ isShown, message, code, type }) {

    const [isError, setIsError] = useState(true);

    function handleError() {
        setIsError(!isError)
    }

    return (
        <div className='message'>
            {isError ? (
                <p className='message__text'>
                    Что-то пошло не так...
                </p>
            ) : null}
        </div>
    );
};

export default Errors;