import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackupService {
  private apiUrl = 'http://localhost:8080/api/backup'; // URL de base

  constructor(private http: HttpClient) {}

  getBackupHistory(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/history`);
  }

  triggerFullBackup(): Observable<string> { // Type de retour : string
    return this.http.post<string>(`${this.apiUrl}/full`, {}, { responseType: 'text' as 'json'});
  }

  triggerIncrementalBackup(): Observable<string> { // Type de retour : string
    return this.http.post<string>(`${this.apiUrl}/incremental`, {}, { responseType: 'text' as 'json'});
  }
}
