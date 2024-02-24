export enum TrainingStatus {
  Planned = 'Planned',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
}

export const TrainingStatusStyleClass = new Map([
  [TrainingStatus.Planned, 'bg-planned'],
  [TrainingStatus.Completed, 'bg-completed'],
  [TrainingStatus.Cancelled, 'bg-cancelled'],
]);