import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import Home from './pages/Home';
import Login from './pages/Admin/Login';
import Register from './pages/Admin/Register';
import Dashboard from './pages/Admin/Dashboard';
import AddOffering from './pages/Admin/AddOffering';

import './index.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      {/* App = layout wrapper */}
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="admin/login" element={<Login />} />
        <Route path="admin/register" element={<Register />} />
        <Route path="admin/dashboard" element={<Dashboard />} />
        <Route path="admin/add-offering" element={<AddOffering />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
