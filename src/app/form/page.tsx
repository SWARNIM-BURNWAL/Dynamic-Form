'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DynamicForm from '../../components/Dynamicform';

export default function FormPage() {
  const router = useRouter();

  // Check if user is logged in
  useEffect(() => {
    const userData = sessionStorage.getItem('userData');
    if (!userData) {
      router.push('/');
    }
  }, [router]);

  return (
    <div className="max-w-4xl mx-auto">
      <DynamicForm />
    </div>
  );
}