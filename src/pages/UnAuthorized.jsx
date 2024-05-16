import React from 'react';
import { Link } from "react-router-dom";

const UnAuthorized = () => {
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
                UnAuthorized
            </h1>

            <p
                style={{
                    fontSize: '1.5rem',
                    fontFamily: 'Share Tech Mono',
                }}
            >
                You are not authorized to view this page.
                Login or register to view this page.
            </p>

            <Link to="/login" style={{
                color: 'whitesmoke',
                textDecoration: 'none',
                backgroundColor: '#333',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
                textAlign: 'center',
            }}>
                Login
            </Link>

            <br />
            <Link to="/register" style={{
                color: 'whitesmoke',
                textDecoration: 'none',
                backgroundColor: '#333',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
                textAlign: 'center',
            }}>
                Register
            </Link>
        </div>
    );
}


export default UnAuthorized;