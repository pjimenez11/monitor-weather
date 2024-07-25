"use client";

import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {};

const center = {
  lat: -0.08385107307860722,
  lng: -76.64424001205153,
};

interface MapProps {
  width?: string;
  height?: string;
  onClick?: (lon: number, lat: number) => void;
}

const Map: React.FC<MapProps> = ({ onClick, width = '100%', height="calc(100vh - 200px)" }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const onLoad = React.useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ ...containerStyle, width, height }}
      center={center}
      zoom={14}
      onLoad={onLoad}
      onClick={(change) => {
        onClick?.(change.latLng?.lng() || 0, change.latLng?.lat() || 0);
      }}
    >
      {/* Agrega aquí los componentes adicionales si es necesario */}
    </GoogleMap>
  ) : (
    <div>Cargando...</div>
  );
};

export default Map;
