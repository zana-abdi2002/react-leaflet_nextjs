"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import SearchBar from "./SearchBar";
import { Station } from "@/types";
import { CircularProgress } from "@mui/material";
import SelectCityFilter from "./SelectCityFilter";

const LeafLetProvider = dynamic(() => import("../components/LeafLetProvider"), {
  ssr: false,
  loading: () => (
    <div className="h-full min-h-dvh w-full min-w-dvw flex justify-center items-center">
      <CircularProgress size={100} />
    </div>
  ),
});

export default function Map() {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);

  return (
    <div>
      <SearchBar
        selectedStation={selectedStation}
        setSelectedStation={setSelectedStation}
        filteredCities={filteredCities}
      />
      <SelectCityFilter
        filteredCities={filteredCities}
        setFilteredCities={setFilteredCities}
        // To remove selected station if it's not in the filter
        selectedStation={selectedStation}
        setSelectedStation={setSelectedStation}
      />
      <LeafLetProvider
        selectedStation={selectedStation} // to zoom on selected station
        filteredCities={filteredCities}
      />
    </div>
  );
}
