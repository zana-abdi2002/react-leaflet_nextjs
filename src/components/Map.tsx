"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import SearchBar from "./SearchBar";
import { Station } from "@/types";
import { CircularProgress } from "@mui/material";
// import LeafLetProvider from "./LeafLetProvider";

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

  return (
    <div>
      <SearchBar setSelectedStation={setSelectedStation} />
      <LeafLetProvider selectedStation={selectedStation} />
    </div>
  );
}
