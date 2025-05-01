import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';

export const useAxiosAuthInterceptor = () => {
  const router = useRouter();

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      res => res,
      err => {
        if (err.response?.status === 401) {
          router.push('/login');
        }
        return Promise.reject(err);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [router]);
};