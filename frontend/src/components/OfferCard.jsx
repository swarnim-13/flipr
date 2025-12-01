// frontend/src/components/OfferCard.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function OfferCard({ item, loading }) {
  if (loading) {
    return <div className="w-80 h-64 bg-gray-200 animate-pulse rounded"></div>;
  }

  const getImageSrc = (imgPath) => {
    const placeholder = "/assets/placeholder.jpg";
    if (!imgPath) return placeholder;
    if (imgPath.startsWith('http')) return imgPath;
    if (imgPath.startsWith('/uploads')) return `http://localhost:5000${imgPath}`;
    if (imgPath.startsWith('/assets')) return imgPath;
    if (!imgPath.includes('/')) return `/assets/${imgPath}`;
    return imgPath;
  };

  const imgSrc = getImageSrc(item?.image);

  // framer variants for subtle lift
  const cardVariants = {
    rest: { y: 0, boxShadow: '0 2px 6px rgba(0,0,0,0.08)' },
    hover: { y: -8, boxShadow: '0 18px 40px rgba(0,0,0,0.12)' }
  };

  return (
    <motion.div initial="rest" whileHover="hover" animate="rest" variants={cardVariants} className="w-80 rounded overflow-hidden relative bg-white">
      {/* image */}
      <div className="h-40 bg-gray-100 relative">
        <img src={imgSrc} alt={item?.title} className="w-full h-full object-cover" onError={(e)=>{ e.currentTarget.src='/assets/placeholder.jpg'}}/>
      </div>

      {/* compact info */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-sm font-semibold">{item?.title}</div>
            <div className="text-xs text-gray-500">{item?.location}</div>
          </div>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">{item?.tag}</span>
        </div>

        <p className="mt-3 text-xs text-gray-600 h-14 overflow-hidden">{String(item?.description || '').slice(0,120)}</p>

        <div className="mt-3 flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-500">Raised</div>
            <div className="font-bold">${Number(item?.get_price || 0).toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Min</div>
            <div className="text-sm font-semibold">${Number(item?.min_investment || 0).toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* hover-overlay details (absolute over card) */}
      <motion.div
        variants={{ rest: { opacity: 0, y: 10 }, hover: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.18 }}
        className="absolute inset-0 bg-white p-5 flex flex-col justify-between"
        style={{ pointerEvents: 'none' }} // prevents blocking clicks in non-hover state
      >
        <div style={{ pointerEvents: 'auto' }} className="mt-6">
          <div className="text-lg font-bold">{item?.title}</div>
          <div className="text-sm text-gray-600 mt-2">{item?.location}</div>

          <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-gray-700">
            <div><span className="font-semibold">Security:</span> {item?.security_type}</div>
            <div><span className="font-semibold">Multiple:</span> {item?.investment_multiple}</div>
            <div><span className="font-semibold">Maturity:</span> {item?.maturity}</div>
            <div><span className="font-semibold">Min Invest:</span> ${Number(item?.min_investment || 0).toLocaleString()}</div>
          </div>

          <p className="mt-3 text-sm text-gray-600">{item?.description}</p>
        </div>

        <div style={{ pointerEvents: 'auto' }} className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-500">Total: ${Number(item?.total_price || 0).toLocaleString()}</div>
          <button className="px-4 py-2 bg-pink-400 text-white rounded font-semibold shadow">VIEW</button>
        </div>
      </motion.div>
    </motion.div>
  );
}
