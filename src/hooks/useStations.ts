import { Station } from "@/types";
import { useEffect, useState } from "react";

const EMPTY_ARRAY: ReadonlyArray<string> = [];

type UseStations = {
  stations: Station[];
  error: Error | null;
};

/**
 * Fetches stations from the API and filters them based on the provided cities.
 *
 * @param {ReadonlyArray<string>} filteredCities The cities to filter the stations by.
 * @returns {Object} An object containing the filtered stations.
 */
export default function useStations(
  filteredCities: ReadonlyArray<string> = EMPTY_ARRAY,
): UseStations {
  const [stations, setStations] = useState<Station[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getStations = async () => {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/stations`;

      const res = await fetch(url, {
        cache: "force-cache",
      });

      if (!res.ok) {
        setError(new Error(res.statusText));
      } else {
        setError(null);
      }

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
    // loading is not set because this fetch takes no measurable time
    error,
  };
}
