// User Types
export interface User {
  rollNumber: string;
  name: string;
}

// Form Types
export interface FormResponse {
  message: string;
  form: {
    formTitle: string;
    formId: string;
    version: string;
    sections: FormSection[];
  };
}

export interface FormSection {
  sectionId: number;
  title: string;
  description: string;
  fields: FormField[];
}

export interface FormField {
  fieldId: string;
  type: "text" | "tel" | "email" | "textarea" | "date" | "dropdown" | "radio" | "checkbox";
  label: string;
  placeholder?: string;
  required: boolean;
  dataTestId: string;
  validation?: {
    message: string;
  };
  options?: Array<{
    value: string;
    label: string;
    dataTestId?: string;
  }>;
  maxLength?: number;
  minLength?: number;
}

export interface FormValues {
  [key: string]: string | string[] | boolean;
}

export interface FieldErrors {
  [key: string]: string;
}

export interface FormSectionProps {
  section: FormSection;
  values: FormValues;
  errors: FieldErrors;
  onChange: (fieldId: string, value: string | string[] | boolean) => void;
  onBlur: (fieldId: string) => void;
}

export interface FormFieldProps {
  field: FormField;
  value: string | string[] | boolean;
  error?: string;
  onChange: (value: string | string[] | boolean) => void;
  onBlur: () => void;
}