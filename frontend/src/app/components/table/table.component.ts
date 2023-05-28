import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IconDefinition,
  faUserPlus,
  faPencilAlt,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import type { User } from 'src/app/types/user/User.type';
import type { SingleUserResponse } from 'src/app/types/response/SingleUserResponse.type';
import type { Toast } from 'src/app/types/toast/Toast.type';
import { ToastType } from 'src/app/enums/toast.enum';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  users!: User[];
  filterableUsers!: User[];
  toast: Toast = {} as Toast;

  addNewUserIcon: IconDefinition = faUserPlus;
  editUserIcon: IconDefinition = faPencilAlt;
  deleteUserIcon: IconDefinition = faTrash;

  createdUserEmail!: string;
  updatedUserEmail!: string;
  deletedUserEmail!: string;

  userCreated: boolean = false;
  userUpdated: boolean = false;

  constructor(
    private apiService: ApiService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.apiService.getUsers().subscribe((payload) => {
      this.users = payload.data;
      this.filterableUsers = payload.data;
      this.sharedService.allUsers.next(payload.data);
    });

    this.sharedService.displayToast().subscribe((payload) => {
      this.toast.show = payload.show;
      this.toast.type = payload.type;
    });

    this.sharedService.getUserCreated().subscribe((payload) => {
      this.userCreated = payload;
    });

    this.sharedService.getUserUpdated().subscribe((payload) => {
      this.userUpdated = payload;
    });

    if (this.userCreated) {
      this.sharedService
        .getNewUserEmail()
        .subscribe((payload) => (this.createdUserEmail = payload));
    }

    if (this.userUpdated) {
      this.sharedService
        .getUpdatedUserEmail()
        .subscribe((payload) => (this.updatedUserEmail = payload));
    }

    this.sharedService.getSearchedTerm().subscribe((payload) => {
      this.filterableUsers = this.users?.filter((user: User) =>
        user.firstname.includes(payload)
      );
    });
  }

  deleteUser(id: string) {
    this.sharedService.userId.next(id);
    this.sharedService
      .confirmUserDeletion()
      .subscribe((deleteUserConfirmation: boolean) => {
        if (deleteUserConfirmation) {
          this.deletedUserEmail = '';

          this.sharedService.toast.next({
            show: true,
            type: ToastType.DELETED,
          });

          this.apiService
            .deleteUser(id)
            .subscribe((deletedUser: SingleUserResponse) => {
              this.deletedUserEmail = deletedUser.data.email;

              this.filterableUsers = this.users.filter(
                (user) => user._id !== deletedUser.data._id
              );

              this.sharedService.displayToast().subscribe((payload) => {
                this.toast.show = payload.show;
                this.toast.type = payload.type;
              });
            });
        }
      });
  }

  onCloseToast(): void {
    this.sharedService.userCreated.next(false);
    this.sharedService.newUserEmail.next('');
    this.sharedService.userUpdated.next(false);
    this.sharedService.updatedUserEmail.next('');
    this.deletedUserEmail = '';
  }
}
