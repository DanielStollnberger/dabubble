import { Component, computed, effect, inject, WritableSignal } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { DashboardStateService } from '../../../state/dashboard-state.service';
import { combineLatest, Observable, of, switchMap } from 'rxjs';
import { collectionData, docData, Firestore } from '@angular/fire/firestore';
import { collection, doc, orderBy, query } from 'firebase/firestore';
import { AsyncPipe } from '@angular/common';
import { User } from '../../../services/models/user.model';
import { Channel } from '../../../services/models/channel.model';
import { DirectMessages } from '../direct-messages/direct-messages';
import { DirectService } from '../../../services/direct.service';
import { UserService } from '../../../services/user.service';

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
  channelName$!: Observable<any>;
  chatName$!: Observable<any>;
  firestore = inject(Firestore);
  dashboardState = inject(DashboardStateService);
directService = inject(DirectService);
userService = inject(UserService);
  users:any;

  constructor(){
    if (this.dashboardState.chatType() === 'channel') {
      effect(() => {
        const channelId = this.dashboardState.channelId();
        if (!channelId) return;
        this.channelName$ = docData(doc(this.firestore, `channels/${channelId}`),{ idField: 'id' });
      });
    } else {
      effect(() => {
        const chatId = this.dashboardState.chatId();
        if (!chatId) return;
        this.chatName$ = docData(doc(this.firestore, `directs/${chatId}`),{ idField: 'id' });
      });
    }
  }
}