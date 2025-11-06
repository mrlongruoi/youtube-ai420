import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from '@tanstack/react-query';
/**
 * Create a preconfigured TanStack QueryClient tailored for this application.
 *
 * The returned client has queries' stale time set to 30,000 ms and de/rehydration
 * behavior that preserves queries when the default dehydration logic applies
 * or when a query's state is `'pending'`.
 *
 * @returns A configured `QueryClient` instance with the above defaults.
 */

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,
      },
      dehydrate: {
        // serializeData: superjson.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      },
      hydrate: {
        // deserializeData: superjson.deserialize,
      },
    },
  });
}