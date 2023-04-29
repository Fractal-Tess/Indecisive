import type { Actions } from "./$types";
import { sendEmailToIndecisiveOfficer } from "./email";
import { z } from "zod";
// const createEmailHtml = (formDate: FormData) => {};

const validation = z.object({
  name: z.string().optional(),
  age: z.coerce.number().optional(),
  country: z.string().optional(),
  discord: z.string(),
  ign_name: z.string(),
  "class/spec": z.string().optional(),
  ui_screenshot: z.string().url(),
  join_reason: z.string().optional(),
  experience: z.string().optional(),
  notes: z.string().optional(),
});

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const data = validation.safeParse(Object.fromEntries(formData));
    if (!data.success) {
      console.log("wrong info");
      return false;
    }
    console.log(data);

    // Validate form data
    // const html = createEmailHtml(formData);
    sendEmailToIndecisiveOfficer(data.data);

    return {
      success: true,
    };
  },
} as Actions;
