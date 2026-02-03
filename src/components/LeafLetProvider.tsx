"use client";

import { Station } from "@/types";
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import AnimateViewOnClick from "./AnimateViewOnClick";

type LeafLetProviderProps = {
  selectedStation: Station | null;
};

export default function LeafLetProvider({
  selectedStation: station,
}: LeafLetProviderProps) {
  const lat = station?.lat || 50;
  const lng = station?.lng || 50;

  useEffect(() => {
    console.log(lat);
  }, [lat]);

  return (
    <MapContainer
      center={[51.1657, 10.4515]}
      zoom={5}
      scrollWheelZoom={true}
      style={{ height: "100dvh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <AnimateViewOnClick />
      <Marker position={[51.1657, 10.4515]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

// TODO: https://react-leaflet.js.org/docs/example-layers-control/ ++ React control
