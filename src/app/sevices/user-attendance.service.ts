import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ResponseAPI } from '../types/ResponseAPI';
import { UserAttendance } from '../types/UserAttendance';

@Injectable()
export class UserAttendanceService {
  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  public getAttendancesByAthleteId(athleteId: string): Observable<ResponseAPI<UserAttendance[]>> {
    const url = `${environment.baseUrl}/users-attendances`;
    const params = new HttpParams()
      .set('athleteId', athleteId);

    return this.httpClient.get<ResponseAPI<UserAttendance[]>>(url, { params });
  }
}
