import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import type { UserFormData } from '../types/user/UserFormData.type';
import type { SingleUserResponse } from '../types/response/SingleUserResponse.type';
import type { UsersResponse } from '../types/response/UsersResponse.type';

@Injectable()
export class ApiService {
  private apiURL: string = 'http://localhost:5000/api/v1/users';

  singleUserResponse$!: Observable<SingleUserResponse>;
  usersResponse$!: Observable<UsersResponse>;

  constructor(private http: HttpClient) {}

  getUsers() {
    this.usersResponse$ = this.http.get<UsersResponse>(this.apiURL);
    return this.usersResponse$;
  }

  getUser(id: string | null) {
    this.singleUserResponse$ = this.http.get<SingleUserResponse>(
      `${this.apiURL}/${id}`
    );
    return this.singleUserResponse$;
  }

  addUser(user: UserFormData) {
    return this.http.post<SingleUserResponse>(this.apiURL, user);
  }

  updateUser(userId: string, user: UserFormData) {
    return this.http.put<SingleUserResponse>(`${this.apiURL}/${userId}`, user);
  }

  deleteUser(id: string) {
    return this.http.delete<SingleUserResponse>(`${this.apiURL}/${id}`);
  }
}
