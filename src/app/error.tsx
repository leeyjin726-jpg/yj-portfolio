"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="flex min-h-screen items-center justify-center p-8 font-sans">
        <div className="text-center max-w-md">
          <h2 className="text-xl font-semibold mb-4 text-neutral-900">
            Something went wrong
          </h2>
          <p className="text-neutral-500 mb-6 text-sm">
            {error.message ?? "An unexpected error occurred."}
          </p>
          <button
            onClick={reset}
            className="px-4 py-2 text-sm border border-neutral-200 rounded hover:bg-neutral-50 transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
