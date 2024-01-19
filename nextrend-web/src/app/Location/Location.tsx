// LocationSearch.tsx
import React, { useState } from 'react';
import { MarkerData,ApiResponse } from './types';  // Ajusta la ruta según tu estructura de archivos

interface LocationProps {
  onSearch: (latitud: string, longitud: string, markers: MarkerData[]) => void;
  onUpdateMarkers?: (markers: MarkerData[]) => void;
}

// ...

const LocationSearch: React.FC<LocationProps> = ({ onSearch, onUpdateMarkers }) => {
  const [latitud, setLatitud] = useState<string>('');
  const [longitud, setLongitud] = useState<string>('');

  const handleSearch = async () => {
    if (latitud && longitud) {
      try {
        const response = await fetch(`http://127.0.0.1:8500/r.cercania/${latitud}/${longitud}`);
        const data: ApiResponse = await response.json();

        const apiMarkers: MarkerData[] = Object.keys(data).map((key) => {
          const markerInfo = data[key];
          return {
            id: key,
            coordinates: [markerInfo.latitude, markerInfo.longitude],
            title: markerInfo.name,
          };
        });

        // Llamar a la función onSearch y pasar las coordenadas y marcadores
        onSearch(latitud, longitud, apiMarkers);

        // Llamar a la función onUpdateMarkers para actualizar los marcadores en MapComponent
        onUpdateMarkers && onUpdateMarkers(apiMarkers);
      } catch (error) {
        console.error(error);
      }

      // Limpiar los campos después de la búsqueda
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

