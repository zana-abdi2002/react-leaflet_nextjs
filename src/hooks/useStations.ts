import { Station } from "@/types";
import { useQuery } from "@tanstack/react-query";

const EMPTY_ARRAY: ReadonlyArray<string> = [];

const fetchStations = async (): Promise<Station[]> => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/stations`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch stations: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

export default function useStations(
  filteredCities: ReadonlyArray<string> = EMPTY_ARRAY,
) {
  const { data, error } = useQuery({
    queryKey: ["stations"],
    queryFn: fetchStations,
    staleTime: 60_000,
    retry: 2,
    retryDelay: 1000,
  });

  const stations =
    filteredCities.length > 0
      ? data?.filter((s: Station) => filteredCities.includes(s.city))
      : data;

  return { stations, error };
}
