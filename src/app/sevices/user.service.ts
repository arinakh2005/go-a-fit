import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ResponseAPI } from '../types/ResponseAPI';
import { User, UserRegister, UserUpdate } from '../types/User';
import { LocalStorageUtil } from '../utils/local-storage.util';
import { Router } from '@angular/router';
import { SystemRole } from '../enums/system-role.enum';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { RouterPaths } from '../app-routing.module';

@Injectable()
export class UserService {
  public menuItems: MenuItem[] = [];
  private readonly USER = 'user';
  private readonly storage = new LocalStorageUtil<User>(this.USER);

  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router,
  ) { }

  public get user(): User | null {
    const user = this.storage.get();

    if (!user) {
      this.reset();
      this.menuItems = [];
      this.router.navigate(['/login']);
    }

    return user || null;
  }

  public set user(user: User) {
    this.storage.save(user);
    this.initMenuOptions();
  }

  public reset(): void {
    this.menuItems = [];
    this.storage.clear();
  }

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

  public initMenuOptions(): void {
    this.menuItems = [];

    if (this.user?.systemRole === SystemRole.Admin) {
      this.menuItems.push(...this.getAdminMenuOptions());
    } else if (this.user?.systemRole === SystemRole.Coach) {
      this.menuItems.push(...this.getCoachMenuOptions());
    } else {
      this.menuItems.push(...this.getAthleteMenuOptions());
    }
  }

  private getAdminMenuOptions(): MenuItem[] {
    return [
      { label: 'Головна', icon: PrimeIcons.HOME, routerLink: RouterPaths.DEFAULT },
      { label: 'Розклад', icon: PrimeIcons.CALENDAR, routerLink: RouterPaths.SCHEDULE },
      { label: 'Відвідуваність', icon: PrimeIcons.TABLE, routerLink: RouterPaths.ATTENDANCE_TRACKER },
      { label: 'Тренери', icon: PrimeIcons.ID_CARD, routerLink: RouterPaths.COACHES },
      { label: 'Користувачі', icon: PrimeIcons.USERS, routerLink: RouterPaths.USERS },
      { label: 'Fit-Gifts', icon: PrimeIcons.GIFT, routerLink: RouterPaths.FIT_PRODUCTS },
    ];
  }

  private getCoachMenuOptions(): MenuItem[] {
    return [
      { label: 'Головна', icon: PrimeIcons.HOME, routerLink: RouterPaths.DEFAULT },
      { label: 'Розклад', icon: PrimeIcons.CALENDAR, routerLink: RouterPaths.SCHEDULE },
      { label: 'Відвідуваність', icon: PrimeIcons.TABLE, routerLink: RouterPaths.ATTENDANCE_TRACKER },
      { label: 'Тренери', icon: PrimeIcons.ID_CARD, routerLink: RouterPaths.COACHES },
      { label: 'Користувачі', icon: PrimeIcons.USERS, routerLink: RouterPaths.USERS },
      { label: 'Fit-Gifts', icon: PrimeIcons.GIFT, routerLink: RouterPaths.FIT_PRODUCTS },
    ];
  }

  private getAthleteMenuOptions(): MenuItem[] {
    return [
      { label: 'Головна', icon: PrimeIcons.HOME, routerLink: RouterPaths.DEFAULT },
      { label: 'Тренування', icon: PrimeIcons.BOLT,
        items: [
          { label: 'Перегляд власної активності', icon: PrimeIcons.CHART_BAR, routerLink: RouterPaths.PERSONAL_ACTIVITIES },
          { label: 'Запит на відпрацювання', icon: PrimeIcons.HOURGLASS },
        ],
      },
      { label: 'Розклад', icon: PrimeIcons.CALENDAR, routerLink: RouterPaths.SCHEDULE },
      { label: 'Тренери', icon: PrimeIcons.ID_CARD, routerLink: RouterPaths.COACHES },
      { label: 'Fit-Gifts', icon: PrimeIcons.GIFT, routerLink: RouterPaths.FIT_PRODUCTS },
    ];
  }
}
