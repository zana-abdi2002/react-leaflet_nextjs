import { Station } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { LatLngBounds } from "leaflet";
import { useEffect, useState } from "react";

export default function useStations(newBounds: LatLngBounds | null = null) {
  const [stations, setStations] = useState<Station[]>([]);

  const { data, error, isFetching } = useQuery({
    queryKey: ["stations", toStandardBBox(newBounds)],
    queryFn: () => fetchStations(toStandardBBox(newBounds)), // TODO: add signal to remove last
    retry: 2,
    retryDelay: 3000,
  });

  useEffect(() => {
    if (!data) return;

    const uniqueData = data?.filter((d) => {
      for (const station of stations) {
        if (station.lat === d.lat && station.lon === d.lon) {
          return false;
        }
      }
      return true;
    });

    setStations((prev) => [...prev, ...uniqueData]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  console.log(stations.length);

  return { stations, isFetching, error };
}

async function fetchStations(bbox: string | null): Promise<Station[] | null> {
  if (!bbox) return null;

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/stations?stringBBox=${bbox}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch stations: ${res.status}`);
  }

  const data = await res.json();
  return data;
}

function toStandardBBox(boundary: LatLngBounds | null) {
  if (!boundary) return null;

  return `${boundary.getSouth()},${boundary.getWest()},${boundary.getNorth()},${boundary.getEast()}`;
}
