import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class ApiService<TRequest, TResponse> {
  private apiUrl = 'http://localhost:3000/';

  constructor(
    private http: HttpClient,
    protected endpoint: string,
  ) {}

  get(): Observable<TResponse> {
    return this.http.get<TResponse>(`${this.apiUrl}${this.endpoint}`);
  }

  post(request: TRequest): Observable<TResponse> {
    return this.http.post<TResponse>(`${this.apiUrl}${this.endpoint}`, request);
  }

  put(request: TRequest): Observable<TResponse> {
    return this.http.put<TResponse>(`${this.apiUrl}${this.endpoint}`, request);
  }

  delete(id: number): Observable<TResponse> {
    return this.http.delete<TResponse>(`${this.apiUrl}${this.endpoint}/${id}`);
  }
}
