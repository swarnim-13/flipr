import React from 'react';
import OfferCard from './OfferCard';
export default function OfferGrid({ items = [] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 justify-items-center">
      {items.length ? items.map(item => <OfferCard key={item._id} item={item} />) 
      : Array.from({length:6}).map((_,i)=> <OfferCard key={i} loading />)}
    </div>
  );
}
