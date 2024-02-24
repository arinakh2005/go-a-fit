import { TrainingStatus } from '../enums/training-status.enum';
import { Group } from './Group';
import { Coach } from './Coach';

export type TrainingEvent = {
  startAt: string,
  endAt: string,
  status: TrainingStatus,
  group: Group,
  conductedCoach: Coach,
}