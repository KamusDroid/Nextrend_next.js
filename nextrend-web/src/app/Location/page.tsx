// pages/Page.tsx
"use client"
import React, { useState } from 'react';
import LocationSearch from './Location';
import MapComponent from './MapComp';
import BarList from './BarList';
import styles from './Location.module.sass';
import dynamic from 'next/dynamic';

const DynamicMapComponent = dynamic(() => import('./MapComp'), { ssr: false });

interface YelpBar {
  name: string;
  rating: number;
  image_url: string;
}

const Page: React.FC = () => {
  const [results, setResults] = useState<YelpBar[]>([]);

  const handleSearch = async (latitud: string, longitud: string) => {
    try {
      // Realizar la solicitud a la API de Yelp
      const response = await fetch(
        `https://api.yelp.com/v3/businesses/search?latitude=${latitud}&longitude=${longitud}&limit=10`,
        {
          headers: {
            Authorization: `Bearer YOUR_YELP_API_KEY`,
          },
        }
      );

      const data = await response.json();

      // Formatear los resultados
      const formattedBars: YelpBar[] = data.businesses.map((bar: any) => ({
        name: bar.name,
        rating: bar.rating,
        image_url: bar.image_url,
      }));

      setResults(formattedBars);
    } catch (error) {
      console.error('Error en la búsqueda:', error);
    }
  };

  return (
    <main className={styles.main}>
      <div>
        <DynamicMapComponent />
      </div>
      <div id="results-container" className={styles.resultsContainer}>
        <h1>Consulta de Cercanía</h1>
        <LocationSearch onSearch={handleSearch} />

        <BarList bars={results} />

      </div>
    </main>
  );
};

export default Page;
