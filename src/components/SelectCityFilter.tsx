import useStations from "@/hooks/useStations";
import { Station } from "@/types";
import { Autocomplete, TextField, Fab, Zoom } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

type SelectCityFilterProps = {
  filteredCities: string[];
  setFilteredCities: (filteredCities: string[]) => void;
  selectedStation: Station | null;
  setSelectedStation: (station: Station | null) => void;
};

function SelectCityFilter({
  filteredCities,
  setFilteredCities,
  selectedStation,
  setSelectedStation,
}: SelectCityFilterProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { stations, error } = useStations();
  const cityNames = [...new Set(stations?.map((s) => s.city))];

  if (error) throw error;

  const handleChange = (value: string[]) => {
    setFilteredCities(value);

    // Remove selected station if it's not in the filter
    // and then the state value causes search bar component to be cleared
    if (!value.includes(selectedStation?.city || "")) {
      setSelectedStation(null);
    }
  };

  return (
    <>
      <Fab
        color="primary"
        onClick={() => setIsOpen((o) => !o)}
        sx={{ position: "fixed", bottom: 24, right: 24 }}
      >
        <AddIcon />
      </Fab>

      {isOpen && (
        <div
          style={{ zIndex: 1400, right: 24, bottom: 96 }}
          className="fixed bg-white/80 text-black rounded-2xl shadow-lg px-4 py-2 pointer-events-auto min-w-60 max-w-65"
          onBlur={() => setIsOpen(false)}
        >
          <Zoom in={isOpen}>
            <Autocomplete
              multiple
              id="tags-standard"
              options={cityNames}
              sx={{ width: "100%" }}
              // getOptionLabel={}
              defaultValue={[]}
              value={filteredCities}
              onChange={(_, value) => {
                handleChange(value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Filter Cities"
                  placeholder="Cities"
                />
              )}
            />
          </Zoom>
        </div>
      )}
    </>
  );
}

export default SelectCityFilter;
