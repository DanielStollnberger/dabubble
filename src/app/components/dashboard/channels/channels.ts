import { Component, inject } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection, doc } from 'firebase/firestore';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { DashboardStateService } from '../../../services/shared/dashboard-state.service';

@Component({
  selector: 'app-channels',
  imports: [
    MatToolbarModule,
    MatIcon,
    MatIconButton,
    AsyncPipe
  ],
  templateUrl: './channels.html',
  styleUrl: './channels.scss',
})
export class Channels {
  channel$!: Observable<any>;
  firestore = inject(Firestore);
  dashboardState = inject(DashboardStateService);
  userId = this.dashboardState.userId;
  channelCollect: any;

  constructor() {
    this.channelCollect = collection(this.firestore, 'users/' + this.userId() + '/channels');
    this.channel$ = collectionData(this.channelCollect, { idField: 'id' });
  }

  toggleChannels() {
    console.log('toggled channels');
  }

  addChannel() {
    console.log('added channel');
  }

  openChat(id: any) {
    this.dashboardState.chatId.set(id);
  }
}
