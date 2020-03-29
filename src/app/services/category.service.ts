import { Injectable } from '@angular/core';
import {Category, SearchParams, Stats, User} from '../models/interface';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getStats() {
    return this.http.get<Stats>(`${environment.apiUrl}/api/v1/knuvote/category/stats`);
  }

  createCategory(category: Category) {
    return this.http.post<Category>(`${environment.apiUrl}/api/v1/knuvote/category/create/`, category);
  }

  getCategories(searchParams: SearchParams) {
    return this.http.get<Category[]>(`${environment.apiUrl}/api/v1/knuvote/category/all/`,
      {params: searchParams as any});
  }

  getCategory(categoryId: number) {
    return this.http.get<Category>(`${environment.apiUrl}/api/v1/knuvote/category/?id=${categoryId}`);
  }

  editCategory(category: Category) {
    return this.http.post<Category>(`${environment.apiUrl}/api/v1/knuvote/category/edit/`, category);
  }

  vote(categoryId: number, candidateId: number) {
    return this.http.post<Category>(
      `${environment.apiUrl}/api/v1/knuvote/category/${categoryId}/vote/${candidateId}/`, categoryId);
  }

  getVote(categoryId: number) {
    return this.http.get<Category>(`${environment.apiUrl}/api/v1/knuvote/category/${categoryId}/get-vote/`);
  }
}
