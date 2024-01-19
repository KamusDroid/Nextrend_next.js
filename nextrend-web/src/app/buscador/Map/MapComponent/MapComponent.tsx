"use client"
import React, { useState, useEffect, useRef, FC } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import Loader from "../Loader/Loader";
import styles from "app/app/buscador/Map/MapComponent/MapComponent.module.sass"

interface MarkerData {
  coordinates: [number, number];
  title: string;
}

export const MapComponent: FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [markerData, setMarkerData] = useState<MarkerData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [submittedQuestion, setSubmittedQuestion] = useState<string | null>(null);

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
        setLoading(false);
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

  const handleSubmit = async () => {
    setLoading(true);
    try {
      setSubmittedQuestion(inputValue);
      setInputValue("");

      // Simulando la llamada a la API
      const data: MarkerData = {
        coordinates: [43.6426, -79.3871],
        title: "Marker Title",
      };

      setMarkerData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.mapContainer}>
      {loading && <Loader />}

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

      <div className="absolute bottom-5 left-0 w-full z-[10000] p-3">
        <div className="flex justify-center">
          {submittedQuestion && (
            <div className="flex items-center justify-center bottom-16 absolute w-full z-[100000]">
              <h1 className="text-3xl font-bold text-black p-2 bg-white rounded-md">{submittedQuestion}</h1>
            </div>
          )}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-grow p-2 border rounded-md"
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
          />
          <button onClick={handleSubmit} className="p-2 ml-2 bg-blue-500 text-white rounded-md">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
