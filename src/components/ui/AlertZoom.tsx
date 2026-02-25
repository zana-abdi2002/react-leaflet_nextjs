import { Alert } from "@mui/material";
import { useEffect, useState } from "react";

import { useMap, useMapEvents } from "react-leaflet";
import { useDebouncedCallback } from "use-debounce";

function AlertZoom() {
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const map = useMap();

  const handleMapEventChange = useDebouncedCallback(
    () => {
      setShowAlert(map.getZoom() < 12);
    },
    1000,
    { leading: true },
  );

  // Cleanup pending timeouts on unmount
  useEffect(() => {
    return () => {
      handleMapEventChange.cancel();
    };
  }, [handleMapEventChange]);

  useMapEvents({
    moveend: handleMapEventChange,
    zoomend: handleMapEventChange,
  });

  if (!showAlert) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: "15%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
        pointerEvents: "none",
      }}
    >
      <Alert
        severity="info"
        style={{
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          whiteSpace: "nowrap",
        }}
      >
        Zoom in to fetch stations
      </Alert>
    </div>
  );
}

export default AlertZoom;
