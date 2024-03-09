import { Injectable } from '@angular/core';
import { Group } from '../types/Group';
import { Coach } from '../types/Coach';
import { take } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Athlete } from '../types/Athlete';
import { ResponseAPI } from '../types/ResponseAPI';

@Injectable()
export class GlobalService {
  public groups: Group[] = [];
  public coaches: Coach[] = [];
  public athletes: Athlete[] = [];

  constructor(private readonly httpClient: HttpClient) {
    this.getAthletes();
    this.getCoaches();
    this.getGroups();
  }

  public getCoaches(): void {
    this.coaches = [];
    this.httpClient.get<ResponseAPI<Coach[]>>(`${environment.baseUrl}/coaches`)
      .pipe(take(1))
      .subscribe((response) => {
        if (response.status !== 'success') return;

        const coachesResult = response.result || [];
        coachesResult.forEach((coach) => coach.fullName = `${coach.user.name} ${coach.user.surname}`);
        this.coaches = coachesResult;
      });
  }

  public getAthletes(): void {
    this.athletes = [];
    this.httpClient.get<ResponseAPI<Athlete[]>>(`${environment.baseUrl}/athletes`)
      .pipe(take(1))
      .subscribe((response) => {
        if (response.status !== 'success') return;

        const athletesResult = response.result || [];
        athletesResult.forEach((athlete) => athlete.fullName = `${athlete.user.name} ${athlete.user.surname}`);
        this.athletes = athletesResult;
      });
  }

  public getGroups(): void {
    this.groups = [];
    this.httpClient.get<ResponseAPI<Group[]>>(`${environment.baseUrl}/groups`)
      .pipe(take(1))
      .subscribe((response) => {
        if (response.status !== 'success') return;

        this.groups = response.result || [];
      });
  }
}
