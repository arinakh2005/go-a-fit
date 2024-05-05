import { SystemRole } from '../enums/system-role.enum';
import { Athlete } from './Athlete';
import { Coach } from './Coach';
import { FitOrder } from './FitOrder';

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
  password?: string,
  imageUrl: string | null,
  systemRole: SystemRole,
  fitCentAmount: number,
  athlete?: Athlete,
  coach?: Coach,
  fitOrders?: FitOrder[],
}

export type UserRegister = Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'fitCentAmount'>;

export type UserUpdate = Omit<User, 'createdAt' | 'updatedAt' | 'deletedAt'>;

export type UserRetrieve = Omit<User, 'password'>;

export type UserLogin = Pick<User, 'username' | 'password'>;

export type UserAuthorized = { user: UserRetrieve, authToken: string };