"use client";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Station } from "@/types";
import useStations from "../hooks/useStations";

type SearchBarProps = {
  selectedStation: Station | null;
  setSelectedStation: (station: Station | null) => void;
  filteredCities: string[];
};

function SearchBar({
  selectedStation,
  setSelectedStation,
  filteredCities,
}: SearchBarProps) {
  const { stations } = useStations(filteredCities);

  const handleChange = (station: Station | null) => {
    setSelectedStation(station);
  };

  return (
    <div className="absolute mt-12 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-1000">
      <div className="bg-white text-black rounded-lg shadow p-2 min-w-65 z-50 flex items-center justify-center">
        <Autocomplete
          options={stations}
          sx={{ width: "100%" }}
          renderInput={(params) => (
            <TextField {...params} label="Station" size="small" />
          )}
          getOptionLabel={(station) => station.name}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          value={selectedStation}
          onChange={(_, value) => {
            handleChange(value);
          }}
        />
      </div>
    </div>
  );
}

export default SearchBar;
