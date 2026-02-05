import { Station } from "@/types";
import { useEffect, useState } from "react";

const EMPTY_ARRAY: ReadonlyArray<string> = [];

export default function useStations(
  filteredCities: ReadonlyArray<string> = EMPTY_ARRAY,
) {
  const [stations, setStations] = useState<Station[]>([]);

  useEffect(() => {
    const getStations = async () => {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/stations`;

      const res = await fetch(url, {
        cache: "force-cache",
      });

      const stations = await res.json();

      if (filteredCities.length > 0) {
        setStations(
          stations.filter((station: Station) =>
            filteredCities.includes(station.city),
          ),
        );
      } else {
        setStations(stations);
      }
    };

    getStations();
  }, [filteredCities]);

  return {
    stations,
    // TODO: loading
    // TODO: error
  };
}
