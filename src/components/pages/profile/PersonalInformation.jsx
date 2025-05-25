import React from 'react';
import { User, Mail, Image, Save, XCircle, CheckCircle } from 'lucide-react';
import FadeInOnScroll from '../../common/FadeInOnScroll';
const PersonalInformationForm = ({
    currentUser,
    name,
    email,
    photoUrl,
    setName,
    setEmail,
    setPhotoUrl,
    handleProfileUpdate,
    getProfileImageSrc,
    isSaving,
    saveSuccess,
    saveError
}) => {
    return (
        <FadeInOnScroll delay={100} className="w-full">
            <div className="p-0 rounded-2xl h-full">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
                    Personal Information
                </h2>
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="flex flex-col items-center mb-6">
                        <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-gray-200 dark:border-gray-700 shadow-md">
                            <img
                                src={getProfileImageSrc()}
                                alt="Profile"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'User')}&background=0D8ABC&color=fff`;
                                }}
                            />
                            <input
                                type="file"
                                id="profilePhotoUpload"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setPhotoUrl(reader.result);
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                                accept="image/*"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                                <Image size={30} className="text-white" />
                            </div>
                        </div>
                        <label htmlFor="profilePhotoUpload" className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
                            Change Profile Photo
                        </label>
                    </div>

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                            <User size={18} className="mr-2 text-gray-500 dark:text-gray-400" /> Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-base"
                            placeholder="Your Full Name"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                            <Mail size={18} className="mr-2 text-gray-500 dark:text-gray-400" /> Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-base"
                            placeholder="your.email@example.com"
                            disabled // Email usually cannot be changed directly
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg transform hover:-translate-y-0.5
                        ${isSaving
                                ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600'
                            }`}
                        disabled={isSaving}
                    >
                        {isSaving ? (
                            <svg className="animate-spin h-5 w-5 text-white mr-3" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <Save size={20} className="mr-2" />
                        )}
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                    {saveSuccess && (
                        <div className="flex items-center justify-center text-green-600 dark:text-green-400 mt-4 animate-fade-in">
                            <CheckCircle size={20} className="mr-2" /> Profile updated successfully!
                        </div>
                    )}
                    {saveError && (
                        <div className="flex items-center justify-center text-red-600 dark:text-red-400 mt-4 animate-fade-in">
                            <XCircle size={20} className="mr-2" /> {saveError}
                        </div>
                    )}
                </form>
            </div>
        </FadeInOnScroll>
    );
};

export default PersonalInformationForm;
