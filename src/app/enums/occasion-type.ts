export enum OccasionType {
  GroupTraining = 'GroupTraining',
  PersonalTraining = 'PersonalTraining',
  Holiday = 'Holiday',
  Competition = 'Competition',
  Other = 'Other',
}

export const OccasionTypeLabels = new Map([
  [OccasionType.GroupTraining, 'Групове заняття'],
  [OccasionType.PersonalTraining, 'Індивідуальне заняття'],
  [OccasionType.Holiday, 'Вихідний'],
  [OccasionType.Competition, 'Змагання'],
  [OccasionType.Other, 'Інше'],
]);