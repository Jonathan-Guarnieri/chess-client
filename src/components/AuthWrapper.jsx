'use client';

import { useAxiosAuthInterceptor } from '@/hooks/useAxiosAuthInterceptor';
import { useEffect, useState } from 'react';
import apiClient from '@/lib/apiClient';
import LoadingPage from '@/components/LoadingPage';

export default function AuthWrapper({ children }) {
  useAxiosAuthInterceptor();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await apiClient.get('/me');
      } catch (err) {
        console.error('[AuthWrapper] Failed to verify session via /me:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <LoadingPage />;

  return <>{children}</>;
}