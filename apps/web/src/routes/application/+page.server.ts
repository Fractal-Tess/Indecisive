import type { Actions, PageServerLoad } from './$types';
import { saveApplication } from '$lib/pocketbase/models/application';
import { pocketbaseImageToUrl } from '$lib/pocketbase/utils';
import { validator } from '$lib/validation/application';
import { pb } from '$lib/pocketbase/pocketbase';
import { sendApplicationToApplicationChat } from '$lib/trpc/application';
import type { Record } from 'pocketbase';

type TextItem = Record & {
  content: string;
};

export const load = (async () => {
  const disclaimer = await pb
    .collection('CMS')
    .getFirstListItem<TextItem>("unit='application_disclaimer_page'");
  const wanted = await pb
    .collection('CMS')
    .getFirstListItem<TextItem>("unit='wanted_classes'");

  return {
    disclaimerContent: disclaimer.content,
    wantedContent: wanted.content
  };
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const application = await validator.safeParseAsync(
      Object.fromEntries(formData.entries())
    );

    if (!application.success) {
      console.error(application.error.formErrors);
      return {
        success: false,
        errors: application.error.formErrors
      };
    }

    const pbRecord = await saveApplication(application.data);
    const uiSreenshot = pocketbaseImageToUrl(pbRecord, pbRecord.uiScreenshot);
    await sendApplicationToApplicationChat(application.data, uiSreenshot);

    return {
      success: true,
      errors: {}
    };
  }
} as Actions;
