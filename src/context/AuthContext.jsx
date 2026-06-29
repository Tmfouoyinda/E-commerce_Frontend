import { createContext, useState, useContext, useEffect } from 'react';
import axios from '../API/axios';


const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    const login = async (email, password) => {
        try {
            const response = await axios.post('/login', { email, password });
            const { token } = response.data;

            setToken(token);
            localStorage.setItem('token', token);

            // Récupérer l'utilisateur connecté après connexion
            const userResponse = await axios.get('/user');
            setUser(userResponse.data);
            setLoading(false);
            return userResponse.data; // Retourner l'utilisateur connecté
        } catch (error) {
            console.error('Login failed:', error);
            setLoading(false);

            const message =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                'Erreur de connexion';

            throw new Error(message, { cause: error });
        }
    };

    const register = async (name, email, password, passwordConfirmation) => {
        try {
            const response = await axios.post('/register', { name, email, password, password_confirmation: passwordConfirmation });
            const { token } = response.data;

            setToken(token);
            localStorage.setItem('token', token);

            // Récupérer l'utilisateur connecté après inscription
            const userResponse = await axios.get('/user');
            setUser(userResponse.data);
            setLoading(false);
        } catch (error) {
            console.error('Registration failed:', error);
            setLoading(false);

            const message =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                'Erreur lors de l\'inscription';

            throw new Error(message, { cause: error });
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
    };

    const fetchUser = async () => {
        try {
            const response = await axios.get('/user');
            setUser(response.data);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch user:', error);
            return null;
        }
    };

    // Charger l'utilisateur automatiquement si un token existe au démarrage
    useEffect(() => {
        const initAuth = async () => {
            if (token) {
                await fetchUser();
            }
            setLoading(false);
        };
        initAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{ user, token, loading, setUser, setToken, login, register, logout, fetchUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export default AuthContext;