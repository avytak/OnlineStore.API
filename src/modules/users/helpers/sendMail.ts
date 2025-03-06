import { TypeMailParams } from '@app/types/TypeMailParams';
import 'dotenv/config';
import nodemailer from 'nodemailer';
import { SentMessageInfo } from 'nodemailer';

const { UKR_NET_PASSWORD, UKR_NET_EMAIL } = process.env;
const transporter: nodemailer.Transporter = nodemailer.createTransport({
  host: 'smtp.ukr.net',
  port: 465,
  secure: true,
  auth: {
    user: UKR_NET_EMAIL,
    pass: UKR_NET_PASSWORD,
  },
});

export async function sendMail(
  data: Omit<TypeMailParams, 'from'>
): Promise<SentMessageInfo> {
  const { receiver, theme, markup } = data;
  const email = {
    to: receiver,
    subject: theme,
    html: markup,
    from: UKR_NET_EMAIL,
  };
  return await transporter.sendMail(email);
}
