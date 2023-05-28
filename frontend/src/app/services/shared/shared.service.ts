import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import type { User } from '../../types/user/User.type';
import type { Toast } from 'src/app/types/toast/Toast.type';
import type { Alert } from 'src/app/types/alert/Alert.type';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  deleteUserConfirmation: Subject<boolean> = new Subject<boolean>();
  userId: Subject<string> = new Subject<string>();
  showAlert: BehaviorSubject<Alert | null> = new BehaviorSubject<Alert | null>(
    null
  );
  searchedTerm: BehaviorSubject<string> = new BehaviorSubject<string>('');
  toast: BehaviorSubject<Toast> = new BehaviorSubject<Toast>({} as Toast);
  allUsers: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  newUserEmail: BehaviorSubject<string> = new BehaviorSubject<string>('');
  updatedUserEmail: BehaviorSubject<string> = new BehaviorSubject<string>('');

  userCreated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  userUpdated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  currentRoute: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() {}

  confirmUserDeletion(): Observable<boolean> {
    return this.deleteUserConfirmation.asObservable();
  }

  getUserId(): Observable<string> {
    return this.userId.asObservable();
  }

  getShowAlert(): Observable<Alert | null> {
    return this.showAlert.asObservable();
  }

  getSearchedTerm(): Observable<string> {
    return this.searchedTerm.asObservable();
  }

  displayToast(): Observable<Toast> {
    return this.toast.asObservable();
  }

  getAllUsers(): Observable<User[]> {
    return this.allUsers.asObservable();
  }

  getNewUserEmail(): Observable<string> {
    return this.newUserEmail.asObservable();
  }

  getUpdatedUserEmail(): Observable<string> {
    return this.updatedUserEmail.asObservable();
  }

  getUserCreated(): Observable<boolean> {
    return this.userCreated.asObservable();
  }

  getUserUpdated(): Observable<boolean> {
    return this.userUpdated.asObservable();
  }

  getCurrentRoute(): Observable<string> {
    return this.currentRoute.asObservable();
  }
}
