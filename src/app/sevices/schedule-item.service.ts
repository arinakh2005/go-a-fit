import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ScheduleItem } from '../types/ScheduleItem';
import { ResponseAPI } from '../types/ResponseAPI';

@Injectable()
export class ScheduleItemService {
  constructor(private readonly httpClient: HttpClient) { }

  public getScheduleItems(): Observable<ResponseAPI<ScheduleItem[]>> {
    const url = `${environment.baseUrl}/schedule-items`;

    return this.httpClient.get<ResponseAPI<ScheduleItem[]>>(url);
  }

  public createScheduleItem(scheduleItem: ScheduleItem): Observable<ResponseAPI<ScheduleItem>> {
    const url = `${environment.baseUrl}/schedule-items`;

    return this.httpClient.post<ResponseAPI<ScheduleItem>>(url, scheduleItem);
  }

  public updateScheduleItem(id: string, scheduleItem: ScheduleItem): Observable<ResponseAPI<ScheduleItem>> {
    const url = `${environment.baseUrl}/schedule-items/${id}`;

    return this.httpClient.put<ResponseAPI<ScheduleItem>>(url, scheduleItem);
  }
}
