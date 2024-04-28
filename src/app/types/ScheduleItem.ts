import { OccasionType } from '../enums/occasion-type';
import { Group } from './Group';
import { OccasionStatus } from '../enums/occasion-status.enum';

export type ScheduleItem = {
  id?: string;
  start: Date | string;
  end: Date | string;
  title: string;
  occasionType: OccasionType,
  occasionStatus: OccasionStatus,
  isAllDay?: boolean;
  coachId?: string,
  athleteId?: string,
  groupId?: string,
  group?: Group,
}