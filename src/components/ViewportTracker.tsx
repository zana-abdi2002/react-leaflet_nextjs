/* eslint-disable react-hooks/exhaustive-deps */
import { LatLngBounds } from "leaflet";
import { useEffect, useRef } from "react";
import { useMap, useMapEvents } from "react-leaflet";
import { useDebouncedCallback } from "use-debounce";

const PAD = 2.6;

type Props = {
  setNewBounds: (bound: LatLngBounds) => void;
};

export default function ViewportTracker({ setNewBounds }: Props) {
  const cachedBoundsList = useRef<LatLngBounds[]>([]);

  const map = useMap();

  const handleBoundsChange = useDebouncedCallback(() => {
    if (map.getZoom() < 12) return;

    const uncheckedBounds = map.getBounds();

    if (!isCached(uncheckedBounds, cachedBoundsList.current || [])) {
      cachedBoundsList.current?.push(uncheckedBounds.pad(PAD));
      setNewBounds(uncheckedBounds.pad(PAD));
    }
  }, 400);

  // Cleanup pending timeouts on unmount ---------
  useEffect(() => {
    return () => {
      handleBoundsChange.cancel();
    };
  }, [handleBoundsChange]);

  // Initial render -------------------------------
  useEffect(() => {
    cachedBoundsList.current?.push(map.getBounds().pad(PAD));
    setNewBounds(map.getBounds().pad(PAD));
  }, []);

  useMapEvents({
    moveend: handleBoundsChange,
    zoomend: handleBoundsChange,
  });

  return null;
}

function isCached(
  uncheckedBounds: LatLngBounds,
  cachedBoundsList: LatLngBounds[],
) {
  for (const cachedBounds of cachedBoundsList) {
    if (isWithin(uncheckedBounds, cachedBounds)) {
      return true;
    }
  }

  return false;
}

function isWithin(b1: LatLngBounds, b2: LatLngBounds) {
  return (
    b1.getNorth() < b2.getNorth() &&
    b1.getSouth() > b2.getSouth() &&
    b1.getEast() < b2.getEast() &&
    b1.getWest() > b2.getWest()
  );
}
