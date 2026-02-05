import useStations from "@/hooks/useStations";
import { Autocomplete, TextField } from "@mui/material";

type SelectCityFilterProps = {
  filteredCities: string[];
  setFilteredCities: (filteredCities: string[]) => void;
};

function SelectCityFilter({
  filteredCities,
  setFilteredCities,
}: SelectCityFilterProps) {
  const { stations } = useStations();
  const cityNames = [...new Set(stations.map((s) => s.city))];

  return (
    <div className="fixed left-1/2 transform -translate-x-1/2 z-999 bg-white/80 text-black rounded-2xl shadow-lg px-4 py-2 w-100 pointer-events-auto mt-4">
      <Autocomplete
        multiple
        id="tags-standard"
        options={cityNames}
        sx={{ width: "100%" }}
        // getOptionLabel={}
        defaultValue={[]}
        value={filteredCities}
        onChange={(_, value) => {
          setFilteredCities(value);
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
    </div>
  );
}

export default SelectCityFilter;
