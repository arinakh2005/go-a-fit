import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ResponseAPI } from '../types/ResponseAPI';
import { User, UserRegister, UserUpdate } from '../types/User';

@Injectable()
export class UserService {
  constructor(private readonly httpClient: HttpClient) { }

  public getUsers(): Observable<ResponseAPI<User[]>> {
    const url = `${environment.baseUrl}/users`;

    return this.httpClient.get<ResponseAPI<User[]>>(url);
  }

  public getUserById(id: string): Observable<ResponseAPI<User>> {
    const url = `${environment.baseUrl}/users/${id}`;

    return this.httpClient.get<ResponseAPI<User>>(url);
  }

  public createUser(userRegister: UserRegister): Observable<ResponseAPI<User>> {
    const url = `${environment.baseUrl}/users`;

    return this.httpClient.post<ResponseAPI<User>>(url, userRegister);
  }

  public updateUser(id: string, user: UserUpdate): Observable<ResponseAPI<User>> {
    const url = `${environment.baseUrl}/users/${id}`;

    return this.httpClient.put<ResponseAPI<User>>(url, user);
  }

  public deleteUser(id: string): Observable<ResponseAPI<unknown>> {
    const url = `${environment.baseUrl}/users/${id}`;

    return this.httpClient.delete<ResponseAPI<unknown>>(url);
  }

  public uploadAvatar(userId: string, file: File): Observable<ResponseAPI<string>> {
    const url = `${environment.baseUrl}/users/avatar-upload`;
    const formData = new FormData();
    const headers = new HttpHeaders();

    formData.append('image', file, file.name);
    formData.append('userId', userId);
    headers.append('Accept', 'application/json');
    headers.append('enctype', 'multipart/form-data');

    return this.httpClient.post<ResponseAPI<string>>(url, formData, { headers });
  }
}
