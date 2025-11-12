import { createTRPCRouter } from "../init";
import { studioRouter } from "@/modules/studio/server/procedures";
import { categoriesRouter } from "@/modules/categories/server/procedures";
import { videoRouter } from "@/modules/videos/server/procedures";

export const appRouter = createTRPCRouter({
  studio: studioRouter,
  videos: videoRouter,
  categories: categoriesRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
