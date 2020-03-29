import { Injectable } from '@angular/core';
import {User} from '../models/interface';
import {HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registration(user: User) {
    return this.http.post<User>(`${environment.apiUrl}/api/v1/knuvote/user/registration/`, user);
  }

  getProfile(userId: number) {
    return this.http.get<User>(`${environment.apiUrl}/api/v1/knuvote/user/profile/?id=${userId}`);
  }

  editProfile(user: User) {
    return this.http.post<User>(`${environment.apiUrl}/api/v1/knuvote/user/edit-profile/`, user);
  }
}
