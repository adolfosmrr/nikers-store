import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setIsAuthenticated(true);
            } catch (error) {
                console.error("Error parsing user from localStorage:", error);
                localStorage.removeItem('user');
            }
        }
    }, []);

    const login = (email, password) => {
        if (email === 'admin@nikers.com' && password === 'admin123') {
            const adminUser = { email: 'admin@nikers.com', role: 'admin' };
            localStorage.setItem('user', JSON.stringify(adminUser));
            setUser(adminUser);
            setIsAuthenticated(true);
            return { success: true, user: adminUser };
        } else if (email === 'user@nikers.com' && password === 'user123') {
            const regularUser = { email: 'user@nikers.com', role: 'user' };
            localStorage.setItem('user', JSON.stringify(regularUser));
            setUser(regularUser);
            setIsAuthenticated(true);
            return { success: true, user: regularUser };
        } else {
            return { success: false, message: 'Credenciales incorrectas' };
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);