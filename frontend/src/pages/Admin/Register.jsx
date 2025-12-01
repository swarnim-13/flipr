import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', { email, password });
      alert('Account created! Please login.');
      nav('/admin/login');
    } catch (err) {
      alert(err?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form
        onSubmit={submit}
        className="w-full max-w-sm bg-white p-6 rounded shadow"
      >
        <h3 className="text-xl font-bold mb-4">Create Admin Account</h3>

        <input
          type="email"
          placeholder="Email"
          className="p-2 border w-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="p-2 border w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white px-4 py-2 rounded"
        >
          Create Account
        </button>

        <p
          className="mt-4 text-sm text-blue-600 cursor-pointer"
          onClick={() => nav('/admin/login')}
        >
          Already have an account? Login
        </p>
      </form>
    </div>
  );
}
