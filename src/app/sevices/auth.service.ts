import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseAPI } from '../types/ResponseAPI';
import { UserAuthorized, UserLogin, UserRetrieve } from '../types/User';
import { environment } from '../../environments/environment';
import { LocalStorageUtil } from '../utils/local-storage.util';

@Injectable()
export class AuthService {
  private readonly JWT_TOKEN = 'jwt_token';
  private readonly tokenStorage: LocalStorageUtil<string>;

  constructor(private readonly httpClient: HttpClient) {
    this.tokenStorage = new LocalStorageUtil<string>(this.JWT_TOKEN);
  }

  public getAuthorizedUser(): Observable<ResponseAPI<UserRetrieve>> {
    const url = `${environment.baseUrl}/auth/user`;

    return this.httpClient.get<ResponseAPI<UserRetrieve>>(url);
  }

  public login(userLogin: UserLogin): Observable<ResponseAPI<UserAuthorized>> {
    const url = `${environment.baseUrl}/auth/login`;

    return this.httpClient.post<ResponseAPI<UserAuthorized>>(url, userLogin, { withCredentials: true });
  }

  public logout(): Observable<ResponseAPI<string>> {
    const url = `${environment.baseUrl}/auth/logout`;

    return this.httpClient.post<ResponseAPI<string>>(url, { withCredentials: true });
  }

  public setJwtToken(token: string): void {
    this.tokenStorage.save(token);
  }

  public getJwtToken(): string | undefined {
    return this.tokenStorage.get();
  }

  public clearJwtToken(): void {
    this.tokenStorage.clear();
  }
}