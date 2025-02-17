import { SelectUser } from '@app/database/schema';
import { Role } from '@app/types/user';

export function payload(user: SelectUser) {
  return {
    id: user.id,
    email: user.email,
    role: user.role || Role.USER,
  };
}
