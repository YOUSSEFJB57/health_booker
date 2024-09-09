import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    const storedAuthState = localStorage.getItem('authState');
    return storedAuthState ? JSON.parse(storedAuthState) : { isAuthenticated: false, user: null, token: null };
  });

  // useEffect(() => {
  //   if (authState.isAuthenticated) {
  //     localStorage.setItem('authState', JSON.stringify(authState));
  //   } else {
  //     localStorage.removeItem('authState');
  //   }
  // }, [authState]);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8080/api/users/login', { email, password });
      const userData = response.data;
      const newAuthState = {
        isAuthenticated: true,
        user: userData,
        token: null,
      };
      setAuthState(newAuthState);
      localStorage.setItem('authState', JSON.stringify(newAuthState));
      return userData;
    } catch (error) {
      console.error('Login failed:', error);
      return null; // or throw an error to handle it in the component
    }
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
    });
    localStorage.removeItem('authState');
  };

  const value = useMemo(() => ({
    authState,
    login,
    logout,
  }), [authState]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
