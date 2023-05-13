import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IconDefinition,
  faSmile,
  faEnvelope,
  faFlag,
  faCity,
} from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';
import type { User } from 'src/app/types/user/User.type';

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

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => (this.id = params.get('id')));
    this.apiService.getUser(this.id).subscribe((payload) => {
      this.user = payload.data;
    });
  }
}
