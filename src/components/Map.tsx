"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import SearchBar from "./SearchBar";
import { Station } from "@/types";
// import LeafLetProvider from "./LeafLetProvider";

const LeafLetProvider = dynamic(() => import("../components/LeafLetProvider"), {
  ssr: false,
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
