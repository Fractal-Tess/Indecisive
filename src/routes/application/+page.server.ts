import type { Actions, PageServerLoad } from "./$types";
import {
  pb,
  recordImageToUrl,
  saveApplicationToDatabase,
} from "$lib/pocketbase";
import { sendApplicationToApplicationChat } from "$lib/discord";
import { sendApplicationToEmails } from "$lib/email";
import { validator } from "$lib/validation/application";
import type { PocketbaseRecord } from "$lib/types";

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
    try {
      await Promise.allSettled([
        sendApplicationToApplicationChat(applicationRecord.data, uiSreenshot),
        sendApplicationToEmails(formData),
      ]);
    } catch (error) {
      console.error(error);
    }

    return {
      success: true,
      errors: {},
    };
  },
} as Actions;
