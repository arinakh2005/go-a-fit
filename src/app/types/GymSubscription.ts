import { ActivityType } from '../enums/activity-type';
import { TrainingPackage } from './TrainingPackage';

export type GymSubscription = {
  title: string,
  description: string,
  activityType: ActivityType,
  availableTrainings: number,
  trainingPackages?: TrainingPackage[],
}