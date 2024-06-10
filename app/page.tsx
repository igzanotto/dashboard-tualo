'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Importación correcta para Next.js 13+ con App Router
import { createClient } from '@/utils/supabase/client';


const SetPassword = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [token, setToken] = useState('');
  const supabase = createClient();

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get('access_token');
    console.log('token', token);

    if (token) {
      setToken(token);
    } else {
      setError('Invalid or expired token.');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError('Invalid or expired token.');
      return;
    }

    const { data, error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push('/login');
    }
  };

  return (
    <div>
      <h1>Set Your Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Set Password</button>
      </form>
    </div>
  );
};

export default SetPassword;
