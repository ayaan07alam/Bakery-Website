import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('adminToken'));
    const [loading, setLoading] = useState(true);

    // Check if user is authenticated on mount
    useEffect(() => {
        if (token) {
            validateToken();
        } else {
            setLoading(false);
        }
    }, []);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

    const validateToken = async () => {
        try {
            const response = await axios.get(`${API_URL}/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUser(response.data);
        } catch (error) {
            console.error('Token validation failed:', error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = async (username, password) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                username,
                password
            });

            const { token: newToken, username: user, role } = response.data;

            localStorage.setItem('adminToken', newToken);
            setToken(newToken);
            setUser({ username: user, role });

            return { success: true };
        } catch (error) {
            console.error('Login failed:', error);
            return {
                success: false,
                error: error.response?.data?.error || 'Login failed. Please try again.'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('adminToken');
        setToken(null);
        setUser(null);
    };

    const isAuthenticated = () => {
        return !!token && !!user;
    };

    const getAuthHeader = () => {
        return token ? { 'Authorization': `Bearer ${token}` } : {};
    };

    const value = {
        user,
        token,
        login,
        logout,
        isAuthenticated,
        getAuthHeader,
        loading
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
