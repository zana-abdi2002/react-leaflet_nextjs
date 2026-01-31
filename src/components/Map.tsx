"use client";

import dynamic from "next/dynamic";

const LeafLetProvider = dynamic(() => import("../components/LeafLetProvider"), {
  ssr: false,
});

export default function Map() {
  return (
    <div>
      <LeafLetProvider />
    </div>
  );
}
