import { FormFieldProps } from "@/types";

const RadioField = ({
  field,
  value,
  error,
  onChange,
  onBlur,
}: FormFieldProps) => {
  return (
    <div className="mb-4">
      <fieldset>
        <legend className="block text-gray-700 font-medium mb-2">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </legend>
        <div className="space-y-2">
          {field.options?.map((option) => (
            <div key={option.value} className="flex items-center">
              <input
                type="radio"
                id={`${field.fieldId}-${option.value}`}
                name={field.fieldId}
                value={option.value}
                checked={value === option.value}
                onChange={() => onChange(option.value)}
                onBlur={onBlur}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                required={field.required}
                data-testid={
                  option.dataTestId || `${field.dataTestId}-${option.value}`
                }
              />
              <label
                htmlFor={`${field.fieldId}-${option.value}`}
                className="ml-2 block text-sm text-gray-700"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </fieldset>
    </div>
  );
};

export default RadioField;
