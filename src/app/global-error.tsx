"use client";

import { useEffect } from "react";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  // Log internal details safely but privately
  useEffect(() => {
    console.error("global Error boundary caught:", error);
  }, [error]);

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-900">
        Something unexpected went wrong.
      </h2>

      <p className="text-gray-600">
        We are not able to load this page. You can try again or contact us.
      </p>

      <button
        onClick={() => reset()}
        className="mt-2 rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800"
      >
        Try again
      </button>
    </>
  );
}
