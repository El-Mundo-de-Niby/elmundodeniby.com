// File: components/pages/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { Home } from 'lucide-react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import FadeInOnScroll from '../common/FadeInOnScroll';
import { performLogin, handleGoogleAuthSuccess, handleGoogleAuthError } from '../utils/auth'; // Importa las funciones de auth
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

// ASEGÚRATE DE QUE onLoginSuccess SE RECIBE COMO PROP AQUÍ
const LoginPage = ({ onLoginSuccess }) => { 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Inicializa useNavigate

    // Handle traditional login submission
    const handleLogin = (e) => {
        e.preventDefault();
        // Llama a performLogin y le pasa la función navigate
        performLogin(email, password, onLoginSuccess, navigate);
    };

    // Handle Google login success
    const handleGoogleSuccess = (credentialResponse) => {
        // Llama a handleGoogleAuthSuccess y le pasa la función navigate
        handleGoogleAuthSuccess(credentialResponse, onLoginSuccess, navigate);
    };

    // Handle Google login error
    const handleGoogleError = () => {
        handleGoogleAuthError();
    };


    return (
        <GoogleOAuthProvider clientId="1040413869502-2a110q968f8c3o989d01u9sk2hencjpf.apps.googleusercontent.com">
            <section className="min-h-screen flex items-center justify-center py-24 md:py-32 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
                <div className="container mx-auto px-4 max-w-md">
                    <FadeInOnScroll>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-8 leading-tight">
                            Welcome Back!
                        </h1>
                    </FadeInOnScroll>

                    <FadeInOnScroll delay={100}>
                        <p className="text-md md:text-lg text-gray-700 dark:text-gray-300 text-center mb-8 leading-relaxed">
                            Log in to access your dashboard and manage your projects.
                        </p>
                    </FadeInOnScroll>

                    <FadeInOnScroll delay={200}>
                        <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
                            <form onSubmit={handleLogin} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors duration-200 text-sm"
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
                                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors duration-200 text-sm"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full inline-flex items-center justify-center bg-gray-900 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-700 transition duration-300 shadow-lg hover:scale-105 transform dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-blue-800"
                                >
                                    Log In
                                </button>
                            </form>

                            <div className="flex items-center justify-center my-6">
                                <span className="text-gray-500 dark:text-gray-400">OR</span>
                            </div>

                            <div className="flex justify-center mb-0">
                                <GoogleLogin
                                    onSuccess={handleGoogleSuccess}
                                    onError={handleGoogleError}
                                    theme="filled_blue"
                                    size="large"
                                    text="signin_with"
                                />
                            </div>

                            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
                                Don't have an account? <span onClick={() => navigate('/register')} className="text-gray-900 dark:text-gray-100 font-medium hover:underline cursor-pointer">Sign up</span>
                            </p>
                        </div>
                    </FadeInOnScroll>

                    <FadeInOnScroll delay={300}>
                        <div className="text-center mt-10">
                            <button
                                onClick={() => navigate('/')} // Usa navigate para ir a la ruta raíz
                                className="inline-flex items-center bg-gray-900 text-white px-6 py-3 rounded-full text-md font-semibold hover:bg-gray-700 transition duration-300 shadow-lg hover:scale-105 transform dark:bg-gray-700 dark:hover:bg-gray-600"
                            >
                                Back to Home <Home className="ml-2" size={18} />
                            </button>
                        </div>
                    </FadeInOnScroll>
                </div>
            </section>
        </GoogleOAuthProvider>
    );
};

export default LoginPage;