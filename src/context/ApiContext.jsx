import React, { createContext, useContext } from 'react';
import axios from 'axios';

// Create the API context
const ApiContext = createContext();

// Custom hook to use the API context
export const useApi = () => {
    return useContext(ApiContext);
};

// API context provider
export const ApiProvider = ({ children }) => {
    // Base Axios instance
    const api = axios.create({
        baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`, // Replace with your backend URL
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return (
        <ApiContext.Provider value={api}>
            {children}
        </ApiContext.Provider>
    );
};
