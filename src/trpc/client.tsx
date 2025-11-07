'use client';
// ^-- to make sure we can mount the Provider from a server component
import type { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import { useState } from 'react';
import superjson from "superjson"
import { makeQueryClient } from './query-client';
import type { AppRouter } from './routers/_app';

export const trpc = createTRPCReact<AppRouter>();
let clientQueryClientSingleton: QueryClient;
/**
 * Obtain a React Query `QueryClient` appropriate for the current runtime environment.
 *
 * @returns A `QueryClient` instance. On the server a new instance is created for each call; in the browser a module-level singleton is created and reused.
 */
function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient();
  }
  // Browser: use singleton pattern to keep the same query client
  return (clientQueryClientSingleton ??= makeQueryClient());
}
/**
 * Determine the full URL for the application's tRPC HTTP endpoint.
 *
 * On the client this returns a relative '/api/trpc' path; on the server it
 * returns 'https://<VERCEL_URL>/api/trpc' when VERCEL_URL is set, or
 * 'http://localhost:3000/api/trpc' otherwise.
 *
 * @returns The full URL (absolute or relative) to the tRPC API endpoint.
 */
function getUrl() {
  const base = (() => {
    if (typeof window !== 'undefined') return '';
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return 'http://localhost:3000';
  })();
  return `${base}/api/trpc`;
}

/**
 * Provides tRPC and React Query contexts for the wrapped component tree.
 *
 * Creates and supplies a tRPC client (configured to batch HTTP requests, use `superjson`, and include an `x-trpc-source` header) and a QueryClient to all descendants.
 *
 * @param props.children - React nodes to render inside the providers
 * @returns A React element that renders `children` inside tRPC and QueryClient providers
 */
export function TRPCProvider(
  props: Readonly<{
    children: React.ReactNode;
  }>,
) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          transformer: superjson,
          url: getUrl(),
          async headers() {
            const headers = new Headers();
            headers.set("x-trpc-source", "nextjs-react")
            return headers;
          }
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}