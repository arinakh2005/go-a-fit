import { Athlete, AthleteAttendanceDto } from './Athlete';

export type Group = {
  id: string,
  createdAt: string,
  updatedAt: string,
  deletedAt: string | null,
  title: string,
  description: string,
  color: string,
  athletes?: Athlete[],
}

export type GroupAttendanceJournal = {
  groupId: string,
  athletesAttendances: AthleteAttendanceDto[],
  trainingDates: string[],
}