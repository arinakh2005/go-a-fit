import { User } from './User';
import { Group } from './Group';
import { TrainingPackage } from './TrainingPackage';

export type Athlete = {
  id: string,
  createdAt: string,
  updatedAt: string,
  deletedAt: string | null,
  user: User,
  group: Group,
  fullName: string,
  trainingPackages?: TrainingPackage[],
}

export type AthleteAttendanceDto = {
  groupId?: string;
  athleteId: string;
  fullName: string;
}