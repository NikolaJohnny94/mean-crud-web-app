import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared/shared.service';
import { ADD_NEW_USER_BUTTON_TEXT } from 'src/constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  addNewUserButtonText: string = ADD_NEW_USER_BUTTON_TEXT;

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {}

  onChange(event: any) {
    this.sharedService.searchedTerm.next(event.target.value);
  }
}
