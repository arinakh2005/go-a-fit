import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ResponseAPI } from '../types/ResponseAPI';
import { FitOrder, FitOrderUpsert } from '../types/FitOrder';
import { BracketProduct } from '../types/FitProduct';
import { LocalStorageUtil } from '../utils/local-storage.util';
import { UserRetrieve } from '../types/User';

@Injectable()
export class FitOrderService {
  private readonly BRACKET = 'bracket';
  private readonly bracketStorage = new LocalStorageUtil<BracketProduct[]>(this.BRACKET);

  constructor(private readonly httpClient: HttpClient) { }

  public get bracketProducts(): BracketProduct[] | null {
    const bracketProducts = this.bracketStorage.get();

    return bracketProducts || null;
  }

  public set bracketProducts(bracketProducts: BracketProduct[]) {
    this.bracketStorage.save(bracketProducts);
  }

  public clearBracket(): void {
    this.bracketStorage.clear();
  }

  public getFitOrders(): Observable<ResponseAPI<FitOrder[]>> {
    const url = `${environment.baseUrl}/fit-orders`;

    return this.httpClient.get<ResponseAPI<FitOrder[]>>(url);
  }

  public createFitOrder(fitOrder: FitOrderUpsert): Observable<ResponseAPI<UserRetrieve>> {
    const url = `${environment.baseUrl}/fit-orders`;

    return this.httpClient.post<ResponseAPI<UserRetrieve>>(url, fitOrder);
  }

  public updateFitOrder(id: string, fitOrder: FitOrder): Observable<ResponseAPI<FitOrder>> {
    const url = `${environment.baseUrl}/fit-orders/${id}`;

    return this.httpClient.put<ResponseAPI<FitOrder>>(url, fitOrder);
  }

  public deleteFitOrder(id: string): Observable<ResponseAPI<unknown>> {
    const url = `${environment.baseUrl}/fit-orders/${id}`;

    return this.httpClient.delete<ResponseAPI<unknown>>(url);
  }
}
