import { Suspense } from "react";
import { HydrateClient, trpc } from "@/trpc/server";
import { PageClient } from "./client";
import { ErrorBoundary } from "react-error-boundary";

/**
 * Render the hydrated client page and initiate a background prefetch of server data.
 *
 * Initiates a background prefetch call to `trpc.hello` with `{ text: "mrlongruoi" }`
 * and returns a React element tree that hydrates server state and renders `PageClient`
 * wrapped in `Suspense` (fallback: `<div>Loading...</div>`) and `ErrorBoundary`
 * (fallback: `<div>Error...</div>`).
 *
 * @returns A React element tree that hydrates prefetched data and renders `PageClient` inside `Suspense` and `ErrorBoundary`.
 */
export default async function Home() {
  void trpc.hello.prefetch({ text: "mrlongruoi" });

  return (
    <HydrateClient>
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary fallback={<div>Error...</div>}>
          <PageClient />
        </ErrorBoundary>
      </Suspense>
    </HydrateClient>
  );
}