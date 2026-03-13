import { Component, computed, inject } from '@angular/core';
import { collectionData, docData, Firestore } from '@angular/fire/firestore';
import { collection, doc } from 'firebase/firestore';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { combineLatest, map, Observable, of, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { DashboardStateService } from '../../../services/shared/dashboard-state.service';
import { Channel } from '../../../services/models/channel.model';
import { User } from '../../../services/models/user.model';

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
  firestore = inject(Firestore);
  dashboardState = inject(DashboardStateService);
  userId = this.dashboardState.userId;
  channelCollect: any;

  constructor() {
  }

  channel$ = computed(() => {
    const userDoc = doc(this.firestore, `users/${this.userId}`);
  
    return docData(userDoc).pipe(
      // (
            switchMap((user: any) => {
              const channelIds = user.channels || [];
              if (channelIds.length === 0) {
                return of([]);
              }
              const channelRequests = channelIds.map((id: string) => {
                const channelDoc = doc(this.firestore, `channels/${id}`);
                return docData(channelDoc, { idField: 'id' });
              });
              return combineLatest(channelRequests);
            })
          ) as Observable<Channel[]>;
    //   map((user: any) => user.channels || [])
    // );
  });

  toggleChannels() {
    console.log('toggled channels');
  }

  addChannel() {
    console.log('added channel');
  }

  openChat(id: string) {
    this.dashboardState.channelId.set(id);
    this.dashboardState.chatType.set('channel');
  }
}
