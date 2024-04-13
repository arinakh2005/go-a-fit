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
  phone: string,
  username: string,
  password: string,
  imageUrl: string | null,
  systemRole: SystemRole,
  fitCentAmount: number,
}

export type UserRegister = Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'fitCentAmount'>;

export type UserUpdate = Omit<User, 'createdAt' | 'updatedAt' | 'deletedAt'>;