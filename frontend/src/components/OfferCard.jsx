import React from "react";
import { motion } from "framer-motion";

export default function OfferCard({ item, loading }) {
  if (loading) {
    return <div className="w-80 h-64 bg-gray-200 animate-pulse"></div>;
  }

  const getImageSrc = (imgPath) => {
    if (!imgPath) return "/assets/placeholder.jpg"; // default in public/assets

    if (imgPath.startsWith("http")) return imgPath;
    if (imgPath.startsWith("/uploads")) return `http://localhost:5000${imgPath}`;

    // If it's already a path starting with /assets or /src/assets, normalize to /assets
    if (imgPath.startsWith("/assets")) return imgPath;
    if (imgPath.startsWith("/src/assets")) return imgPath.replace('/src/assets', '/assets');

    // If just a filename like "1.svg", serve from public/assets
    if (!imgPath.includes("/")) return `/assets/${imgPath}`;

    // fallback
    return imgPath;
  };

  const src = getImageSrc(item?.image);

  return (
    <motion.div whileHover={{ y: -8 }} className="w-80 bg-white shadow-lg rounded overflow-hidden">
      <div className="h-40 bg-gray-200">
        <img src={src} alt={item?.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold">{item?.title}</h4>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">{item?.tag}</span>
        </div>
        <p className="text-sm text-gray-500 mt-2">{item?.location}</p>
        <p className="mt-3 text-gray-600 text-sm">{String(item?.description || '').slice(0,100)}...</p>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">Raised</div>
            <div className="font-bold">${Number(item?.get_price || 0).toLocaleString()}</div>
          </div>
          <button className="px-4 py-2 bg-accent text-white rounded">VIEW</button>
        </div>
      </div>
    </motion.div>
  );
}
