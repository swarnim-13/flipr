// frontend/src/pages/Admin/AddOffering.jsx
import React, { useState, useEffect } from 'react';
import API from '../../api';
import { useNavigate, useLocation } from 'react-router-dom';

export default function AddOffering(){
  const nav = useNavigate();
  const { state } = useLocation();
  const edit = state?.offering;
  const [form, setForm] = useState({
    tag: edit?.tag || '',
    title: edit?.title || '',
    location: edit?.location || '',
    description: edit?.description || '',
    total_price: edit?.total_price || '',
    get_price: edit?.get_price || '',
    security_type: edit?.security_type || '',
    investment_multiple: edit?.investment_multiple || '',
    maturity: edit?.maturity || '',
    min_investment: edit?.min_investment || ''
  });
  const [file, setFile] = useState(null);

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    // client-side validation simple
    if (!form.title || !form.get_price) return alert('Please add title and get price');

    const data = new FormData();
    Object.keys(form).forEach(k => data.append(k, form[k]));
    if (file) data.append('image', file);
    try {
      if (edit) {
        await API.put('/offerings/' + edit._id, data);
      } else {
        await API.post('/offerings', data);
      }
      nav('/admin/dashboard');
    } catch(err){
      console.error(err);
      alert('Error saving offering');
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center p-8">
      <form onSubmit={submit} className="w-full max-w-2xl bg-white p-6 rounded shadow">
        <h3 className="text-xl font-bold mb-4">{edit ? 'Edit' : 'Add'} Offering</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input name="tag" value={form.tag} onChange={handle} placeholder="Tag" className="p-2 border rounded w-full" />
          <input name="title" value={form.title} onChange={handle} placeholder="Title" className="p-2 border rounded w-full" />
          <input name="location" value={form.location} onChange={handle} placeholder="Location" className="p-2 border rounded w-full" />
          <input name="total_price" type="number" value={form.total_price} onChange={handle} placeholder="Total Price" className="p-2 border rounded w-full" />
          <input name="get_price" type="number" value={form.get_price} onChange={handle} placeholder="Get Price" className="p-2 border rounded w-full" />
          <input name="security_type" value={form.security_type} onChange={handle} placeholder="Security Type" className="p-2 border rounded w-full" />
          <input name="investment_multiple" value={form.investment_multiple} onChange={handle} placeholder="Investment Multiple" className="p-2 border rounded w-full" />
          <input name="maturity" value={form.maturity} onChange={handle} placeholder="Maturity (e.g. 36 months)" className="p-2 border rounded w-full" />
          <input name="min_investment" type="number" value={form.min_investment} onChange={handle} placeholder="Min Investment" className="p-2 border rounded w-full" />
        </div>

        <div className="mt-4">
          <label className="block text-sm mb-1">Description</label>
          <textarea name="description" value={form.description} onChange={handle} rows={4} className="p-2 border rounded w-full" />
        </div>

        <div className="mt-4">
          <label className="block text-sm">Image</label>
          <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
        </div>

        <div className="mt-6 flex gap-2">
          <button className="px-4 py-2 bg-primary text-white rounded">Save</button>
          <button type="button" onClick={()=>nav('/admin/dashboard')} className="px-4 py-2 border rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}
