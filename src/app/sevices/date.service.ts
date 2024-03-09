import { Injectable } from '@angular/core';

@Injectable()
export class DateService {
  public static readonly dateTimePattern = 'dd-MM-yyyy HH:mm';

  public static formatToString(date?: Date | string | number | null): string {
    const dateToFormat = date ? new Date(date) : new Date();
    const day = dateToFormat.getDate().toString().padStart(2, '0');
    const month = (dateToFormat.getMonth() + 1).toString().padStart(2, '0');
    const year = dateToFormat.getFullYear().toString();
    const hours = dateToFormat.getHours().toString().padStart(2, '0');
    const minutes = dateToFormat.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  public static formatToISOString(stringToFormat: string): string {
    const [datePart, timePart] = stringToFormat.split(' ');
    const [day, month, year] = datePart.split('/');
    const [hours, minutes] = timePart.split(':');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
}
