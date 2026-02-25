import { Station } from "@/types";
import { NextRequest, NextResponse } from "next/server";

// This Route was created to demonstrate standard practices

type Response = {
  elements: Station[];
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const stringBBox = searchParams.get("stringBBox");

  const res = await fetch(
    `https://overpass-api.de/api/interpreter?data=[out:json];node[%22railway%22=%22station%22](${stringBBox});out%20body;`,
    {
      next: { revalidate: 60 * 60 * 24 * 1 },
    },
  );

  const data: Promise<Response> = await res.json();

  return NextResponse.json((await data).elements);
}

// https://overpass-api.de/api/interpreter?data=[out:json];node[%22railway%22=%22station%22](51.12076245895415,10.214796066284181,51.210580448273774,10.6882381439209);out%20body;
