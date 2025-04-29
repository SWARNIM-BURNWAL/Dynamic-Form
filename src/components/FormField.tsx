import { FormFieldProps } from '@/types';
import TextField from './FormFields/TextField';
import EmailField from './FormFields/EmailField';
import TelField from './FormFields/TelField';
import TextareaField from './FormFields/TextAreaField';
import DateField from './FormFields/DateField';
import DropdownField from './FormFields/DropdownField';
import RadioField from './FormFields/RadioField';
import {CheckboxField} from './FormFields/CheckboxField';

const FormField = ({ field, value, error, onChange, onBlur }: FormFieldProps) => {
  // Return the appropriate field component based on the field type
  switch (field.type) {
    case 'text':
      return (
        <TextField
          field={field}
          value={value}
          error={error}
          onChange={onChange}
          onBlur={onBlur}
        />
      );
    case 'email':
      return (
        <EmailField
          field={field}
          value={value}
          error={error}
          onChange={onChange}
          onBlur={onBlur}
        />
      );
    case 'tel':
      return (
        <TelField
          field={field}
          value={value}
          error={error}
          onChange={onChange}
          onBlur={onBlur}
        />
      );
    case 'textarea':
      return (
        <TextareaField
          field={field}
          value={value}
          error={error}
          onChange={onChange}
          onBlur={onBlur}
        />
      );
    case 'date':
      return (
        <DateField
          field={field}
          value={value}
          error={error}
          onChange={onChange}
          onBlur={onBlur}
        />
      );
    case 'dropdown':
      return (
        <DropdownField
          field={field}
          value={value}
          error={error}
          onChange={onChange}
          onBlur={onBlur}
        />
      );
    case 'radio':
      return (
        <RadioField
          field={field}
          value={value}
          error={error}
          onChange={onChange}
          onBlur={onBlur}
        />
      );
    case 'checkbox':
      return (
        <CheckboxField
          field={field}
          value={value}
          error={error}
          onChange={onChange}
          onBlur={onBlur}
        />
      );
    default:
      return null;
  }
};

export default FormField;