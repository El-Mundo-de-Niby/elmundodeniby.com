// src/components/utils/auth.jsx

// Función para manejar el inicio de sesión exitoso
export const handleSuccessfulLogin = (setIsLoggedIn, setCurrentUser, userData) => {
    setIsLoggedIn(true);
    setCurrentUser(userData);
    // Almacenar datos en localStorage para persistencia
    localStorage.setItem('userLoggedIn', 'true');
    localStorage.setItem('userData', JSON.stringify(userData));
    console.log('User logged in:', userData);
};

// Función para manejar el cierre de sesión
// Ahora acepta 'navigate' directamente
export const handleLogout = (setIsLoggedIn, setCurrentUser, navigate) => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userData');
    navigate('/'); // Redirigir a la página de inicio después de cerrar sesión usando navigate
    console.log('User logged out.');
};

// Función para verificar el estado de inicio de sesión al cargar la app
export const checkLoginStatus = (setIsLoggedIn, setCurrentUser) => {
    const loggedIn = localStorage.getItem('userLoggedIn');
    const userData = localStorage.getItem('userData');
    if (loggedIn === 'true' && userData) {
        setIsLoggedIn(true);
        setCurrentUser(JSON.parse(userData));
    }
};

// NUEVA FUNCIÓN: Manejar el inicio de sesión tradicional
// Ahora acepta 'navigate' directamente
export const performLogin = (email, password, onLoginSuccess, navigate) => {
    console.log('Logging in with:', { email, password });
    alert('Login functionality is for demonstration. Integrate your backend here.');

    // SIMULAR UN LOGIN EXITOSO CON DATOS DE USUARIO COMPLETOS Y LA TILDE
    const userData = {
        name: 'Diego Rodríguez', // <--- Nombre con tilde para probar
        email: email,
        photo: 'https://ui-avatars.com/api/?name=Diego+Rodriguez&background=0D8ABC&color=fff' // <--- URL de foto válida de prueba
    };
    onLoginSuccess(userData); // <--- **PASANDO userData A onLoginSuccess**
    navigate('/'); // Navegar a la home después de login exitoso
    return true; // Indicar que el login fue exitoso
};


// NUEVA FUNCIÓN: Manejar el registro tradicional
// Ahora acepta 'navigate' directamente
export const performRegister = (name, email, password, confirmPassword, onRegisterSuccess, navigate) => {
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return false; // Indicar que el registro falló por las contraseñas
    }

    console.log('Registering with:', { name, email, password });
    alert('Registration functionality is for demonstration. Integrate your backend here.');

    const userData = {
        name: name,
        email: email,
        photo: 'https://i.pravatar.cc/150?img=5'
    };
    onRegisterSuccess(userData);
    navigate('/'); // Navegar a la home después de registro exitoso
    return true; // Indicar que el registro fue exitoso
};


// NUEVA FUNCIÓN: Manejar el éxito del login/registro con Google
// Ahora acepta 'navigate' directamente
export const handleGoogleAuthSuccess = (credentialResponse, onAuthSuccess, navigate) => {
    console.log('Google authentication successful:', credentialResponse);
    const decodedToken = JSON.parse(atob(credentialResponse.credential.split('.')[1]));

    const userData = {
        name: decodedToken.name || 'Google User',
        email: decodedToken.email,
        photo: decodedToken.picture || `https://ui-avatars.com/api/?name=${decodedToken.name}&background=0D8ABC&color=fff`
    };
    onAuthSuccess(userData);
    navigate('/'); // Navegar a la home después de autenticación Google exitosa
};

// NUEVA FUNCIÓN: Manejar el error de login/registro con Google
export const handleGoogleAuthError = () => {
    console.error('Google authentication failed');
    alert('Google Authentication Failed. Please try again.');
};