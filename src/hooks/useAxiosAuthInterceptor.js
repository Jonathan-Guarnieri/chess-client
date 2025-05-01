import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/apiClient';

export const useAxiosAuthInterceptor = () => {
  const router = useRouter();

  useEffect(() => {
    const interceptor = apiClient.interceptors.response.use(
      res => res,
      err => {
        if (err.response?.status === 401) {
          router.push('/login');
        }
        return Promise.reject(err);
      }
    );

    return () => {
      apiClient.interceptors.response.eject(interceptor);
    };
  }, [router]);
};