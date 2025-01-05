import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn:'root'
})
export class OptimizationService {

  private apiUrl = 'http://localhost:8080/api/optimization';
  constructor(private http: HttpClient) { }

  // recuperer les requetes lentes
  getSlowQueries(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/slow-queries`);
  }

  // optimiser une requete specifique
  optimizeQuery(sqlId: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/slow-queries/${sqlId}`);
  }
}
