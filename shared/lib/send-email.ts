import { ReactNode } from "react";
import { Resend } from "resend";

interface Props {
  to: string;
  subject: string;
  template: ReactNode;
}

export async function sendEmail({ to, subject, template }: Props) {
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject,
      react: template,
    });

    if (error) {
      // return Response.json({ error }, { status: 500 });
      throw error;
    }

    // return Response.json(data);
    return "https://www.google.com/";
  } catch (error) {
    // return Response.json({ error }, { status: 500 });
    throw error;
  }
}
