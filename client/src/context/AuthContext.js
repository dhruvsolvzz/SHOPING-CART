import React, { createContext, useState, useEffect } from 'react';
import api from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on page load
    const checkLoggedIn = async () => {
      if (token) {
        try {
          // Set auth header for any direct axios calls
          // Note: Our api utility already handles this via interceptors
          
          // Get user data
          const res = await api.get('/users/me');
          setCurrentUser(res.data.user);
        } catch (err) {
          // If token is invalid, clear it
          console.error('Error verifying token:', err);
          localStorage.removeItem('token');
          setToken(null);
          setCurrentUser(null);
          // No need to delete from axios defaults as we're using our api utility
        }
      }
      setLoading(false);
    };

    checkLoggedIn();
  }, [token]);

  // Register user
  const register = async (userData) => {
    try {
      const res = await api.post('/users', userData);
      setToken(res.data.token);
      setCurrentUser(res.data.user);
      localStorage.setItem('token', res.data.token);
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        error: err.response?.data?.error || 'Registration failed'
      };
    }
  };

  // Login user
  const login = async (userData) => {
    try {
      const res = await api.post('/users/login', userData);
      setToken(res.data.token);
      setCurrentUser(res.data.user);
      localStorage.setItem('token', res.data.token);
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        error: err.response?.data?.error || 'Login failed'
      };
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setCurrentUser(null);
    // No need to delete from axios defaults as we're using our api utility
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        token,
        loading,
        register,
        login,
        logout,
        isAuthenticated: !!token
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};