// src/components/utils/auth.jsx

// Función para manejar el inicio de sesión exitoso
export const handleSuccessfulLogin = (setIsLoggedIn, setCurrentUser, userData) => {
    // Asumimos que userData.name ya viene en el formato correcto (UTF-8)
    // y no necesita normalización aquí para el estado o localStorage.
    setIsLoggedIn(true);
    setCurrentUser(userData);
    localStorage.setItem('userLoggedIn', 'true');
    localStorage.setItem('userData', JSON.stringify(userData));
    console.log('User logged in (auth.jsx - name original):', userData);
};

// Función para manejar el cierre de sesión
export const handleLogout = (setIsLoggedIn, setCurrentUser, navigate) => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userData');
    navigate('/'); // Redirigir a la página de inicio después de cerrar sesión es correcto aquí
    console.log('User logged out.');
};

// Función para verificar el estado de inicio de sesión al cargar la app
export const checkLoginStatus = (setIsLoggedIn, setCurrentUser) => {
    const loggedIn = localStorage.getItem('userLoggedIn');
    const storedUserData = localStorage.getItem('userData');
    if (loggedIn === 'true' && storedUserData) {
        try {
            const parsedUserData = JSON.parse(storedUserData);
            console.log('User data loaded from localStorage (auth.jsx):', parsedUserData);
            setIsLoggedIn(true);
            setCurrentUser(parsedUserData);
        } catch (e) {
            console.error("Error parsing user data from localStorage:", e);
            localStorage.removeItem('userLoggedIn');
            localStorage.removeItem('userData');
        }
    }
};

// Inicio de sesión tradicional
// El parámetro 'navigate' se elimina de aquí si la navegación final la hace App.jsx
export const performLogin = (email, password, onLoginSuccessCallback) => {
    console.log('Logging in with:', { email, password });
    // alert('Login functionality is for demonstration. Integrate your backend here.');

    const userData = {
        name: 'Diego Rodríguez', // Nombre original con tilde
        email: email,
        photo: `https://ui-avatars.com/api/?name=${encodeURIComponent('Diego Rodríguez')}&background=0D8ABC&color=fff`
    };
    console.log('auth.jsx - performLogin: Calling onLoginSuccessCallback with:', userData);
    onLoginSuccessCallback(userData); // Este callback es (userData, from) => onLoginSuccess(userData, from) en App.jsx
    // ELIMINADO: navigate('/');
    return true;
};

// Registro tradicional
// El parámetro 'navigate' se elimina de aquí
export const performRegister = (name, email, password, confirmPassword, onRegisterSuccessCallback) => {
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return false;
    }
    console.log('Registering with:', { name, email, password });
    // alert('Registration functionality is for demonstration. Integrate your backend here.');
    const userData = {
        name: name,
        email: email,
        photo: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff`
    };
    onRegisterSuccessCallback(userData);
    // ELIMINADO: navigate('/');
    return true;
};

// Éxito del login/registro con Google
// El parámetro 'navigate' se elimina de aquí
export const handleGoogleAuthSuccess = (credentialResponse, onAuthSuccessCallback) => {
    let decodedToken;
    try {
        decodedToken = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
    } catch (e) {
        console.error("Error decoding Google token", e);
        handleGoogleAuthError();
        return;
    }

    const userData = {
        name: decodedToken.name || 'Google User',
        email: decodedToken.email,
        photo: decodedToken.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(decodedToken.name || 'G')}&background=0D8ABC&color=fff`
    };
    console.log('auth.jsx - handleGoogleAuthSuccess: Calling onAuthSuccessCallback with:', userData);
    onAuthSuccessCallback(userData);
    // ELIMINADO: navigate('/'); 
};

// Error de login/registro con Google
export const handleGoogleAuthError = () => {
    console.error('Google authentication failed');
    alert('Google Authentication Failed. Please try again.');
};