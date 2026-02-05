"use client";

import { Station } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import AnimateViewOnClick from "./AnimateViewOnClick";
import { Icon, Map } from "leaflet";
import useStations from "../hooks/useStations";
import location_pin from "../assets/icons/location_pin.png";
import MarkerClusterGroup from "react-leaflet-cluster";
import "react-leaflet-cluster/dist/assets/MarkerCluster.css";
import "react-leaflet-cluster/dist/assets/MarkerCluster.Default.css";
import "leaflet/dist/leaflet.css";

const locationPinIcon = new Icon({
  iconUrl: location_pin.src,
  iconSize: [24, 24],
  iconAnchor: [12, 24],
});

const zoom = 15;

type LeafLetProviderProps = {
  selectedStation: Station | null;
  filteredCities: string[];
};

export default function LeafLetProvider({
  selectedStation,
  filteredCities,
}: LeafLetProviderProps) {
  const [lat, setLat] = useState(50);
  const [lng, setLng] = useState(50);

  useEffect(() => {
    if (selectedStation) {
      setLat(selectedStation.lat);
      setLng(selectedStation.lng);
    }
  }, [selectedStation]);

  // -----------------------------------------------------------
  const [map, setMap] = useState<Map | null>(null);

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

  const { stations } = useStations(filteredCities);

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
        <MarkerClusterGroup>
          {stations.map((station) => (
            <Marker
              icon={locationPinIcon}
              position={[station.lat, station.lng]}
              key={station.id}
            >
              <Popup closeOnClick={true}>{station.name} station</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    ),
    [stations],
  );

  return <div>{displayMap}</div>;
}
