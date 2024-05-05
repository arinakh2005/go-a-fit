import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class TrainingService {
  constructor(private readonly httpClient: HttpClient) { }

  // public getAll(): Observable<TrainingEvent[]> {
  //   const url = `${environment.baseUrl}/trainings`;
  //
  //   return this.httpClient.get<TrainingEvent[]>(url);
  // }
}
