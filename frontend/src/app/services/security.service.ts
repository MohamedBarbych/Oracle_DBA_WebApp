import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  private baseUrl = 'http://localhost:8080/api/security'; // URL de base pour le backend

  constructor(private http: HttpClient) {}

  
  configureTDE(walletPassword: string): Observable<string> {
    const url = `${this.baseUrl}/configure-tde`;
    const params = { walletPassword };
    return this.http.post<string>(url, {}, { params });
  }


  enableSecurityAudit(): Observable<string> {
    const url = `${this.baseUrl}/enable-audit`;
    return this.http.post<string>(url, {});
  }

  createVPDPolicy(): Observable<string> {
    const url = `${this.baseUrl}/create-vpd-policy`;
    return this.http.post<string>(url, {});
  }


  createVPDPolicyFunction(): Observable<string> {
    const url = `${this.baseUrl}/create-vpd-policy-function`;
    return this.http.post<string>(url, {});
  }




}
