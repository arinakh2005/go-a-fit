import { Athlete } from './Athlete';
import { GymSubscription } from './GymSubscription';
import { ActivityType } from '../enums/activity-type';

export type TrainingPackage = {
  beginningDate: Date,
  expirationDate: Date,
  totalTrainingsAmount: number,
  usedTrainingsAmount: number,
  missedTrainingsAmount: number,
  athlete?: Athlete,
  gymSubscription?: GymSubscription,
}

export type ActiveUserTrainingPackage = {
  title: string,
  description: string,
  beginningDate: Date,
  expirationDate: Date,
  activityType: ActivityType,
  totalTrainingsAmount: number,
  usedTrainingsAmount: number,
  missedTrainingsAmount: number,
}