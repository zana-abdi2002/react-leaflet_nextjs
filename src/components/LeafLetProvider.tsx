"use client";

import { Station } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import AnimateViewOnClick from "./AnimateViewOnClick";
import { Icon, Map } from "leaflet";
import useStations from "../hooks/useStations";
import location_pin from "../assets/icons/location_pin.png";

const locationPinIcon = new Icon({
  iconUrl: location_pin.src,
  iconSize: [24, 24],
  iconAnchor: [12, 24],
});

const zoom = 15;

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

  const { stations } = useStations();

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
        {stations.map((station) => (
          <Marker
            icon={locationPinIcon}
            position={[station.lat, station.lng]}
            key={station.id}
          >
            <Popup>{station.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    ),
    [stations],
  );

  return <div>{displayMap}</div>;
}
