import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { collection } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { DashboardStateService } from '../../../services/shared/dashboard-state.service';

@Component({
  selector: 'app-direct-messages',
  imports: [
    MatToolbarModule,
    MatIcon,
    MatIconButton,
    AsyncPipe
  ],
  templateUrl: './direct-messages.html',
  styleUrl: './direct-messages.scss',
})
export class DirectMessages {
  direct$!: Observable<any>;
  firestore = inject(Firestore);
  dashboardState = inject(DashboardStateService);
  userId = this.dashboardState.userId;
  directsCollect: any;

  constructor() {
    this.directsCollect = collection(this.firestore, 'users/'+ this.userId() +'/directs');
    this.direct$ = collectionData(this.directsCollect, { idField: 'id' });
  }
  toggleDirects() {
    console.log('toggled directs');
  }
}
