
import { useState } from 'react';

interface LocationSearchProps {
  onSearch: (latitud: string, longitud: string) => void;
}

export const LocationSearch: React.FC<LocationSearchProps> = ({ onSearch }) => {
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
