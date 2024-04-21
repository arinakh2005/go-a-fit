import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ResponseAPI } from '../types/ResponseAPI';
import { FitProduct } from '../types/FitProduct';

@Injectable()
export class FitProductService {
  constructor(private readonly httpClient: HttpClient) { }

  public getFitProducts(): Observable<ResponseAPI<FitProduct[]>> {
    const url = `${environment.baseUrl}/fit-products`;

    return this.httpClient.get<ResponseAPI<FitProduct[]>>(url);
  }

  public createFitProduct(fitProduct: FitProduct): Observable<ResponseAPI<FitProduct>> {
    const url = `${environment.baseUrl}/fit-products`;

    return this.httpClient.post<ResponseAPI<FitProduct>>(url, fitProduct);
  }

  public updateFitProduct(id: string, fitProduct: FitProduct): Observable<ResponseAPI<FitProduct>> {
    const url = `${environment.baseUrl}/fit-products/${id}`;

    return this.httpClient.put<ResponseAPI<FitProduct>>(url, fitProduct);
  }

  public deleteFitProduct(id: string): Observable<ResponseAPI<unknown>> {
    const url = `${environment.baseUrl}/fit-products/${id}`;

    return this.httpClient.delete<ResponseAPI<unknown>>(url);
  }

  public uploadProductImage(productId: string, file: File): Observable<ResponseAPI<string>> {
    const url = `${environment.baseUrl}/fit-products/image-upload`;
    const formData = new FormData();
    const headers = new HttpHeaders();

    formData.append('image', file, file.name);
    formData.append('productId', productId);
    headers.append('Accept', 'application/json');
    headers.append('enctype', 'multipart/form-data');

    return this.httpClient.post<ResponseAPI<string>>(url, formData, { headers });
  }
}
