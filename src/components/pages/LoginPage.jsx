// src/components/pages/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { Home, AlertCircle } from 'lucide-react'; // Importar AlertCircle para el icono
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import FadeInOnScroll from '../common/FadeInOnScroll';
import { performLogin, handleGoogleAuthSuccess, handleGoogleAuthError } from '../utils/auth';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginPage = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";
    const [showLoginPrompt, setShowLoginPrompt] = useState(location.state?.promptLogin || false);

    // console.log('LoginPage: location object:', location);
    // console.log('LoginPage: Extracted "from" path:', from);
    // console.log('LoginPage: showLoginPrompt initial:', location.state?.promptLogin);

    // Efecto para limpiar el estado 'promptLogin' de la ubicación
    // después de que el mensaje se haya mostrado potencialmente.
    // Esto evita que el mensaje aparezca si el usuario navega manualmente a /login después.
    useEffect(() => {
        if (location.state?.promptLogin) {
            // Reemplaza el estado actual de la ubicación sin el flag promptLogin
            navigate(location.pathname, { state: { ...location.state, promptLogin: false }, replace: true });
        }
        // Este efecto solo debe correr si location.state.promptLogin cambia o al montar.
        // Si lo ponemos en el array de dependencias, puede causar un bucle si navigate actualiza location.
        // Por tanto, lo dejamos vacío para que se ejecute una vez y luego dependa del estado local.
    }, []); // Ejecutar solo una vez al montar para limpiar el estado de la navegación


    const handleLogin = (e) => {
        e.preventDefault();
        setShowLoginPrompt(false); // Ocultar mensaje al intentar loguear
        performLogin(email, password, (userData) => onLoginSuccess(userData, from));
    };

    const handleGoogleSuccess = (credentialResponse) => {
        setShowLoginPrompt(false); // Ocultar mensaje al intentar loguear
        handleGoogleAuthSuccess(credentialResponse, (userData) => onLoginSuccess(userData, from));
    };

    const handleGoogleError = () => {
        handleGoogleAuthError();
    };

    return (
        <GoogleOAuthProvider clientId="1040413869502-2a110q968f8c3o989d01u9sk2hencjpf.apps.googleusercontent.com">
            <section className="min-h-screen flex items-center justify-center py-24 md:py-32 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
                <div className="container mx-auto px-4 max-w-md">

                    {showLoginPrompt && (
                        <FadeInOnScroll>
                            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 dark:border-blue-400 text-blue-700 dark:text-blue-300 p-4 rounded-md shadow-md mb-8" role="alert">
                                <div className="flex">
                                    <div className="py-1"><AlertCircle className="h-6 w-6 text-blue-500 dark:text-blue-400 mr-3" /></div>
                                    <div>
                                        <p className="font-semibold">Please Log In</p>
                                        <p className="text-sm">You need to be logged in to access the previous page. Please log in to continue.</p>
                                    </div>
                                </div>
                            </div>
                        </FadeInOnScroll>
                    )}

                    <FadeInOnScroll delay={showLoginPrompt ? 100 : 0}>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-8 leading-tight">
                            Welcome Back!
                        </h1>
                    </FadeInOnScroll>

                    <FadeInOnScroll delay={showLoginPrompt ? 200 : 100}>
                        <p className="text-md md:text-lg text-gray-700 dark:text-gray-300 text-center mb-8 leading-relaxed">
                            Log in to access your dashboard and manage your projects.
                        </p>
                    </FadeInOnScroll>

                    <FadeInOnScroll delay={showLoginPrompt ? 300 : 200}>
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border dark:border-gray-700">
                            <form onSubmit={handleLogin} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-sm"
                                        placeholder="your.email@example.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-sm"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-lg hover:scale-105 transform dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                                >
                                    Log In
                                </button>
                            </form>

                            <div className="flex items-center justify-center my-6">
                                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">OR</span>
                            </div>

                            <div className="flex justify-center mb-0">
                                <GoogleLogin
                                    onSuccess={handleGoogleSuccess}
                                    onError={handleGoogleError}
                                    theme={document.documentElement.classList.contains('dark') ? "outline" : "filled_blue"} // Ajusta el tema de Google Login
                                    size="large"
                                    text="signin_with"
                                    shape="pill"
                                />
                            </div>

                            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
                                Don't have an account? <span onClick={() => navigate('/register')} className="text-blue-600 dark:text-blue-400 font-medium hover:underline cursor-pointer">Sign up</span>
                            </p>
                        </div>
                    </FadeInOnScroll>

                    <FadeInOnScroll delay={showLoginPrompt ? 400 : 300}>
                        <div className="text-center mt-10">
                            <button
                                onClick={() => navigate('/')}
                                className="inline-flex items-center bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-6 py-3 rounded-full text-md font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300 shadow-md hover:scale-105 transform"
                            >
                                <Home className="mr-2" size={18} /> Back to Home
                            </button>
                        </div>
                    </FadeInOnScroll>
                </div>
            </section>
        </GoogleOAuthProvider>
    );
};

export default LoginPage;