import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Repo } from '../interfaces/Repo.interface';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService {

  constructor(private http: HttpClient) { }

  getRepositoriesOfTheUser(userName: string, page: number | 1, perPage: number | 10): Observable<Array<Repo>>{
    return this.http.get<Array<Repo>>(`https://api.github.com/users/${userName}/repos?page=${page}&per_page=${perPage}`);
  }

}
