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
import { addDoc, collection, doc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore';
import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { User } from '../../../services/models/user.model';
import { Channel } from '../../../services/models/channel.model';
import { DirectService } from '../../../services/direct.service';
import { UserService } from '../../../services/user.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { threadId } from 'node:worker_threads';
import { AddChannelDialog } from '../channels/add-channel-dialog/add-channel-dialog';
import { MatDialog } from '@angular/material/dialog';
import { ThreadService } from '../../../services/threads.service';
import { ReactionsDialog } from './reactions-dialog/reactions-dialog';
import { MatTooltip } from '@angular/material/tooltip';


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
    DatePipe,
    MatTooltip,
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
  threadService = inject(ThreadService);
  searchValue: string = '';
  filteredUsers: User[] = [];
  readonly dialog = inject(MatDialog);

  channel$ = toObservable(this.dashboardState.channelId).pipe(
    switchMap(channelId => {
      if (!channelId) return of(null);

      this.messages$ = collectionData(
        query(
          collection(this.firestore, `channels/${channelId}/messages`),
          orderBy('createdAt', 'asc') // 🔥
        ),
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
        query(
          collection(this.firestore, `directs/${chatId}/messages`),
          orderBy('createdAt', 'asc')
        ),
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

  onSearchChange() {
    const value = this.searchValue.toLowerCase();

    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(value)
    );
  }

  async openOrCreateDirectChat(otherUserId: string) {
    const myId = this.dashboardState.userId();

    if (!myId) return;

    const members = [myId, otherUserId].sort();

    // 🔍 alle directs holen
    const directsRef = collection(this.firestore, 'directs');

    const snapshot = await getDocs(directsRef);

    let existingChat: any = null;

    snapshot.forEach(docSnap => {
      const data = docSnap.data();

      if (
        data['members'] &&
        JSON.stringify(data['members']) === JSON.stringify(members)
      ) {
        existingChat = { id: docSnap.id, ...data };
      }
    });

    // ✅ Chat existiert
    if (existingChat) {
      this.dashboardState.chatType.set('directs');
      this.dashboardState.chatId.set(existingChat.id);
      return;
    }

    // ❌ Chat existiert nicht → erstellen
    const newChatRef = await addDoc(directsRef, {
      members,
      createdAt: new Date().toISOString()
    });

    this.dashboardState.chatType.set('directs');
    this.dashboardState.chatId.set(newChatRef.id);
  }

  openChat(id: string) {
    this.dashboardState.openChatAnswers.set(false);
    this.dashboardState.channelId.set(null);
    this.dashboardState.chatId.set(id);
    this.dashboardState.chatType.set('directs');
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
    if (this.dashboardState.channelId()) {
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

  getReactionCount(message: any): number {
    return Object.keys(message?.reactions || {}).length;
  }

  getReactions(message: any): [string, string[]][] {
    return Object.entries(message?.reactions || {}) as [string, string[]][];
  }

  openReactionDialog(messageId: any) {
    const dialogRef = this.dialog.open(ReactionsDialog);
    this.dashboardState.messageId.set(messageId);
  }

  getDateLabel(date: any): string {
    const d = new Date(date);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isSameDay = (a: Date, b: Date) =>
      a.getDate() === b.getDate() &&
      a.getMonth() === b.getMonth() &&
      a.getFullYear() === b.getFullYear();

    if (isSameDay(d, today)) return 'Heute';
    if (isSameDay(d, yesterday)) return 'Gestern';

    return d.toLocaleDateString('de-AT'); // oder de-DE
  }

  shouldShowDateDivider(messages: any[], index: number): boolean {
    if (index === 0) return true;

    const current = new Date(messages[index].createdAt);
    const previous = new Date(messages[index - 1].createdAt);

    return (
      current.getDate() !== previous.getDate() ||
      current.getMonth() !== previous.getMonth() ||
      current.getFullYear() !== previous.getFullYear()
    );
  }

  constructor() {
  }
}