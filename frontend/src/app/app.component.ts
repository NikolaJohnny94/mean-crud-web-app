import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ApiService } from './services/api.service';
import type { User } from './types/user/User.type';
import { SharedService } from './services/shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  users!: User[];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private sharedSerive: SharedService
  ) {}

  ngOnInit() {
    this.apiService
      .getUsers()
      .subscribe((payload) => (this.users = payload.data));

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.sharedSerive.currentRoute.next(event.url);
      }
    });
  }
}
