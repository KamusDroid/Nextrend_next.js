import React, { useEffect, useState } from 'react';

interface YelpBar {
  name: string;
  rating: number;
  image_url: string;
}

interface BarListProps {
  bars: YelpBar[];
}

const BarList: React.FC<BarListProps> = ({ bars }) => {
  return (
    <div>
      <h2>Lista de Bares:</h2>
      <ul>
        {bars.map((bar, index) => (
          <li key={index}>
            <strong>Name:</strong> {bar.name}, <strong>Rating:</strong> {bar.rating}
            {/* Puedes mostrar la imagen o cualquier otra información aquí */}
            <img src={bar.image_url} alt={bar.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BarList;
