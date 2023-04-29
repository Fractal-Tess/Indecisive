import { env } from "$env/dynamic/private";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(env.SENDGRID_KEY);

export const sendEmailToIndecisiveOfficer = async (data: unknown) => {
  const msg = {
    to: env.RECEIVER_EMAIL,
    from: "indisicive.wow@gmail.com",
    subject: "new indecisive application",
    text: "and easy to do anywhere, even with Node.js",
    html: JSON.stringify(data),
  };

  try {
    const mailResult = await sgMail.send(msg);
  } catch (error) {
    console.error(error);
  }
};
