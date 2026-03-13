import { Component, computed, inject, WritableSignal } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { DashboardStateService } from '../../../services/shared/dashboard-state.service';
import { combineLatest, Observable, of, switchMap } from 'rxjs';
import { collectionData, docData, Firestore } from '@angular/fire/firestore';
import { collection, doc, orderBy, query } from 'firebase/firestore';
import { AsyncPipe } from '@angular/common';
import { User } from '../../../services/models/user.model';

@Component({
  selector: 'app-main-chat',
  imports: [
    MatToolbar,
    MatIcon,
    MatIconButton,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    AsyncPipe
  ],
  templateUrl: './main-chat.html',
  styleUrl: './main-chat.scss',
})

export class MainChat {
  firestore = inject(Firestore);
  dashboardState = inject(DashboardStateService);
  chatId = this.dashboardState.chatId;
  channelId = this.dashboardState.channelId;
  userId = this.dashboardState.userId;
  chatDoc: any;

  chat$ = computed(() => {

    if (this.dashboardState.chatType() === 'channel') {
      const docRef = doc(this.firestore, 'channels/' + this.channelId());
      return docData(docRef);
    }

    if (this.dashboardState.chatType() === 'direct') {
      const docRef = doc(this.firestore, 'users/' + this.userId() + '/directs/' + this.chatId());
      return docData(docRef);
    }

    return null;
  });

  channelUser$ = computed(() => {
    const channelDoc = doc(this.firestore, `channels/${this.channelId()}`);
  
    return docData(channelDoc).pipe(
      switchMap((channel: any) => {
        const userIds = channel.channeluser || [];
        if (userIds.length === 0) {
          return of([]);
        }
        const userRequests = userIds.map((uid: string) => {
          const userDoc = doc(this.firestore, `users/${uid}`);
          return docData(userDoc, { idField: 'id' });
        });
        return combineLatest(userRequests);
      })
    ) as Observable<User[]>;
  });

  messages$ = computed(() => {

    if (this.dashboardState.chatType() === 'channel') {
      const messagesRef = collection(this.firestore, `channels/${this.channelId()}/messages`);
      const q = query(messagesRef, orderBy('timestamp'));

      return collectionData(q, { idField: 'id' });
    }

    if (this.dashboardState.chatType() === 'direct') {
      const messagesRef = collection(this.firestore, 'users/' + this.userId() + '/directs/' + this.chatId() + '/messages');
      const q = query(messagesRef, orderBy('timestamp'));

      return collectionData(q, { idField: 'id' });
    }

    return null;
  });


}