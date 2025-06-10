'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/apiClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiClient.post(
        '/login',
        {
          "user": {
            "email": email,
            "password": password
          }
        }
      );

      router.push('/');
    } catch (error) {
      if (error.response?.status === 401) {
        setLoginError(true);
        return;
      }

      console.error('Login error:', error);
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-800 w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-120 border-1 border-black shadow-2xl p-8 bg-gray-900 rounded-lg">

        <h1 className="text-3xl font-bold"> Login </h1>

        {loginError && (
          <span className="text-red-500 font-semibold">Invalid email or password.</span>
        )}

        <input
          className="border-gray-400 border-2 w-full p-1"
          placeholder="e-mail"
          type="email"
          value={email} onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border-gray-400 border-2 w-full p-1"
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />

        <button type="submit" disabled={loading} className="bg-blue-500 text-white py-2 px-4 rounded flex items-center justify-center">
          {loading ? (
            <svg className="animate-spin h-5 w-5 mr-2">
              <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
            </svg>
          ) : null}
          {loading ? 'Loading...' : 'Log In'}
        </button>
      </form>
    </main>
  );
}
