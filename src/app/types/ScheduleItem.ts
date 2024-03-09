export type ScheduleItem = {
  id?: string;
  start: Date | string;
  end: Date | string;
  title: string;
  isAllDay?: boolean;
}