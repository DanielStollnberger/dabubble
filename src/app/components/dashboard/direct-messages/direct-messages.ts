import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { collection } from 'firebase/firestore';
import { Observable, of, switchMap } from 'rxjs';
import { DashboardStateService } from '../../../state/dashboard-state.service';
import { DirectService } from '../../../services/direct.service';
import { subscribe } from 'diagnostics_channel';
import { UserService } from '../../../services/user.service';
import { toObservable } from '@angular/core/rxjs-interop';

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
  chats$: Observable<any>;
  firestore = inject(Firestore);
  chatService = inject(DirectService);
  userService = inject(UserService);
  dashboardState = inject(DashboardStateService);
  directService = inject(DirectService);
  users: any;
  directsOpen = true;

  constructor() {
    this.chats$ = toObservable(this.dashboardState.userId).pipe(
      switchMap(userId => {
        if (!userId) return of([]);
        return this.chatService.getUserChats(userId);
      })
    );

    // 🔥 alle users einmal laden
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  openChat(id: string) {
    this.dashboardState.openChatAnswers.set(false);
    this.dashboardState.channelId.set(null);
    this.dashboardState.chatId.set(id);
    this.dashboardState.chatType.set('directs');
  }

  toggleDirects() {
    this.directsOpen = !this.directsOpen;
  }

  getOtherUser(direct: any) {
    const myId = this.dashboardState.userId();
  
    if (!myId || !direct?.members || !this.users) return null;
  
    const otherId = direct.members.find((id: string) => id !== myId);
  
    return this.users.find((user: any) => user.id === otherId);
  }
}
