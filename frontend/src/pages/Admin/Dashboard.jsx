import React, { useEffect, useState } from 'react';
import API from '../../api';
import { useNavigate } from 'react-router-dom';

export default function Dashboard(){
  const [offers, setOffers] = useState([]);
  const [subs, setSubs] = useState([]);
  const nav = useNavigate();

  const load = async () => {
    try {
      const r1 = await API.get('/offerings');
      setOffers(r1.data);
      const r2 = await API.get('/newsletter');
      setSubs(r2.data);
    } catch(err){
      console.error(err);
      nav('/admin/login');
    }
  };
  useEffect(()=>{ load() },[]);

  const remove = async (id) => {
    if (!confirm('Delete?')) return;
    await API.delete('/offerings/' + id);
    load();
  };

  return (
    <div className="p-6 container mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <div>
          <button onClick={()=>nav('/admin/add-offering')} className="px-4 py-2 bg-primary text-white rounded">Add Offering</button>
          <button className="ml-3 px-3 py-2 bg-gray-200 rounded" onClick={()=> { localStorage.removeItem('token'); nav('/admin/login'); }}>Logout</button>
        </div>
      </div>

      <section className="mt-6">
        <h3 className="font-semibold">Offerings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
          {offers.map(o => (
            <div key={o._id} className="p-3 border rounded">
              <div className="flex justify-between">
                <div>
                  <div className="font-bold">{o.title}</div>
                  <div className="text-sm text-gray-600">{o.location}</div>
                </div>
                <div>
                  <button onClick={()=>nav('/admin/add-offering', { state: { offering: o } })} className="text-sm mr-2">Edit</button>
                  <button onClick={()=>remove(o._id)} className="text-sm text-red-600">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h3 className="font-semibold">Newsletter Subscribers</h3>
        <ul className="mt-2">
          {subs.map(s => <li key={s._id} className="py-1 border-b">{s.email}</li>)}
        </ul>
      </section>
    </div>
  );
}
