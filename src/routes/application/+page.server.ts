import type { Actions } from "./$types";
import { env } from "$env/dynamic/private";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(env.SENDGRID_KEY);

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    let html = "";

    for (const [key, val] of formData.entries()) {
      html += `${key}: <strong>${val || "empty"}</strong>`;
      html += `<br>`;
    }

    const msg = {
      to: env.RECEIVER_EMAIL,
      from: "indisicive.wow@gmail.com",
      subject: "New Indecisive application",
      html,
    };

    try {
      const mailResult = await sgMail.send(msg);
    } catch (error) {
      console.error(error);
    }

    return {
      success: true,
    };
  },
} as Actions;
