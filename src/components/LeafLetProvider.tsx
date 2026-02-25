"use client";

import { useMemo, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import AnimateViewOnClick from "./AnimateViewOnClick";
import { Icon, LatLngBounds, Map } from "leaflet";
import useStations from "../hooks/useStations";
import location_pin from "../assets/icons/location_pin.png";
import MarkerClusterGroup from "react-leaflet-cluster";
import { CircularProgress } from "@mui/material";
import "react-leaflet-cluster/dist/assets/MarkerCluster.css";
import "react-leaflet-cluster/dist/assets/MarkerCluster.Default.css";
import "leaflet/dist/leaflet.css";
import ViewportTracker from "./ViewportTracker";

const locationPinIcon = new Icon({
  iconUrl: location_pin.src,
  iconSize: [24, 24],
  iconAnchor: [12, 24],
});

const zoom = 15;

export default function LeafLetProvider() {
  const [map, setMap] = useState<Map | null>(null);
  const [newBounds, setNewBounds] = useState<LatLngBounds | null>(null);

  // ..............................................................

  const { stations, error, isFetching } = useStations(newBounds);

  if (error) throw error;

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={[51.1657, 10.4515]} // initial load
        zoom={12} // initial load
        scrollWheelZoom={true}
        style={{ height: "100dvh", width: "100%" }}
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ViewportTracker setNewBounds={setNewBounds} />

        <AnimateViewOnClick />

        <MarkerClusterGroup>
          {/* mark stations --------------------------------------------------- */}
          {stations?.map((station) => (
            <Marker
              icon={locationPinIcon}
              position={[station.lat, station.lon]}
              key={station.id}
              alt={`location pin icon of ${station.tags.name} station`}
              eventHandlers={{
                click: () => {
                  // center instantly:
                  map?.setView([station.lat, station.lon], zoom);
                  // or for smooth animation use:
                  // map?.flyTo([station.lat, station.lon], zoom);
                },
              }}
            >
              <Popup closeOnClick={true}>{station.tags.name} station</Popup>
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
