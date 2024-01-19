// pages/Buscador.tsx
"use client"
import React from 'react';
import dynamic from 'next/dynamic';
import LocationSearch from '../Location/Location';
const DynamicMapComponent = dynamic(() => import('../buscador/Map/MapComponent/MapComponent'), { ssr: false });

const Buscador: React.FC = () => {
  const handleSearch = (latitud: string, longitud: string) => {
    console.log('Búsqueda:', latitud, longitud);
  };

  return (
    <main>
      <div>
        <DynamicMapComponent />
      </div>
      <div>
        <LocationSearch onSearch={handleSearch} />
      </div>
    </main>
  );
};

export default Buscador;

