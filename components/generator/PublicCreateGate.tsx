'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import GeneratorForm from './GeneratorForm';
import Toast from '@/components/Toast';

// Logged-in visitors always get the real dashboard shell — send them there
// instead of rendering the public-page version of the same form.
export default function PublicCreateGate() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard/create');
    }
  }, [user, loading, router]);

  if (loading || user) return null;

  return (
    <>
      <GeneratorForm />
      <Toast />
    </>
  );
}
