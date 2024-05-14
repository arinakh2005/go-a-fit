import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ResponseAPI } from '../types/ResponseAPI';
import { User, UserRegister, UserUpdate } from '../types/User';
import { Group, GroupAttendanceJournal } from '../types/Group';

@Injectable()
export class GroupService {
  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  public getGroupsDetailed(): Observable<ResponseAPI<Group[]>> {
    const url = `${environment.baseUrl}/groups`;
    const params = new HttpParams().set('detailed', true)

    return this.httpClient.get<ResponseAPI<Group[]>>(url, { params });
  }

  public getCoachGroupsByUserId(id: string): Observable<ResponseAPI<Group[]>> {
    const url = `${environment.baseUrl}/groups/coach`;
    const params = new HttpParams().set('id', id)

    return this.httpClient.get<ResponseAPI<Group[]>>(url, { params });
  }

  public getAthleteGroupsByUserId(id: string): Observable<ResponseAPI<Group[]>> {
    const url = `${environment.baseUrl}/groups/athlete${id}`;

    return this.httpClient.get<ResponseAPI<Group[]>>(url);
  }

  public getGroupAttendanceJournal(groupId: string, month: number, year: number): Observable<ResponseAPI<GroupAttendanceJournal>> {
    const url = `${environment.baseUrl}/groups/attendance-journal`;
    const params = new HttpParams()
      .set('groupId', groupId)
      .set('month', month)
      .set('year', year);

    return this.httpClient.get<ResponseAPI<GroupAttendanceJournal>>(url, { params });
  }

  public createGroup(userRegister: UserRegister): Observable<ResponseAPI<User>> {
    const url = `${environment.baseUrl}/users`;

    return this.httpClient.post<ResponseAPI<User>>(url, userRegister);
  }

  public updateGroup(id: string, user: UserUpdate): Observable<ResponseAPI<User>> {
    const url = `${environment.baseUrl}/users/${id}`;

    return this.httpClient.put<ResponseAPI<User>>(url, user);
  }

  public deleteUser(id: string): Observable<ResponseAPI<unknown>> {
    const url = `${environment.baseUrl}/users/${id}`;

    return this.httpClient.delete<ResponseAPI<unknown>>(url);
  }
}
