'use client';

import { useAxiosAuthInterceptor } from '@/hooks/useAxiosAuthInterceptor';
import { useEffect, useState, useContext, createContext } from 'react';
import apiClient from '@/lib/apiClient';
import LoadingPage from '@/components/LoadingPage';

export const AuthContext = createContext(null);

export default function AuthWrapper({ children }) {
  useAxiosAuthInterceptor();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiClient.get('/me');
        setUser(response.data);
      } catch (err) {
        if (err?.response?.status !== 401) {
          console.error('[AuthWrapper] Failed to verify session via /me:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <LoadingPage />;

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}