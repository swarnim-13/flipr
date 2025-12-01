import React from 'react';
export default function Hero(){
  return (
    <section className="relative bg-[url('/src/assets/hero.jpg')] bg-cover bg-center h-[420px]">
      <div className="absolute inset-0 bg-gradient-to-r from-sky-900/60 to-transparent"></div>
      <div className="container mx-auto h-full flex items-center px-6">
        <div className="text-white max-w-xl">
          <h1 className="text-4xl font-bold">Meaningful investments in Main Street businesses</h1>
          <p className="mt-4">Browse vetted investment offerings in communities all over the US.</p>
          <button className="mt-6 px-5 py-2 bg-primary rounded">GET STARTED</button>
        </div>
      </div>
    </section>
  )
}
