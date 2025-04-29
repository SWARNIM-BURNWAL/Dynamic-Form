import { FormFieldProps } from '../../types';

const TextareaField = ({ field, value, error, onChange, onBlur }: FormFieldProps) => {
  return (
    <div className="mb-4">
      <label htmlFor={field.fieldId} className="block text-gray-700 font-medium mb-2">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        id={field.fieldId}
        value={value as string}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={field.placeholder}
        className={`w-full px-3 py-2 border rounded-md ${
          error ? 'border-red-500' : 'border-gray-300'
        } focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[100px]`}
        required={field.required}
        maxLength={field.maxLength}
        minLength={field.minLength}
        data-testid={field.dataTestId}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default TextareaField;