import { FormSectionProps } from '@/types';
import FormField from './FormField';

const FormSection = ({ section, values, errors, onChange, onBlur }: FormSectionProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
      {section.description && (
        <p className="text-gray-600 mb-4">{section.description}</p>
      )}
      
      <div className="space-y-4">
        {section.fields.map((field) => (
          <FormField
            key={field.fieldId}
            field={field}
            value={values[field.fieldId] || (field.type === 'checkbox' && !field.options ? false : '')}
            error={errors[field.fieldId]}
            onChange={(value) => onChange(field.fieldId, value)}
            onBlur={() => onBlur(field.fieldId)}
          />
        ))}
      </div>
    </div>
  );
};

export default FormSection;