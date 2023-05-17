import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { SharedService } from 'src/app/services/shared/shared.service';
import { ToastType } from 'src/app/enums/toast.enum';
import type { User } from 'src/app/types/user/User.type';
import type { SingleUserResponse } from 'src/app/types/response/SingleUserResponse.type';
import { SUBMIT_BUTTON_TEXT, UPDATE_BUTTON_TEXT } from 'src/constants';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  submitButtonText: string = SUBMIT_BUTTON_TEXT;
  updateButtonText: string = UPDATE_BUTTON_TEXT;
  currentRoute!: string;
  editForm: boolean = false;
  user!: User;
  registerForm: FormGroup = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    country: new FormControl(''),
    city: new FormControl(''),
  });
  userId!: string | null;
  allUsers!: User[];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService
  ) {
    this.route.paramMap.subscribe((params) => (this.userId = params.get('id')));
    if (this.router.url.split('/')[1] === 'edit-form') {
      this.editForm = true;
    }
  }

  ngOnInit(): void {
    if (this.editForm) {
      this.apiService
        .getUser(this.userId)
        .subscribe((response: SingleUserResponse) => {
          this.user = response.data;
          this.registerForm.setValue({
            firstname: response.data.firstname,
            lastname: response.data.lastname,
            email: response.data.email,
            country: response.data.country,
            city: response.data.city,
          });
        });
    }
    this.apiService.getUsers().subscribe((payload) => {
      this.allUsers = payload.data;
    });
  }

  onSubmit(): void {
    console.log(
      this.editForm === false &&
        this.allUsers.filter(
          (user: User) => user.email === this.registerForm.get('email')?.value
        )
    );
    if (
      this.registerForm.get('firstname')?.value === '' ||
      this.registerForm.get('lastname')?.value === '' ||
      this.registerForm.get('email')?.value === '' ||
      this.registerForm.get('country')?.value === '' ||
      this.registerForm.get('city')?.value === ''
    ) {
      this.sharedService.showAlert.next({
        show: true,
        message: 'Fill all the fields',
      });
    } else if (
      this.allUsers.some((user: User) => {
        if (this.editForm) {
          return (
            user.email === this.registerForm.get('email')?.value &&
            user.email !== this.user.email
          );
        } else {
          return user.email === this.registerForm.get('email')?.value;
        }
      })
    ) {
      this.sharedService.showAlert.next({
        show: true,
        message: 'Email already exists',
      });
    } else {
      if (this.editForm) {
        this.apiService
          .updateUser(this.user._id, this.registerForm.value)
          .subscribe(() => {
            if (
              this.registerForm.get('firstname')?.value !==
                this.user.firstname ||
              this.registerForm.get('lastname')?.value !== this.user.lastname ||
              this.registerForm.get('email')?.value !== this.user.email ||
              this.registerForm.get('country')?.value !== this.user.country ||
              this.registerForm.get('city')?.value !== this.user.city
            ) {
              this.sharedService.toast.next({
                show: true,
                type: ToastType.UPDATED,
              });

              this.sharedService.userUpdated.next(true);
              this.sharedService.updatedUserEmail.next(
                this.registerForm.get('email')?.value
              );
            }

            this.router.navigate(['/']);
          });
      } else {
        this.apiService.addUser(this.registerForm.value).subscribe(() => {
          this.sharedService.toast.next({
            show: true,
            type: ToastType.CREATED,
          });
          this.sharedService.userCreated.next(true);

          this.sharedService.newUserEmail.next(
            this.registerForm.get('email')?.value
          );

          this.router.navigate(['/']);
        });
      }
    }

    setTimeout(() => {
      this.sharedService.showAlert.next(null);
    }, 3500);
  }
}
