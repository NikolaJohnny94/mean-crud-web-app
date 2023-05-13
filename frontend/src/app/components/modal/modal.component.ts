import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  userId!: string;
  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService
      .getUserId()
      .subscribe((userId: string) => (this.userId = userId));
  }

  confirmUserDeletion(deleteUser: boolean) {
    this.sharedService.deleteUserConfirmation.next(deleteUser);
  }
}
