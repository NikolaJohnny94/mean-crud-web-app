import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  IconDefinition,
  faSmile,
  faEnvelope,
  faFlag,
  faCity,
  faArrowAltCircleLeft,
} from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';
import type { User } from 'src/app/types/user/User.type';
import { GO_BACK_BUTTON_TEXT } from 'src/constants';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user!: User;
  id!: string | null;
  personFlag: IconDefinition = faSmile;
  flagIcon: IconDefinition = faFlag;
  envelopeIcon: IconDefinition = faEnvelope;
  cityIcon: IconDefinition = faCity;
  arrowLeftIcon: IconDefinition = faArrowAltCircleLeft;
  goBackButtonText: string = GO_BACK_BUTTON_TEXT;

  constructor(
    private apiService: ApiService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => (this.id = params.get('id')));
    this.apiService.getUser(this.id).subscribe((payload) => {
      this.user = payload.data;
    });
  }

  goToPreviousPage(): void {
    this.location.back();
  }
}
