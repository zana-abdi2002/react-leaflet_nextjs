import { Alert } from "@mui/material";

import { useMap } from "react-leaflet";

function AlertZoom() {
  const showAlert = useMap().getZoom() < 12;

  if (!showAlert) return null;

  console.log("zoom");

  return (
    <div
      style={{
        position: "absolute",
        top: "7%",
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
        Zoom in to see stations
      </Alert>
    </div>
  );
}

export default AlertZoom;
