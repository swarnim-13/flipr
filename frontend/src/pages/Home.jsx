import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import OfferGrid from '../components/OfferGrid';
import FooterNewsletter from '../components/FooterNewsletter';
import API from '../api';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

export default function Home() {
  const [offers, setOffers] = useState([]);
  useEffect(() => {
    API.get('/offerings').then(res => setOffers(res.data)).catch(console.error);
  }, []);

  const data = {
    labels: ['2015','2016','2017','2018','2019','2020'],
    datasets: [{ label: 'Paid Out ($M)', data: [1.2, 2.1, 3.4, 3.9, 5.2, 7.3], tension: 0.4 }]
  };

  return (
    <div>
      <Hero />
      <section className="py-14">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">Offerings open for investment</h2>
          <p className="text-gray-500 mt-3">Explore pre-vetted investment opportunities available in a growing number of industry categories.</p>
          <OfferGrid items={offers} />
        </div>
      </section>

      <section className="bg-sky-50 py-16">
        <div className="container mx-auto px-6 flex flex-wrap items-center gap-8">
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-bold">$7M+ paid out to investors</h3>
            <p className="mt-3 text-gray-600">Next Invest has already paid out over $7M in cash returns to investors.</p>
          </div>
          <div className="w-full md:w-1/2">
            <div style={{ maxWidth: 420 }}>
              <Line data={data} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 flex items-center gap-8">
          <div className="w-1/2">
            <h3 className="text-2xl font-bold">Looking to raise capital for your growing business?</h3>
            <p className="mt-3 text-gray-600">Whether expanding or opening a brand-new concept, we make it easy to raise money from thousands of local investors.</p>
            <button className="mt-4 px-6 py-2 bg-primary text-white rounded">APPLY ONLINE</button>
          </div>
          <div className="w-1/2">
            <img src="/src/assets/illustration.png" alt="illustration" />
          </div>
        </div>
      </section>

      <FooterNewsletter />
    </div>
  );
}
