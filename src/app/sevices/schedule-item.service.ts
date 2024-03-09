import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ScheduleItem } from '../types/ScheduleItem';

@Injectable()
export class ScheduleItemService {
  constructor(private readonly httpClient: HttpClient) { }

  public getScheduleItems(): Observable<ScheduleItem[]> {
    const url = `${environment.baseUrl}/schedule-items`;

    return this.httpClient.get<ScheduleItem[]>(url);
  }

  public createScheduleItem(scheduleItem: ScheduleItem): Observable<ScheduleItem> {
    const url = `${environment.baseUrl}/schedule-items`;

    return this.httpClient.post<ScheduleItem>(url, scheduleItem);
  }

  public updateScheduleItem(id: string, scheduleItem: ScheduleItem): Observable<ScheduleItem> {
    const url = `${environment.baseUrl}/schedule-items/${id}`;

    return this.httpClient.put<ScheduleItem>(url, scheduleItem);
  }
}
