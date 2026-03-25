import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { collection } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { DashboardStateService } from '../../../state/dashboard-state.service';
import { DirectService } from '../../../services/direct.service';
import { subscribe } from 'diagnostics_channel';
import { UserService } from '../../../services/user.service';

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
  users:any;
  directsOpen = true;

  constructor() {
    this.chats$ = this.chatService.getUserChats();

    // 🔥 alle users einmal laden
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  openChat(id: string) {
    this.dashboardState.channelId.set(null); 
    this.dashboardState.chatId.set(id);
    this.dashboardState.chatType.set('directs');
  }

  toggleDirects() {
    this.directsOpen = !this.directsOpen;
  }

  getOtherUser(direct: any) {
    const myId = this.dashboardState.userId();
  
    const otherId = direct.members.find((id: string) => id !== myId);
  
    return this.users.find((user: any) => user.id === otherId);
  }
}
