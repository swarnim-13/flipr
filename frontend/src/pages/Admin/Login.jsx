import React, { useState } from 'react';
import API from '../../api';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const nav = useNavigate();
  const submit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      nav('/admin/dashboard');
    } catch(err){
      alert('Invalid credentials');
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} className="bg-white p-8 shadow rounded w-96">
        <h3 className="text-xl font-bold">Admin Login</h3>
        <input className="mt-4 p-2 border rounded w-full" value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" />
        <input className="mt-4 p-2 border rounded w-full" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password"/>
        <button className="mt-4 w-full py-2 bg-primary text-white rounded">Login</button>
      </form>
    </div>
  );
}
