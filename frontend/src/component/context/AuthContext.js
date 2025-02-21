import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import url from '../domain';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [id,setId] = useState("")

    const checkAuthStatus = async () => {
        try {
            const response = await axios.get(url+'/api/check-auth', { withCredentials: true });
            setIsAuthenticated(response.data.authenticated);
            setId(response.data.id)
        } catch (error) {
            setIsAuthenticated(false);
        } finally {
            setLoading(false); 
        }
    };


    useEffect(() => {
        checkAuthStatus();
    }, []);


    if (loading) {
        return <div className='pt-20 text-3xl flex justify-center items-center h-screen'>Loading...</div>; 
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, checkAuthStatus ,setIsAuthenticated,id,setId}}>
            {children}
        </AuthContext.Provider>
    );
};
