import React, { useState, useEffect, useRef, FC } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import styles from "app/app/Location/MapComp.module.sass";
import { MarkerData } from './types';

interface MapComponentProps {
  markers: MarkerData[];
  onUpdateMarkers: (markers: MarkerData[]) => void;
  latitud: string;
  longitud: string;
}

const MapComponent: FC<MapComponentProps> = ({ markers, onUpdateMarkers, latitud, longitud }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const mapRef = useRef<any | null>(null);

  const ZoomHandler: FC = () => {
    const flyToMarker = (coordinates: [number, number], zoom: number) => {
      if (coordinates && coordinates.length === 2 && mapRef.current) {
        mapRef.current.flyTo(coordinates, zoom, {
          animate: true,
          duration: 1.5,
        });
      }
    };

    useMapEvents({
      zoomend: () => {
        setLoading(false);
      },
    });

    useEffect(() => {
      if (markers && markers.length > 0) {
        flyToMarker(markers[0].coordinates, 11);
      }
    }, [markers]);

    return null;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Asegúrate de que latitud y longitud tengan valores y están codificadas
      if (latitud && longitud) {
        const encodedLatitud = encodeURIComponent(latitud.replace(',', '.'));
        const encodedLongitud = encodeURIComponent(longitud.replace(',', '.'));

        // Supongamos que obtienes los datos de la API asíncronamente
        const response = await fetch(`http://127.0.0.1:8500/r.cercania/${latitud}/${longitud}`);
        const data = await response.json();

        // Verifica la estructura de 'data' antes de mapear
        if (Array.isArray(data)) {
          // Lógica para mapear la respuesta de la API a tus datos de marcadores
          const apiMarkers: MarkerData[] = data.map((item: any) => ({
            id: item.id,
            coordinates: [item.latitude, item.longitude] as [number, number],
            title: item.name,
          }));

          // Llamar a la función onUpdateMarkers para actualizar los marcadores en MapComponent
          onUpdateMarkers(apiMarkers);
        } else {
          console.error('La respuesta de la API no es un array válido:', data);
        }
      }
    } catch (error) {
      console.error('Error en la solicitud de la API:', error);
    } finally {
      setLoading(false);
    }
  };

  const [markersData, setMarkersData] = useState<MarkerData[]>([]);

  useEffect(() => {
    setMarkersData(markers);
  }, [markers]);

  return (
    <div className={styles.mapContainer}>
      <MapContainer center={[27.6426, -82.3871]} zoom={11} style={{ height: "50vh", width: "50vw" }} ref={mapRef}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        {markersData.map((marker) => (
          <Marker key={marker.id} position={marker.coordinates}>
            <Popup>{marker.title}</Popup>
          </Marker>
        ))}

        <ZoomHandler />
      </MapContainer>

      <div className="absolute bottom-5 left-0 w-full z-[10000] p-3">
        <div className="flex justify-center">
          <button onClick={handleSubmit} className="p-2 ml-2 bg-blue-500 text-white rounded-md">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
