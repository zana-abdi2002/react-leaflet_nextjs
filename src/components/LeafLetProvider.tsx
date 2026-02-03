"use client";

import { Station } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import AnimateViewOnClick from "./AnimateViewOnClick";
import { Map } from "leaflet";

const zoom = 13;

type LeafLetProviderProps = {
  selectedStation: Station | null;
};

export default function LeafLetProvider({
  selectedStation: station,
}: LeafLetProviderProps) {
  const lat = station?.lat || 50;
  const lng = station?.lng || 50;

  const [map, setMap] = useState<Map | null>(null);

  // -----------------------------------------------------------

  useEffect(() => {
    // alert(lat);
    map?.setView([lat, lng], zoom);

    const handleMove = () => {
      // You can add logic here if you want to do something on move
    };

    map?.on("move", handleMove);
    return () => {
      map?.off("move", handleMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lng]);
  // -----------------------------------------------------------

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={[51.1657, 10.4515]}
        zoom={5}
        scrollWheelZoom={true}
        style={{ height: "100dvh", width: "100%" }}
        ref={setMap}
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
    ),
    [],
  );

  return <div>{displayMap}</div>;
}

// TODO: https://react-leaflet.js.org/docs/example-layers-control/ ++ React control
