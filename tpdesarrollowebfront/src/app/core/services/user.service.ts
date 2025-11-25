import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  list(): Observable<any[]> {
    return this.http.get<any[]>(environment.api.users);
  }

  get(id: string): Observable<any> {
    return this.http.get<any>(`${environment.api.users}/${id}`);
  }

  update(id: string, payload: Partial<any>): Observable<any> {
    return this.http.put(`${environment.api.users}/${id}`, payload);
  }
}
