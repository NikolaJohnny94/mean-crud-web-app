import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {}

  onChange(event: any) {
    this.sharedService.searchedTerm.next(event.target.value);
  }
}
