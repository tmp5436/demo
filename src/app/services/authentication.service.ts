import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import {User} from '../models/interface';
import {SocialUser} from 'angularx-social-login';

const headers = new HttpHeaders({'Content-Type': 'application/json'});

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  socialLogin(user: SocialUser) {
    return this.http.post<any>(`${environment.apiUrl}/api/v1/knuvote/user/social-login/`, user)
      .pipe(map(newUser => {
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        this.currentUserSubject.next(newUser);
        return newUser;
      }));
  }

  login(user: User) {
    return this.http.post<any>(`${environment.apiUrl}/api/v1/knuvote/user/login/`, user)
      .pipe(map(newUser => {
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        this.currentUserSubject.next(newUser);
        return newUser;
      }));
  }

  logoutUser() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
