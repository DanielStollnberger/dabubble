import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { collectionData, docData, Firestore } from '@angular/fire/firestore';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { collection, doc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { DashboardStateService } from '../../../../services/shared/dashboard-state.service';

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
  item$!: Observable<any>;
  firestore = inject(Firestore);
  dashboardState = inject(DashboardStateService);
  userId = this.dashboardState.userId;
  userDoc:any;

  constructor() {
    this.userDoc = doc(this.firestore, 'users/' + this.userId());
    this.item$ = docData(this.userDoc);
  }
}
