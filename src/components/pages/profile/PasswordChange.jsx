import React from 'react';
import { Lock, Save, XCircle, CheckCircle } from 'lucide-react';
import FadeInOnScroll from '../../common/FadeInOnScroll';

const PasswordChangeForm = ({
    currentPassword,
    newPassword,
    confirmNewPassword,
    setCurrentPassword,
    setNewPassword,
    setConfirmNewPassword,
    handlePasswordChange,
    isSaving,
    saveSuccess,
    saveError
}) => {
    return (
        <FadeInOnScroll delay={200} className="w-full">
            <div className="p-0 rounded-2xl h-full">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
                    Change Password
                </h2>
                <form onSubmit={handlePasswordChange} className="space-y-6">
                    <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                            <Lock size={18} className="mr-2 text-gray-500 dark:text-gray-400" /> Current Password
                        </label>
                        <input
                            type="password"
                            id="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-base"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                            <Lock size={18} className="mr-2 text-gray-500 dark:text-gray-400" /> New Password
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-base"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                            <Lock size={18} className="mr-2 text-gray-500 dark:text-gray-400" /> Confirm New Password
                        </label>
                        <input
                            type="password"
                            id="confirmNewPassword"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-base"
                            placeholder="••••••••"
                            required
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
                            <Lock size={20} className="mr-2" />
                        )}
                        {isSaving ? 'Changing...' : 'Change Password'}
                    </button>
                    {saveSuccess && (
                        <div className="flex items-center justify-center text-green-600 dark:text-green-400 mt-4 animate-fade-in">
                            <CheckCircle size={20} className="mr-2" /> Password changed successfully!
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

export default PasswordChangeForm;
