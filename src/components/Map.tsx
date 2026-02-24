"use client";

import dynamic from "next/dynamic";
import { CircularProgress } from "@mui/material";

const LeafLetProvider = dynamic(() => import("../components/LeafLetProvider"), {
  ssr: false,
  loading: () => (
    <div className="h-full min-h-dvh w-full min-w-dvw flex justify-center items-center">
      <CircularProgress size={100} />
    </div>
  ),
});

export default function Map() {
  return (
    <div>
      <LeafLetProvider />
    </div>
  );
}
