// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authUtils from '../components/utils/auth'; // Importa tus utilidades de auth

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loadingAuth, setLoadingAuth] = useState(true); // Para saber cuándo se ha verificado el estado inicial
    const navigate = useNavigate();

    useEffect(() => {
        // Envolver setCurrentUser para asegurar que el nombre es procesado
        const setUserWithProcessedName = (userData) => {
            if (userData && userData.name) {
                // Ya no necesitamos la transformación decodeURIComponent(escape())
                // Asumimos que el nombre es UTF-8 correcto desde la fuente
            }
            setCurrentUser(userData);
        };

        authUtils.checkLoginStatus(setIsLoggedIn, setUserWithProcessedName);
        setLoadingAuth(false);
    }, []);

    const login = useCallback((userData, fromPath) => {
        authUtils.handleSuccessfulLogin(setIsLoggedIn, setCurrentUser, userData);
        navigate(fromPath || '/', { replace: true });
    }, [navigate]);

    const register = useCallback((userData) => {
        authUtils.handleSuccessfulLogin(setIsLoggedIn, setCurrentUser, userData);
        navigate('/');
    }, [navigate]);

    const logout = useCallback(() => {
        authUtils.handleLogout(setIsLoggedIn, setCurrentUser, navigate);
    }, [navigate]);

    const updateProfile = useCallback((updatedProfileData) => {
        // Aquí, actualiza currentUser y también localStorage si es necesario
        setCurrentUser(prevUser => {
            const newUser = { ...prevUser, ...updatedProfileData };
            localStorage.setItem('userData', JSON.stringify(newUser));
            return newUser;
        });
        // Podrías tener una función en authUtils para esto también
    }, []);

    const deleteAccount = useCallback(() => {
        // Lógica para eliminar cuenta (llamada a API, etc.)
        // Luego llama a logout
        logout();
    }, [logout]);


    const value = {
        currentUser,
        isLoggedIn,
        loadingAuth,
        login,
        register,
        logout,
        updateProfile, // Nueva función para actualizar
        deleteAccount, // Nueva función para eliminar cuenta
        // Pasamos setCurrentUser y setIsLoggedIn por si se necesitan directamente en algún caso avanzado,
        // pero generalmente se deberían usar las funciones login/logout.
        _setCurrentUser: setCurrentUser,
        _setIsLoggedIn: setIsLoggedIn
    };

    return (
        <AuthContext.Provider value={value}>
            {!loadingAuth && children} {/* No renderizar hijos hasta que la autenticación inicial se verifique */}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};