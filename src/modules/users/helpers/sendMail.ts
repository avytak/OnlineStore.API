import { TypeMailParams } from '@app/types/TypeMailParams';
import 'dotenv/config';
import * as nodemailer from 'nodemailer';

const { UKR_NET_PASSWORD, UKR_NET_EMAIL } = process.env;
const transporter = nodemailer.createTransport({
  host: 'smtp.ukr.net',
  port: 465,
  secure: true,
  auth: {
    user: UKR_NET_EMAIL,
    pass: UKR_NET_PASSWORD,
  },
});
export async function sendMail(data: Omit<TypeMailParams, 'from'>) {
  const { receiver, theme, markup } = data;
  const email = {
    to: receiver,
    subject: theme,
    html: markup,
    from: UKR_NET_EMAIL,
  };
  return await transporter.sendMail(email);
}
