import { User } from './User';

export type Coach = {
  id: string,
  createdAt: string,
  updatedAt: string,
  deletedAt: string | null,
  user: User,
}