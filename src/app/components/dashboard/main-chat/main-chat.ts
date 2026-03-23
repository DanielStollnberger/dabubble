import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, inject, WritableSignal } from '@angular/core';
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
import { DirectService } from '../../../services/direct.service';
import { UserService } from '../../../services/user.service';
import { toObservable } from '@angular/core/rxjs-interop';



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
  directService = inject(DirectService);
  userService = inject(UserService);
  users: User[] = [];

  channel$ = toObservable(this.dashboardState.channelId).pipe(
    switchMap(channelId => {
      if (!channelId) return of(null);

      return docData(
        doc(this.firestore, `channels/${channelId}`), { idField: 'id' });
    })
  );
  chat$ = toObservable(this.dashboardState.chatId).pipe(
    switchMap(chatId => {
      if (!chatId) return of(null);

      return docData(
        doc(this.firestore, `directs/${chatId}`), { idField: 'id' });
    })
  );

  ngOnInit() {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  getUserById(userId: string): User | undefined {
    return this.users.find(user => user.id === userId);
  }

  getOtherUser(direct: any) {
    const myId = this.dashboardState.userId();
  
    const otherId = direct.members.find((id: string) => id !== myId);
  
    return this.users.find((user: any) => user.id === otherId);
  }

  constructor() {
    // if (this.dashboardState.chatType() === 'chat') {
    //   effect(() => {
    //     const chatId = this.dashboardState.chatId();
    //     if (!chatId) return;
    //     this.chat$ = docData(doc(this.firestore, `directs/${chatId}`), { idField: 'id' });
    //   });
    // }
  }
}