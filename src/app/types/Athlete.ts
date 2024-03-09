import { User } from './User';
import { Group } from './Group';

export type Athlete = {
  id: string,
  createdAt: string,
  updatedAt: string,
  deletedAt: string | null,
  user: User,
  group: Group,
  fullName: string,
}