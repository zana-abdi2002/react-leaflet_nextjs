"use client";

import { Station } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import AnimateViewOnClick from "./AnimateViewOnClick";
import { Icon, Map } from "leaflet";
import useStations from "../hooks/useStations";
import location_pin from "../assets/icons/location_pin.png";
import MarkerClusterGroup from "react-leaflet-cluster";
import { CircularProgress } from "@mui/material";
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
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    if (selectedStation) {
      setLat(selectedStation.lat);
      setLng(selectedStation.lng);
    }
  }, [selectedStation]);

  // change center on searching a specific station ----------------
  useEffect(() => {
    map?.setView([lat, lng], zoom);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lng]);
  // -----------------------------------------------------------

  // zoom out on filtering city ...................................
  useEffect(() => {
    map?.setView([51.1657, 10.4515], 5); // Germany bird view

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredCities]);
  // ..............................................................

  const { stations, error, isFetching } = useStations(filteredCities);

  if (error) throw error;

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={[51.1657, 10.4515]} // initial load
        zoom={5} // initial load
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
          {/* mark stations --------------------------------------------------- */}
          {stations?.map((station) => (
            <Marker
              icon={locationPinIcon}
              position={[station.lat, station.lng]}
              key={station.id}
              alt={`location pin icon of ${station.name} station`}
              eventHandlers={{
                click: () => {
                  // center instantly:
                  map?.setView([station.lat, station.lng], zoom);
                  // or for smooth animation use:
                  // map?.flyTo([station.lat, station.lng], zoom);
                },
              }}
            >
              <Popup closeOnClick={true}>{station.name} station</Popup>
            </Marker>
          ))}
          {/* ------------------------------------------------------------------- */}
        </MarkerClusterGroup>
      </MapContainer>
    ),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [stations],
  );

  return (
    <div style={{ position: "relative" }}>
      {isFetching && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
          }}
        >
          <CircularProgress size={40} />
        </div>
      )}
      {displayMap}
    </div>
  );
}
