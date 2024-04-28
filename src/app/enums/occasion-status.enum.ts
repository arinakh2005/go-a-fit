export enum OccasionStatus {
  Planned = 'Заплановано',
  Completed = 'Завершено',
  Cancelled = 'Відмінено',
}

export const OccasionStatusStyleClass = new Map([
  [OccasionStatus.Planned, 'bg-planned'],
  [OccasionStatus.Completed, 'bg-completed'],
  [OccasionStatus.Cancelled, 'bg-cancelled'],
]);