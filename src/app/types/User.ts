import { SystemRole } from '../enums/system-role.enum';

export type User = {
  id: string,
  createdAt: string,
  updatedAt: string,
  deletedAt: string | null,
  name: string,
  surname: string,
  patronymic: string | null,
  dateOfBirth: string,
  email: string,
  username: string,
  password: string,
  imageUrl: string | null,
  systemRole: SystemRole,
  fitCentAmount: number,
}