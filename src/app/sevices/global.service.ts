import { Injectable } from '@angular/core';
import { Group } from '../types/Group';
import { Coach } from '../types/Coach';
import { take } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Athlete } from '../types/Athlete';

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
    this.httpClient.get<Coach[]>(`${environment.baseUrl}/coaches`)
      .pipe(take(1))
      .subscribe((coaches) => {
        coaches.forEach((coach) => coach.fullName = `${coach.user.name} ${coach.user.surname}`);
        this.coaches = coaches;
      });
  }

  public getAthletes(): void {
    this.athletes = [];
    this.httpClient.get<Athlete[]>(`${environment.baseUrl}/athletes`)
      .pipe(take(1))
      .subscribe((athletes) => {
        athletes.forEach((athlete) => athlete.fullName = `${athlete.user.name} ${athlete.user.surname}`);
        this.athletes = athletes;
      });
  }

  public getGroups(): void {
    this.groups = [];
    this.httpClient.get<Group[]>(`${environment.baseUrl}/groups`)
      .pipe(take(1))
      .subscribe((groups) => this.groups = groups);
  }
}
