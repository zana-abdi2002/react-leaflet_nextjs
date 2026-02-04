import { Station } from "@/types";
import { useEffect, useState } from "react";

export default function useStations() {
  const [stations, setStations] = useState<Station[]>([]);

  useEffect(() => {
    const getStations = async () => {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/stations`;

      const res = await fetch(url, {
        cache: "force-cache",
      });

      const stations = await res.json();
      setStations(stations);
    };

    getStations();
  }, []);

  return {
    stations,
    // TODO: loading
    // TODO: error
  };
}
