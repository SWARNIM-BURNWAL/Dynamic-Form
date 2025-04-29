import { FormFieldProps } from "@/types";

const DropdownField = ({
  field,
  value,
  error,
  onChange,
  onBlur,
}: FormFieldProps) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={field.fieldId}
        className="block text-gray-700 font-medium mb-2"
      >
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        id={field.fieldId}
        value={value as string}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={`w-full px-3 py-2 border rounded-md ${
          error ? "border-red-500" : "border-gray-300"
        } focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white`}
        required={field.required}
        data-testid={field.dataTestId}
      >
        <option value="">Select an option</option>
        {field.options?.map((option) => (
          <option
            key={option.value}
            value={option.value}
            data-testid={option.dataTestId}
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default DropdownField;
