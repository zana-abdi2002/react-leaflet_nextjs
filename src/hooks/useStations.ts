import { Station } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { LatLngBounds } from "leaflet";
import { useEffect, useState } from "react";

export default function useStations(newBounds: LatLngBounds | null = null) {
  const [stations, setStations] = useState<Station[]>([]);

  const { data, error, isFetching } = useQuery({
    queryKey: ["stations", newBounds?.toBBoxString()],
    queryFn: fetchStations, // TODO: add signal to remove last
    retry: 2,
    retryDelay: 1000,
  });

  useEffect(() => {
    if (!data) return;

    const uniqueData = data?.filter((d) => {
      for (const station of stations) {
        if (station.lat === d.lat && station.lng === d.lng) {
          return false;
        }
      }
      return true;
    });

    setStations((prev) => [...prev, ...uniqueData]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return { stations, isFetching, error };
}

async function fetchStations(): Promise<Station[]> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/stations`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch stations: ${res.status}`);
  }

  const data = await res.json();
  return data;
}
