import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared/shared.service';
import {
  IconDefinition,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import type { Alert } from 'src/app/types/alert/Alert.type';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  alert!: Alert | null;
  showAlert!: boolean | null;
  exclamationTriangleIcon: IconDefinition = faExclamationTriangle;

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.getShowAlert().subscribe((payload) => {
      this.alert = payload;
    });
  }
}
