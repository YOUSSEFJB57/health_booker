// import React, { createContext, useContext, useReducer, useEffect } from 'react';
// import axios from 'axios';

// const AuthContext = createContext();

// const initialState = {
//   isAuthenticated: false,
//   user: null,
//   token: null,
//   loading: true,
// };

// const authReducer = (state, action) => {
//   switch (action.type) {
//     case 'LOGIN_SUCCESS':
//       return {
//         ...state,
//         isAuthenticated: true,
//         user: action.payload.user,
//         token: action.payload.token,
//         loading: false,
//       };
//     case 'LOGOUT':
//       return {
//         ...state,
//         isAuthenticated: false,
//         user: null,
//         token: null,
//         loading: false,
//       };
//     case 'SET_LOADING':
//       return {
//         ...state,
//         loading: true,
//       };
//     case 'AUTH_READY':
//       return {
//         ...state,
//         loading: false,
//       };
//     default:
//       return state;
//   }
// };

// export const AuthProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, initialState);

//   useEffect(() => {
//     const storedAuthState = localStorage.getItem('authState');
//     if (storedAuthState) {
//       const parsedAuthState = JSON.parse(storedAuthState);
//       dispatch({
//         type: 'LOGIN_SUCCESS',
//         payload: {
//           user: parsedAuthState.user,
//           token: parsedAuthState.token,
//         },
//       });
//     }
//     dispatch({ type: 'AUTH_READY' });
//   }, []);

//   const login = async (email, password) => {
//     try {
//       const response = await axios.post('http://localhost:8080/api/users/login', { email, password });
//       const userData = response.data;

//       const authData = {
//         isAuthenticated: true,
//         user: userData,
//         token: null,
//       };

//       localStorage.setItem('authState', JSON.stringify(authData));

//       dispatch({
//         type: 'LOGIN_SUCCESS',
//         payload: {
//           user: userData,
//           token: null,
//         },
//       });

//       return userData;
//     } catch (error) {
//       console.error('Login failed:', error);
//       return null;
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('authState');
//     dispatch({ type: 'LOGOUT' });
//   };

//   return (
//     <AuthContext.Provider value={{ state, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
