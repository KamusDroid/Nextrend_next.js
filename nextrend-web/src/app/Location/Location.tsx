"use client"
import React, { useState } from 'react';

interface LocationProps {
  onSearch: (latitud: string, longitud: string) => void;
}

const LocationSearch: React.FC<LocationProps> = ({ onSearch }) => {
  const [latitud, setLatitud] = useState<string>('');
  const [longitud, setLongitud] = useState<string>('');

  const handleSearch = () => {
    if (latitud && longitud) {
      onSearch(latitud, longitud);
      setLatitud('');
      setLongitud('');
    }
  };

  return (
    <div>
      <label>
        Latitud:
        <input type="text" value={latitud} onChange={(e) => setLatitud(e.target.value)} />
      </label>
      <br />
      <label>
        Longitud:
        <input type="text" value={longitud} onChange={(e) => setLongitud(e.target.value)} />
      </label>
      <br />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default LocationSearch;
