import { NextResponse } from "next/server";

// This Route was created to demonstrate standard practices

export const dynamic = "force-static";

export async function GET() {
  const res = await fetch(
    `https://gist.githubusercontent.com/neysidev/bbd40032f0f4e167a1e6a8b3e99a490c/raw/fc7dc242f41393845d90edaa99e32e28f1ddfe24/train-stations.json`,
  );

  const data = await res.json();

  return NextResponse.json(data);
}
