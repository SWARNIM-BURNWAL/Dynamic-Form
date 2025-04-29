'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getForm } from '../services/api';
import FormSection from './FormSection';
import { FormResponse, FormSection as FormSectionType, FormValues, FieldErrors, FormField } from '../types';

const DynamicForm = () => {
  const router = useRouter();
  
  // Form state
  const [form, setForm] = useState<FormResponse['form'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Form values & validation
  const [values, setValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<FieldErrors>({});
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Check if user is logged in
  useEffect(() => {
    const userData = sessionStorage.getItem('userData');
    
    if (!userData) {
      // Redirect to login if no user data
      router.push('/');
      return;
    }
    
    const { rollNumber } = JSON.parse(userData);
    
    // Fetch form structure
    const fetchForm = async () => {
      try {
        setLoading(true);
        const formData = await getForm(rollNumber);
        setForm(formData.form);
      } catch (err) {
        setError('Failed to load form. Please try again.');
        console.error('Error fetching form:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchForm();
  }, [router]);
  
  // Handle field change
  const handleFieldChange = (fieldId: string, value: string | string[] | boolean) => {
    setValues((prev) => ({ ...prev, [fieldId]: value }));
    
    // Clear error if exists
    if (errors[fieldId]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };
  
  // Validate a single field
  const validateField = (field: FormField): string | null => {
    const value = values[field.fieldId];
    
    // Required validation
    if (field.required && (value === undefined || value === '' || (Array.isArray(value) && value.length === 0))) {
      return field.validation?.message || 'This field is required';
    }
    
    // String validation for text-based fields
    if (typeof value === 'string' && value) {
      // Min length validation
      if (field.minLength && value.length < field.minLength) {
        return `Must be at least ${field.minLength} characters`;
      }
      
      // Max length validation
      if (field.maxLength && value.length > field.maxLength) {
        return `Cannot exceed ${field.maxLength} characters`;
      }
      
      // Email validation
      if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return 'Please enter a valid email address';
        }
      }
      
      // Phone validation for tel type
      if (field.type === 'tel' && value) {
        const phoneRegex = /^\+?[0-9\s\-()]{8,}$/;
        if (!phoneRegex.test(value)) {
          return 'Please enter a valid phone number';
        }
      }
    }
    
    return null;
  };
  
  // Handle field blur for validation
  const handleFieldBlur = (fieldId: string) => {
    const section = form?.sections[currentSectionIndex];
    if (!section) return;
    
    const field = section.fields.find((f) => f.fieldId === fieldId);
    if (!field) return;
    
    const errorMessage = validateField(field);
    
    if (errorMessage) {
      setErrors((prev) => ({ ...prev, [fieldId]: errorMessage }));
    }
  };
  
  // Validate current section
  const validateSection = (sectionIndex: number): boolean => {
    if (!form) return false;
    
    const section = form.sections[sectionIndex];
    const newErrors: FieldErrors = {};
    let isValid = true;
    
    section.fields.forEach((field) => {
      const errorMessage = validateField(field);
      if (errorMessage) {
        newErrors[field.fieldId] = errorMessage;
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    return isValid;
  };
  
  // Navigation handlers
  const handleNext = () => {
    if (!form) return;
    
    const isValid = validateSection(currentSectionIndex);
    
    if (isValid && currentSectionIndex < form.sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handlePrev = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Submit form
  const handleSubmit = () => {
    if (!form) return;
    
    const isValid = validateSection(currentSectionIndex);
    
    if (isValid) {
      setIsSubmitting(true);
      
      // Log form data to console as requested
      console.log('Form Data:', values);
      
      // Show success message
      alert('Form submitted successfully!');
      setIsSubmitting(false);
    }
  };
  
  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-2 text-gray-600">Loading form...</p>
        </div>
      </div>
    );
  }
  
  // Render error state
  if (error || !form) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>{error || 'Form could not be loaded. Please try again.'}</p>
        <button
          onClick={() => router.push('/')}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          Back to Login
        </button>
      </div>
    );
  }
  
  // Get current section
  const currentSection = form.sections[currentSectionIndex];
  const isLastSection = currentSectionIndex === form.sections.length - 1;
  
  return (
    <div className="max-w-3xl mx-auto">
      {/* Form header */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-2xl font-bold mb-2">{form.formTitle}</h1>
        <div className="flex justify-between text-sm text-gray-500">
          <span>Form ID: {form.formId}</span>
          <span>Version: {form.version}</span>
        </div>
      </div>
      
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">
            Section {currentSectionIndex + 1} of {form.sections.length}
          </span>
          <span className="text-sm font-medium">
            {Math.round(((currentSectionIndex + 1) / form.sections.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${((currentSectionIndex + 1) / form.sections.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Current section */}
      <FormSection
        section={currentSection}
        values={values}
        errors={errors}
        onChange={handleFieldChange}
        onBlur={handleFieldBlur}
      />
      
      {/* Navigation buttons */}
      <div className="flex justify-between mt-6">
        {currentSectionIndex > 0 ? (
          <button
            type="button"
            onClick={handlePrev}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-200"
            data-testid="prev-button"
          >
            Previous
          </button>
        ) : (
          <div></div> // Empty div for flex spacing
        )}
        
        {isLastSection ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-200 disabled:bg-green-300 disabled:cursor-not-allowed"
            data-testid="submit-button"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
            data-testid="next-button"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default DynamicForm;