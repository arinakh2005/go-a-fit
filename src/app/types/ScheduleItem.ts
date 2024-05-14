import { OccasionType } from '../enums/occasion-type';
import { Group } from './Group';
import { OccasionStatus } from '../enums/occasion-status.enum';
import { Coach } from './Coach';
import { Athlete } from './Athlete';

export type ScheduleItem = {
  id?: string;
  start: Date | string;
  end: Date | string;
  title: string;
  occasionType: OccasionType,
  occasionStatus: OccasionStatus,
  isAllDay?: boolean;
  coachId?: string,
  coach?: Coach,
  athleteId?: string,
  athlete?: Athlete,
  groupId?: string,
  group?: Group,
}