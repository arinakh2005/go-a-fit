export enum FitProductAvailability {
  InStock = 'В наявності',
  OutOfStock = 'Товар відсутній',
  SoonInStock = 'Незабаром з\'явиться',
}

export const FitProductAvailabilityStatus = new Map([
  [FitProductAvailability.InStock, 'success'],
  [FitProductAvailability.OutOfStock, 'danger'],
  [FitProductAvailability.SoonInStock, 'warning'],
]);
