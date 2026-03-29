import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { collectionData, docData, Firestore } from '@angular/fire/firestore';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { collection, doc } from 'firebase/firestore';
import { Observable, switchMap } from 'rxjs';
import { DashboardStateService } from '../../../../state/dashboard-state.service';
import { UserService } from '../../../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialog } from '../edit-user-dialog/edit-user-dialog';

@Component({
  selector: 'app-user-profile',
  imports: [
    MatIconButton,
    MatIconModule,
    AsyncPipe
  ],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss',
})
export class UserProfile {
  name$!: Observable<any>;
  firestore = inject(Firestore);
  userService = inject(UserService);
  readonly dialog = inject(MatDialog);

  constructor() {
    this.name$ = this.userService.getUserData();
  }

  openEditUserDialog(){
    const dialogRef = this.dialog.open(EditUserDialog);
  }
}
