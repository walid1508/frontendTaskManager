import React from 'react';

const NotFound = () => {
    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#000',
            color: 'whitesmoke',
            display: 'grid',
            placeContent: 'center',
            padding: '1rem',
        }}>
            <h1
                style={{
                    fontSize: '5rem',
                    fontFamily: 'Share Tech Mono',
                }}
            >
                404 Not Found
            </h1>

            <button
                style={{
                    padding: '0.5rem',
                    fontSize: '1.5rem',
                    backgroundColor: 'whitesmoke',
                    color: '#000',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '5px',
                    marginTop: '1rem',
                }}
            >
                Go back to Home
            </button>

        </div>
    );
};

export default NotFound;