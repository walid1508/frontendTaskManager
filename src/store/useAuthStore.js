import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    isAuthenticated: !!localStorage.getItem('accessToken'),
    accessToken: localStorage.getItem('accessToken'),
    username: localStorage.getItem('username'),
    setIsAuthenticated: (authStatus) => set({ isAuthenticated: authStatus }),
    setAccessToken: (token) => {
        localStorage.setItem('accessToken', token);
        set({ accessToken: token });
    },
    setUsername: (username) => {
        localStorage.setItem('username', username);
        set({ username });
    },
    logout: async () => {
        const accessToken = localStorage.getItem('accessToken');
        try {
            await fetch('http://localhost:4500/auth/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
            localStorage.removeItem('accessToken');
            localStorage.removeItem('username');
            set({ isAuthenticated: false, accessToken: null, username: null });
        } catch (error) {
            console.error('Error logging out:', error);
        }
    },
}));
