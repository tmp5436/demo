import { Injectable } from '@angular/core';
import {Candidate, Category, SearchParams, User} from '../models/interface';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private http: HttpClient) { }

  getCandidates(searchParams: SearchParams, categoryId: number) {
    return this.http.get<Candidate[]>(`${environment.apiUrl}/api/v1/knuvote/category/candidates/${categoryId}/`,
      {params: searchParams as any});
  }

  addCandidate(newCandidate: Candidate, categoryId: number) {
    return this.http.post<Candidate>(`${environment.apiUrl}/api/v1/knuvote/category/${categoryId}/add/`, newCandidate);
  }
}
