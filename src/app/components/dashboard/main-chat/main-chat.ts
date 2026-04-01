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
import { addDoc, collection, doc, orderBy, query, updateDoc } from 'firebase/firestore';
import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { User } from '../../../services/models/user.model';
import { Channel } from '../../../services/models/channel.model';
import { DirectService } from '../../../services/direct.service';
import { UserService } from '../../../services/user.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { threadId } from 'node:worker_threads';
import { AddChannelDialog } from '../channels/add-channel-dialog/add-channel-dialog';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-main-chat',
  imports: [
    MatToolbar,
    MatIcon,
    MatIconButton,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    AsyncPipe,
    DatePipe
  ],
  templateUrl: './main-chat.html',
  styleUrl: './main-chat.scss',
})

export class MainChat {
  messages$!: Observable<any[]>;
  firestore = inject(Firestore);
  dashboardState = inject(DashboardStateService);
  directService = inject(DirectService);
  userService = inject(UserService);
  users: User[] = [];
  messageInput: string = '';
  readonly dialog = inject(MatDialog);

  channel$ = toObservable(this.dashboardState.channelId).pipe(
    switchMap(channelId => {
      if (!channelId) return of(null);

      this.messages$ = collectionData(
        collection(this.firestore, `channels/${channelId}/messages`),
        { idField: 'id' }
      );

      return docData(
        doc(this.firestore, `channels/${channelId}`), { idField: 'id' });
    })
  );
  chat$ = toObservable(this.dashboardState.chatId).pipe(
    switchMap(chatId => {
      if (!chatId) return of(null);

      this.messages$ = collectionData(
        collection(this.firestore, `directs/${chatId}/messages`),
        { idField: 'id' }
      );

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

  async sendMessage(chatId: string) {
    const messagesRef = collection(this.firestore, 'directs', chatId, 'messages');

    await addDoc(messagesRef, {
      text: this.messageInput,
      senderId: this.dashboardState.userId(),
      createdAt: new Date().toISOString(),
      threadId: ''
    });

    this.messageInput = '';
  }

  async sendChannelMessage(channelId: string) {
    const messagesRef = collection(this.firestore, 'channels', channelId, 'messages');

    await addDoc(messagesRef, {
      text: this.messageInput,
      senderId: this.dashboardState.userId(),
      createdAt: new Date().toISOString(),
      threadId: ''
    });

    this.messageInput = '';
  }

  closeChat() {
    this.dashboardState.chatType.set(null);
    this.dashboardState.chatId.set(null);
    this.dashboardState.channelId.set(null);
  }

  async openThread(message: any) {
    if (this.dashboardState.channelId()){
    // 🔴 FALL: Thread existiert NICHT
    if (!message.threadId) {
  
      const threadRef = await addDoc(
        collection(this.firestore, 'threads'),
        {
          parentMessageId: message.id,
          channelId: this.dashboardState.channelId(),
          createdAt: new Date().toISOString()
        }
      );
  
      // 🔥 WICHTIG: threadId in Message speichern!
      await updateDoc(
        doc(this.firestore, `channels/${this.dashboardState.channelId()}/messages/${message.id}`),
        {
          threadId: threadRef.id
        }
      );
  
      this.dashboardState.threadId.set(threadRef.id);
  
    } else {
      // ✅ Thread existiert
      this.dashboardState.threadId.set(message.threadId);
    }
  
    this.dashboardState.openChatAnswers.set(true);
  }
  }

  addUserToChannel() {
    const dialogRef = this.dialog.open(AddChannelDialog);
    this.dashboardState.editChannel.set(true);
  }

  constructor() {
  }
}