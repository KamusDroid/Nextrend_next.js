"use client"
import React, { useState } from 'react';
import LocationSearch from './Location';
import MapComponent from './MapComponent';  // Asegúrate de importar MapComponentProps
import styles from './Location.module.sass'; 
import dynamic from 'next/dynamic';
const DynamicMapComponent = dynamic(() => import('./MapComponent'), { ssr: false });

interface Result {
  name: string;
  avg_rating: number;
  latitude: number;
  longitude: number;
}

const Page: React.FC = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [latitud, setLatitud] = useState<string>('');
  const [longitud, setLongitud] = useState<string>('');

  const handleSearch = async (latitud: string, longitud: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:8500/r.cercania/${latitud}/${longitud}`);
      const data = await response.json();
  
      // Convertir el objeto en un array
      const resultsArray = Object.values(data) as Result[];
  
      setResults(resultsArray);

    } catch (error) {
      console.error('Error en la búsqueda:', error);
    }
  };  

  return (
    <main className={styles.main}>
      <div>
      <DynamicMapComponent markers={[]} onUpdateMarkers={() => {}} latitud={latitud} longitud={longitud} />
      </div>
      <div>
      </div>
      <div id="results-container" className={styles.resultsContainer}>
        <h1>Consulta de Cercanía</h1>
        <LocationSearch onSearch={handleSearch} />

        <h2>Resultados:</h2>
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              <strong>Name:</strong> {result.name}, <strong>Rating:</strong> {result.avg_rating}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Page;
