import "@tanstack/react-start/server-only";
import nodemailer from "nodemailer";
import type { ReactElement } from "react";
import { render } from "react-email";
import { serverEnv } from "@/env/server";

const globalForMail = globalThis as {
  transporter?: nodemailer.Transporter;
};

const getTransporter = () => {
  globalForMail.transporter ??= nodemailer.createTransport({
    host: serverEnv.SMTP_HOST,
    port: serverEnv.SMTP_PORT,
    secure: serverEnv.SMTP_PORT === 465,
    auth: {
      user: serverEnv.SMTP_USER,
      pass: serverEnv.SMTP_PASSWORD,
    },
  });

  return globalForMail.transporter;
};

export async function sendEmail({
  to,
  subject,
  react,
}: {
  to: string;
  subject: string;
  react: ReactElement;
}) {
  const html = await render(react);

  await getTransporter().sendMail({
    from: serverEnv.EMAIL_FROM,
    to,
    subject,
    html,
  });
}
