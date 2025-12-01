import React, { useState } from 'react';
import API from '../api';

export default function FooterNewsletter(){
  const [email,setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/newsletter', { email });
      setMsg('Thanks for subscribing!');
      setEmail('');
    } catch(err){
      setMsg('Could not save, try again.');
    }
  };
  return (
    <footer className="bg-gray-100 py-10 mt-10">
      <div className="container mx-auto px-6 text-center">
        <h4 className="font-bold">Subscribe to our newsletter</h4>
        <form onSubmit={submit} className="mt-4 flex justify-center gap-2">
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email address" className="px-4 py-2 border rounded w-80" />
          <button className="px-4 py-2 bg-primary text-white rounded">→</button>
        </form>
        {msg && <p className="mt-3 text-sm text-green-600">{msg}</p>}
      </div>
    </footer>
  );
}
