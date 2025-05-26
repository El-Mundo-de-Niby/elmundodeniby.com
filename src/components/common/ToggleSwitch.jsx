const ToggleSwitch = ({ label, name, checked, onChange, description }) => (
    <div className="mb-6">
        <div className="flex items-center justify-between">
            <div>
                <label htmlFor={name} className="block text-sm font-bold text-gray-700 dark:text-gray-300">{label}</label>
                {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
            </div>
            <button
                type="button"
                id={name}
                name={name}
                onClick={() => onChange({ target: { name, type: 'checkbox', checked: !checked } })}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-blue-500 ${checked ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}
            >
                <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
        </div>
    </div>
);

export default ToggleSwitch;