import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';  // Full URL to the backend API

  constructor(private http: HttpClient) {}

  // Method to create a new user
createUser(username: string, password: string, roles: string): Observable<any> {
  // Pass parameters as query string
  const params = `?username=${username}&password=${password}&roles=${roles}`;
  return this.http.post<any>(`${this.apiUrl}/create${params}`, {});  // POST to /create with query params
}
  // Method to update user information
  updateUser(username: string, newPassword: string, newRoles: string | null): Observable<any> {
    const updateData = { username, newPassword, newRoles };
    return this.http.put<any>(`${this.apiUrl}/update`, updateData);  // PUT to /update
  }

  // Method to delete a user
  deleteUser(username: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete?username=${username}`);  // DELETE to /delete
  }

  // Method to check if user exists
  getUser(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/exists?username=${username}`);  // GET to /exists
  }

  // Method to assign a role to a user
  assignRoleToUser(username: string, role: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/assign-role?username=${username}&role=${role}`, {});  // POST to /assign-role
  }

  // Method to set a user's quota
  setUserQuota(username: string, quota: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/set-quota?username=${username}&quota=${quota}`, {});  // POST to /set-quota
  }

  // Method to create a tablespace for the user
  createTablespaceForUser(tablespaceName: string, username: string, sizeInMB: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create-tablespace?tablespaceName=${tablespaceName}&username=${username}&sizeInMB=${sizeInMB}`, {});  // POST to /create-tablespace
  }
}
