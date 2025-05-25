// src/components/pages/ProfileSettingsPage.jsx
import React, { useState, useEffect } from 'react';
import { Home, UserCircle as ProfileIcon, Lock, ShoppingCart, Bot as BotIcon, Settings, LogOut, Repeat, Bot } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import FadeInOnScroll from '../common/FadeInOnScroll';

// Importar los componentes de cada sección del perfil
import PersonalInformationForm from './profile/PersonalInformation';
import PasswordChangeForm from './profile/PasswordChange';
import OrdersSection from './profile/OrdersSection';
import BotsManagementSection from './profile/BotsManagementSection';
import DangerZoneSection from './profile/DangerZone';
import MySubscriptionsSection from './profile/SubscriptionsSection';
import BotConfigurationPage from './profile/bot/BotConfigurationPage';

const ProfileSettingsPage = ({ currentUser, onUpdateProfile, onDeleteAccount, onLogout }) => {
    const navigate = useNavigate();
    const location = useLocation(); // location.pathname estará disponible aquí

    // Estados para los formularios
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    // Estados para la UI
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState('');
    const [saveError, setSaveError] = useState('');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        if (currentUser) {
            setName(currentUser.name || '');
            setEmail(currentUser.email || '');
            setPhotoUrl(currentUser.photo || '');
        }
    }, [currentUser]);

    // --- Funciones Handler (sin cambios respecto a tu última versión funcional) ---
    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setIsSaving(true); setSaveSuccess(''); setSaveError('');
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            onUpdateProfile({ name, email, photo: photoUrl });
            setSaveSuccess("Profile updated successfully!");
            setTimeout(() => setSaveSuccess(''), 3000);
        } catch (error) {
            setSaveError("Failed to update profile.");
            setTimeout(() => setSaveError(''), 5000);
        } finally {
            setIsSaving(false);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setIsSaving(true); setSaveSuccess(''); setSaveError('');
        if (newPassword !== confirmNewPassword) {
            setSaveError("New password and confirmation do not match.");
            setIsSaving(false); setTimeout(() => setSaveError(''), 5000); return;
        }
        if (!currentPassword || !newPassword) {
            setSaveError("All password fields are required.");
            setIsSaving(false); setTimeout(() => setSaveError(''), 5000); return;
        }
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSaveSuccess("Password changed successfully!");
            setCurrentPassword(''); setNewPassword(''); setConfirmNewPassword('');
            setTimeout(() => setSaveSuccess(''), 3000);
        } catch (error) {
            setSaveError("Failed to change password.");
            setTimeout(() => setSaveError(''), 5000);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteAccount = async () => {
        setIsSaving(true); setSaveError('');
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            onDeleteAccount();
        } catch (error) {
            setSaveError("Failed to delete account.");
            setTimeout(() => setSaveError(''), 5000);
            setIsSaving(false);
        }
        setShowDeleteConfirm(false);
    };

    const getProfileImageSrc = () => {
        if (photoUrl && photoUrl.startsWith('data:image')) { return photoUrl; }
        if (currentUser?.photo) { return currentUser.photo; }
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'User')}&background=0D8ABC&color=fff&size=128`;
    };
    // --- Fin Funciones Handler ---

    const sidebarNavItems = [
        { name: 'Profile', path: '/profile', icon: ProfileIcon },
        { name: 'Password', path: '/profile/password', icon: Lock },
        { name: 'My Orders', path: '/profile/orders', icon: ShoppingCart },
        { name: 'My Bots', path: '/profile/bots', icon: Bot }, // Usar BotIconLucide si renombraste
        { name: 'My Subscriptions', path: '/profile/subscriptions', icon: Repeat }, // YA DEBERÍA ESTAR ASÍ
        { name: 'Account Settings', path: '/profile/settings', icon: Settings },
      ];

    const mainSectionsConfig = [
        { path: '/profile', component: PersonalInformationForm, props: { name, email, photoUrl, setName, setEmail, setPhotoUrl, handleProfileUpdate, getProfileImageSrc, isSaving, saveSuccess, saveError } },
        { path: '/profile/password', component: PasswordChangeForm, props: { currentPassword, newPassword, confirmNewPassword, setCurrentPassword, setNewPassword, setConfirmNewPassword, handlePasswordChange, isSaving, saveSuccess, saveError } },
        { path: '/profile/orders', component: OrdersSection, props: {} },
        { path: '/profile/bots', component: BotsManagementSection, props: {} },
        { path: '/profile/settings', component: DangerZoneSection, props: { showDeleteConfirm, setShowDeleteConfirm, handleDeleteAccount, isSaving, saveSuccess, saveError } },
        { path: '/profile/subscriptions', component: MySubscriptionsSection, props: {} }, // YA DEBERÍA ESTAR ASÍ

    ];

    const renderMainContent = () => {
        const normalizedCurrentPath = location.pathname.length > 1 && location.pathname.endsWith('/')
            ? location.pathname.slice(0, -1)
            : location.pathname;

        let sectionToRender = mainSectionsConfig.find(section => section.path === normalizedCurrentPath);

        if (!sectionToRender && (normalizedCurrentPath === '/profile' || normalizedCurrentPath === '/profile/')) {
            sectionToRender = mainSectionsConfig.find(section => section.path === '/profile');
        }

        if (sectionToRender) {
            const ComponentToRender = sectionToRender.component;
            return <ComponentToRender {...sectionToRender.props} currentUser={currentUser} />;
        }

        if (normalizedCurrentPath.startsWith('/profile/')) {
            return <p className="text-center text-gray-500 dark:text-gray-400 mt-10 text-lg">Section not found. Please select a valid option from the menu.</p>;
        }
        return null;
    };

    const displayName = currentUser?.name || 'User';

    // Variable para el path actual normalizado, accesible en el map de la sidebar
    const normalizedLocationPath = location.pathname.length > 1 && location.pathname.endsWith('/')
        ? location.pathname.slice(0, -1)
        : location.pathname;

    return (
        <section className="min-h-screen py-20 md:pt-32 md:pb-16 bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 font-sans">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden min-h-[calc(100vh-200px)] md:min-h-[calc(100vh-180px)]">
                    <FadeInOnScroll className="w-full md:w-72 bg-gray-50 dark:bg-gray-800/60 border-r border-gray-200 dark:border-gray-700/50 flex flex-col justify-between">
                        <div>
                            <div className="p-6 pt-8">
                                <div className="flex items-center space-x-3.5 mb-8">
                                    {currentUser?.photo || photoUrl ? (
                                        <img src={getProfileImageSrc()} alt={displayName} className="w-12 h-12 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600 shadow-sm" />
                                    ) : (
                                        <ProfileIcon size={48} className="text-gray-400 dark:text-gray-500 flex-shrink-0" />
                                    )}
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Welcome,</p>
                                        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 truncate" title={displayName}>
                                            {displayName} {/* El nombre se muestra directamente, asumiendo que ya está bien en currentUser.name */}
                                        </h1>
                                    </div>
                                </div>
                                <nav className="space-y-1.5">
                                    {sidebarNavItems.map((item) => {
                                        const itemBasePath = item.path.replace(/\/$/, '');
                                        let isActive = normalizedLocationPath === itemBasePath;

                                        // Lógica especial para que "/profile" se mantenga activo para subrutas no especificadas
                                        // como /profile/ o /profile/alguna-subruta-no-definida-explícitamente
                                        if (item.path === '/profile') {
                                            if (normalizedLocationPath === '/profile' ||
                                                (normalizedLocationPath.startsWith('/profile/') &&
                                                    !mainSectionsConfig.some(s => s.path === normalizedLocationPath && s.path !== '/profile'))) {
                                                isActive = true;
                                            }
                                        }

                                        return (
                                            <Link
                                                key={item.name}
                                                to={item.path}
                                                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 text-sm font-medium
                                                        ${isActive
                                                        ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                                                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200/70 dark:hover:bg-gray-700/70'
                                                    }`}
                                            >
                                                <item.icon size={18} className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`} />
                                                <span>{item.name}</span>
                                            </Link>
                                        )
                                    })}
                                </nav>
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-200 dark:border-gray-700/50">
                            <button
                                onClick={() => onLogout(navigate)}
                                className="flex w-full items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-red-500/10 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200 group"
                            >
                                <LogOut size={18} className="group-hover:text-red-500 dark:group-hover:text-red-400" />
                                <span>Log Out</span>
                            </button>
                        </div>
                    </FadeInOnScroll>

                    <div className="flex-1 p-6 sm:p-8 md:p-10 h-full overflow-y-auto custom-scrollbar" style={{ maxHeight: 'calc(100vh - 180px)' }}>
                        {renderMainContent()}
                    </div>
                </div>

                <FadeInOnScroll delay={400}>
                    <div className="text-center mt-16">
                        <button
                            onClick={() => navigate('/')}
                            className="inline-flex items-center bg-gray-900 text-white px-8 py-3.5 rounded-full text-md font-semibold hover:bg-gray-700 transition duration-300 shadow-lg hover:scale-105 transform dark:bg-gray-700 dark:hover:bg-gray-600"
                        >
                            <Home className="mr-2" size={18} /> Back to Home
                        </button>
                    </div>
                </FadeInOnScroll>
            </div>
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 10px; } /* gray-300 */
                .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #4b5563; } /* gray-600 */
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #9ca3af; } /* gray-400 */
                .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #6b7280; } /* gray-500 */

                @keyframes fadeInAnimation {
                    0% { opacity: 0; transform: translateY(8px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fadeInAnimation 0.3s ease-out forwards;
                }
            `}</style>
        </section>
    );
};

export default ProfileSettingsPage;