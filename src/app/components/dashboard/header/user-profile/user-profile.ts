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
import { getAuth, signOut } from 'firebase/auth';
import { Router } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';


@Component({
  selector: 'app-user-profile',
  imports: [
    MatIconButton,
    MatIconModule,
    AsyncPipe,
    MatMenuModule
  ],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss',
})
export class UserProfile {
  name$!: Observable<any>;
  firestore = inject(Firestore);
  userService = inject(UserService);
  dashboardState = inject(DashboardStateService);
  router = inject(Router);
  readonly dialog = inject(MatDialog);

  constructor() {
    this.name$ = this.userService.getUserData();
  }

  openEditUserDialog(){
    const dialogRef = this.dialog.open(EditUserDialog);
  }


async logout() {
  const auth = getAuth();
  await signOut(auth);

  this.dashboardState.userId.set(null);
  this.router.navigate(['/']);
  this.dashboardState.chatId.set(null);
  this.dashboardState.channelId.set(null);
  this.dashboardState.chatType.set(null);
}
}
