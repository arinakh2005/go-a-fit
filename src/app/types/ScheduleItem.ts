import { OccasionType } from '../enums/occasion-type';

export type ScheduleItem = {
  id?: string;
  start: Date | string;
  end: Date | string;
  title: string;
  occasionType: OccasionType,
  isAllDay?: boolean;
  coachId?: string,
  athleteId?: string,
  groupId?: string,
}