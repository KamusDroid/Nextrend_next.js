// types.ts
export interface ApiResponse {
  [key: string]: {
    name: string;
    avg_rating: number;
    address: string;
    latitude: number;
    longitude: number;
  };
}

export interface MarkerData {
  id: string;
  coordinates: [number, number];
  title: string;
}
