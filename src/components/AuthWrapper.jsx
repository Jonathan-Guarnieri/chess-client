
'use client';

import { useAxiosAuthInterceptor } from '@/hooks/useAxiosAuthInterceptor';

export default function AuthWrapper() {
  useAxiosAuthInterceptor();
  return null; // Don't render anything
}