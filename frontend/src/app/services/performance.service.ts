import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PerformanceService {

  private apiUrl = 'http://localhost:8080/api/performance';

  constructor(private http: HttpClient) { }

//------------ Method to get all performance data from the backend API ------------

getAWRReport(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/awr-report`);

}

getASHReport(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/ash-report`);
}

getResourceUsage(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/resource-usage`);
}


getRealtimeStats(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/realtime-stats`);

}




}
