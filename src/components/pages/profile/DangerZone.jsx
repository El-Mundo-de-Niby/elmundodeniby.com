import React from 'react';
import { XCircle, CheckCircle } from 'lucide-react';
import FadeInOnScroll from '../../common/FadeInOnScroll'; // Adjust path as needed

const DangerZoneSection = ({
    showDeleteConfirm,
    setShowDeleteConfirm,
    handleDeleteAccount,
    isSaving,
    saveSuccess, // Although not typically used here, kept for consistency
    saveError // Although not typically used here, kept for consistency
}) => {
    return (
        <FadeInOnScroll delay={300} className="w-full">
            <div className="bg-red-50 dark:bg-red-900/20 p-8 rounded-2xl shadow-xl border border-red-200 dark:border-red-700">
                <h2 className="text-2xl md:text-3xl font-bold text-red-800 dark:text-red-200 mb-8 border-b border-red-200 dark:border-red-700 pb-4">
                    Danger Zone
                </h2>
                <p className="text-red-700 dark:text-red-300 mb-6 leading-relaxed">
                    Proceed with caution. These actions are irreversible.
                </p>
                <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="inline-flex items-center justify-center bg-red-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition-colors duration-300 shadow-lg transform hover:-translate-y-0.5"
                >
                    Delete Account
                </button>

                {showDeleteConfirm && (
                    <div className="mt-8 p-6 bg-red-100 dark:bg-red-800 rounded-xl border border-red-300 dark:border-red-700 animate-fade-in">
                        <p className="text-red-800 dark:text-red-100 mb-4 font-medium">
                            Are you absolutely sure you want to delete your account? This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="px-5 py-2 rounded-full text-red-700 dark:text-red-200 bg-red-200 dark:bg-red-700 hover:bg-red-300 dark:hover:bg-red-600 transition-colors duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteAccount}
                                className={`px-5 py-2 rounded-full text-white bg-red-600 hover:bg-red-700 transition-colors duration-200
                                ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
                                disabled={isSaving}
                            >
                                {isSaving ? 'Deleting...' : 'Confirm Delete'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </FadeInOnScroll>
    );
};

export default DangerZoneSection;
