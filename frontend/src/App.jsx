import React from 'react';
import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="py-4">
        <div className="container mx-auto flex justify-between items-center px-6">
          <div className="font-bold text-xl text-primary">NEXT INVEST</div>
          <nav className="space-x-4">
            <a href="/" className="px-4">Investment Opportunities</a>
            <a href="/admin/login" className="px-4 text-sm bg-primary text-white py-1 rounded">LOGIN</a>
          </nav>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
