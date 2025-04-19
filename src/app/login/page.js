'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert(`Sending login: ${email} | ${password}\nto ${process.env.NEXT_PUBLIC_API_URL}/login`);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/login`,
      {
        "user": {
          "email": email,
          "password": password
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    router.push('/');
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-800 w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-120 border-1 border-black shadow-2xl p-8 bg-gray-900 rounded-lg">

        <h1 className="text-3xl font-bold"> Login </h1>

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

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Entrar
        </button>
      </form>
    </main>
  );
}
