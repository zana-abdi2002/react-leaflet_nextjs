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
    <div className="flex h-screen items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 p-4">
      <div className="flex flex-col gap-6 rounded-lg bg-white p-8 shadow-lg max-w-md text-center">
        <div className="flex justify-center">
          <div className="flex rounded-full bg-red-100 p-3">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

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
      </div>
    </div>
  );
}
