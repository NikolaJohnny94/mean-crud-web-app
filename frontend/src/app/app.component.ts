import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import type { User } from './types/user/User.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  users!: User[];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService
      .getUsers()
      .subscribe((payload) => (this.users = payload.data));
  }
}
