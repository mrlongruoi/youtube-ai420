"use client";

import { DEAFAULT_LIMIT } from "@/constants";
import { trpc } from "@/trpc/client";

export const VideoSection = () => {
    const [data] = trpc.studio.getMany.useSuspenseInfiniteQuery({
      limit: DEAFAULT_LIMIT,
    }, {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

  return (
    <div>
      {JSON.stringify(data, null, 2)}
    </div>
  )
}