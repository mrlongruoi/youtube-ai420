import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from "@tanstack/react-query";
import superjson from "superjson";

/**
 * Create a preconfigured QueryClient with project-standard defaults.
 *
 * The client uses a 30-second query stale time, serializes dehydrated data with `superjson.serialize`,
 * deserializes hydrated data with `superjson.deserialize`, and treats queries with state `"pending"`
 * as eligible for dehydration in addition to the default criteria.
 *
 * @returns A configured QueryClient instance
 */
export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,
      },
      dehydrate: {
        serializeData: superjson.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
      hydrate: {
        deserializeData: superjson.deserialize,
      },
    },
  });
}