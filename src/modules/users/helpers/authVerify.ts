import { sendMail } from '@app/modules/users/helpers/sendMail';
import { TypeMailParams } from '@app/types/TypeMailParams';

export async function authVerify(mailData: TypeMailParams) {
  const { receiver, markup, theme } = mailData;
  await sendMail({ receiver, markup, theme }).catch(console.error);
}
