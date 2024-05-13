import { Athlete } from './Athlete';
import { Group } from './Group';
import { Coach } from './Coach';

export type UserAttendance = {
  id: string,
  createdAt: string,
  updatedAt: string,
  deletedAt: string | null,
  startAt: string,
  endAt: string,
  isVisited: boolean,
  isWorkingOffAllowed: boolean,
  group?: Group,
  conductedCoach?: Coach,
  athlete?: Athlete,
}