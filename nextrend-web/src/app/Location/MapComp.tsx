import React, { useState, useEffect, useRef, FC } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import styles from "app/app/buscador/Map/MapComponent/MapComponent.module.sass";

interface MarkerData {
  coordinates: [number, number];
  title: string;
}

const MapComponent: FC = () => {
  const [markerData, setMarkerData] = useState<MarkerData | null>(null);

  const mapRef = useRef<any | null>(null);

  const ZoomHandler: FC = () => {
    const map = useMap();

    const flyToMarker = (coordinates: [number, number], zoom: number) => {
      if (coordinates && typeof coordinates[0] !== "undefined") {
        map.flyTo(coordinates, zoom, {
          animate: true,
          duration: 1.5,
        });
      }
    };

    useMapEvents({
      zoomend: () => {
        // Aquí puedes realizar acciones adicionales después de que termina el zoom
      },
    });

    useEffect(() => {
      if (markerData) {
        if (markerData.coordinates && typeof markerData.coordinates[0] !== "undefined") {
          flyToMarker(markerData.coordinates, 11);
        }
      }
    }, [markerData, map]);

    return null;
  };

  return (
    <div className={styles.mapContainer}>
      {markerData && markerData.coordinates && (
        <div className="flex items-center justify-center absolute top-3 right-3 z-[100000]">
          <h1 className="text-3xl font-bold text-black p-2 bg-white rounded-md z-[100000]">{markerData.title}</h1>
        </div>
      )}

      <MapContainer center={[43.6426, -79.3871]} zoom={11} style={{ height: "50vh", width: "50vw" }} ref={mapRef}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {markerData && markerData.coordinates && (
          <Marker position={markerData.coordinates}>
            <Popup>{markerData.title}</Popup>
          </Marker>
        )}

        <ZoomHandler />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
