import { env } from "$env/dynamic/private";
import sg from "@sendgrid/mail";

sg.setApiKey(env.SENDGRID_KEY);

export const sendApplicationToEmails = async (data: FormData) => {
  const text = createText(data);
  const email = {
    to: env.RECEIVER_EMAIL,
    from: "indisicive.wow@gmail.com",
    subject: "New Indecisive application",
    text,
  };

  sg.send(email);
};

const createText = (data: FormData) => {
  let text = "";

  for (const [key, val] of data.entries()) {
    text += `${key}: <strong>${val || "empty"}</strong>`;
    text += `<br>`;
  }

  return text;
};
