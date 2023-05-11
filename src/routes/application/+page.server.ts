import type { Actions, PageServerLoad } from "./$types";
import { saveApplicationToDatabase } from "$lib/pocketbase/utils";
import { recordImageToUrl } from "$lib/pocketbase/publicUtils";
import { validator } from "$lib/validation/application";
import type { PocketbaseRecord } from "$lib/types";
import { pb } from "$lib/pocketbase/pocketbase";
import { sendApplicationToApplicationChat } from "$lib/discord/utils";

interface TextItem extends PocketbaseRecord {
  content: string;
}

interface ApplicationItem extends PocketbaseRecord {
  age: number;
  attendRaidDaysNotes: string;
  classAndSpec: string;
  country: string;
  discord: string;
  experience: string;
  inGameName: string;
  joinReason: string;
  name: string;
  notes: string;
  uiScreenshot: string;
  willingToPlayAnotherClass: string;
  willingToPlayAnotherClassNotes: string;
}

export const load = (async () => {
  const disclaimer = await pb
    .collection("text")
    .getFirstListItem<TextItem>("unit='application_disclaimer_page'");
  const wanted = await pb
    .collection("text")
    .getFirstListItem<TextItem>("unit='wanted_classes'");

  return {
    disclaimerContent: disclaimer.content,
    wantedContent: wanted.content,
  };
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const pojo = Object.fromEntries(formData.entries());
    const applicationRecord = await validator.safeParseAsync(pojo);

    if (!applicationRecord.success) {
      console.log(applicationRecord.error.formErrors);
      return {
        success: false,
        errors: applicationRecord.error.formErrors,
      };
    }

    const dbRecord = (await saveApplicationToDatabase(
      applicationRecord.data
    )) as unknown as ApplicationItem;
    const uiSreenshot = recordImageToUrl(dbRecord, dbRecord.uiScreenshot);
    await sendApplicationToApplicationChat(applicationRecord.data, uiSreenshot);

    return {
      success: true,
      errors: {},
    };
  },
} as Actions;
