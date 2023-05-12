import type { Application } from "$lib/validation/application";
import { trpc } from "./client";

export const sendApplicationToApplicationChat = async (
  application: Application,
  uiImageUrl: string
) => {
  await trpc.application.new.mutate({
    ...application,
    uiImageUrl,
  });
};
