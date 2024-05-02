import { User } from './User';

export type Coach = {
  id: string,
  createdAt: string,
  updatedAt: string,
  deletedAt: string | null,
  user: User,
  fullName: string,
  activities: string,
  education: string,
  rewards?: string,
  motto: string,
}