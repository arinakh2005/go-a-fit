import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ResponseAPI } from '../types/ResponseAPI';
import { ActiveUserTrainingPackage } from '../types/TrainingPackage';

@Injectable()
export class TrainingPackageService {
  constructor(private readonly httpClient: HttpClient) { }

  public getActiveUserPackages(userId: string): Observable<ResponseAPI<ActiveUserTrainingPackage>> {
    const url = `${environment.baseUrl}/training-packages/user/active`;
    const params = new HttpParams().set('userId', userId)

    return this.httpClient.get<ResponseAPI<ActiveUserTrainingPackage>>(url, { params });
  }
}
