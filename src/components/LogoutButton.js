import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const LogoutButton = () => {
    const logout = useAuthStore(state => state.logout);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <button onClick={handleLogout} className="btn btn-link">
            <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
        </button>
    );
};

export default LogoutButton;
