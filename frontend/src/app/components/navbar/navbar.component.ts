import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IconDefinition, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { SharedService } from 'src/app/services/shared/shared.service';
import { ADD_NEW_USER_BUTTON_TEXT } from 'src/constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  addNewUserButtonText: string = ADD_NEW_USER_BUTTON_TEXT;
  addNewUserIcon: IconDefinition = faUserPlus;
  currentRoute!: string;

  constructor(private sharedService: SharedService, private router: Router) {}

  ngOnInit(): void {
    this.sharedService.getCurrentRoute().subscribe((payload: string) => {
      this.currentRoute = payload;
    });
  }

  onChange(event: Event) {
    this.sharedService.searchedTerm.next(
      (event.target as HTMLInputElement).value
    );
  }

  goToAddNewUserPage(): void {
    this.router.navigate(['form']);
  }
}
