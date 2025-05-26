// Componente para un campo de formulario genérico
const FormField = ({ label, name, children, description }) => (
    <div className="mb-6">
        <label htmlFor={name} className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">{label}</label>
        {children}
        {description && <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">{description}</p>}
    </div>
);

export default FormField;