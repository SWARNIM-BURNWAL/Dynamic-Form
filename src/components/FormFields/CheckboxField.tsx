import { FormFieldProps } from "@/types";

export const CheckboxField = ({
  field,
  value,
  error,
  onChange,
  onBlur,
}: FormFieldProps) => {
  // Handle multiple checkboxes (array of values) or single checkbox (boolean)
  const isMultiple = field.options && field.options.length > 0;

  if (isMultiple) {
    const selectedValues = Array.isArray(value) ? value : [];

    const handleCheckboxChange = (optionValue: string) => {
      const newSelectedValues = [...selectedValues];

      if (newSelectedValues.includes(optionValue)) {
        // Remove if already selected
        const index = newSelectedValues.indexOf(optionValue);
        newSelectedValues.splice(index, 1);
      } else {
        // Add if not selected
        newSelectedValues.push(optionValue);
      }

      onChange(newSelectedValues);
    };

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
                  type="checkbox"
                  id={`${field.fieldId}-${option.value}`}
                  name={field.fieldId}
                  value={option.value}
                  checked={selectedValues.includes(option.value)}
                  onChange={() => handleCheckboxChange(option.value)}
                  onBlur={onBlur}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
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
  } else {
    // Single checkbox (boolean value)
    return (
      <div className="mb-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id={field.fieldId}
            checked={Boolean(value)}
            onChange={(e) => onChange(e.target.checked)}
            onBlur={onBlur}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            required={field.required}
            data-testid={field.dataTestId}
          />
          <label
            htmlFor={field.fieldId}
            className="ml-2 block text-sm text-gray-700"
          >
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
};
