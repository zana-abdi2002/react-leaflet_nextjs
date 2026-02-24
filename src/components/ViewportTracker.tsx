import { useEffect } from "react";
import { useMap, useMapEvents } from "react-leaflet";
import { useDebouncedCallback } from "use-debounce";

export default function ViewportTracker() {
  const map = useMap();

  const handleBoundsChange = useDebouncedCallback(() => {
    const newBounds = map.getBounds().pad(0.6);

    // setBound(newBounds);
  }, 400);

  // Cleanup pending timeouts on unmount ---------
  useEffect(() => {
    return () => {
      handleBoundsChange.cancel();
    };
  }, [handleBoundsChange]);

  // Initial render ---------------
  useEffect(() => {
    // setBound(map.getBounds());
  }, []);

  useMapEvents({
    moveend: handleBoundsChange,
    zoomend: handleBoundsChange,
  });

  return null;
}
