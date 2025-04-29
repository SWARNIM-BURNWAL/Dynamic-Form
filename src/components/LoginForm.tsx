'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUser } from '../services/api';
import { User } from '../types';

const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<User>({
    rollNumber: '',
    name: '',
  });
  const [errors, setErrors] = useState<{ rollNumber?: string; name?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    // Clear API error when user types
    if (apiError) {
      setApiError(null);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { rollNumber?: string; name?: string } = {};
    
    if (!formData.rollNumber.trim()) {
      newErrors.rollNumber = 'Roll Number is required';
    }
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setApiError(null);
    
    try {
      const result = await createUser(formData);
      
      if (result) {
        // Store user data in sessionStorage for use in form page
        sessionStorage.setItem('userData', JSON.stringify(formData));
        // Navigate to form page
        router.push('/form');
      } else {
        setApiError(result);
      }
    } catch (error) {
      setApiError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Student Login</h2>
      
      {apiError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {apiError}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="rollNumber" className="block text-gray-700 font-medium mb-2">
            Roll Number
          </label>
          <input
            type="text"
            id="rollNumber"
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.rollNumber ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-1 focus:ring-blue-500`}
            placeholder="Enter your roll number"
            data-testid="roll-number-input"
          />
          {errors.rollNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.rollNumber}</p>
          )}
        </div>
        
        <div className="mb-6">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-1 focus:ring-blue-500`}
            placeholder="Enter your name"
            data-testid="name-input"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed"
          data-testid="login-button"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;