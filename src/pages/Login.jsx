import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import './Home.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated);
    const setAccessToken = useAuthStore(state => state.setAccessToken);
    const setUsernameInStore = useAuthStore(state => state.setUsername);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:4500/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setIsAuthenticated(true);
                setAccessToken(data.accessToken);
                setUsernameInStore(username);
                navigate('/');
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className="login-container d-flex justify-content-center align-items-center vh-100">
            <div className="login-card p-5 shadow-lg rounded">
                <h2 className="text-center mb-4">Welcome!</h2>
                <p className="text-center mb-4">Please log in to start managing your tasks.</p>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="formUsername" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="formUsername"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formPassword" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="formPassword"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-3">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
