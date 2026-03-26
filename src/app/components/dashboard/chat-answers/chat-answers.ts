import { Component, effect, Inject, inject } from '@angular/core';
import { DashboardStateService } from '../../../state/dashboard-state.service';
import { log } from 'node:console';
import { collectionData, docData, Firestore } from '@angular/fire/firestore';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable, of, switchMap } from 'rxjs';
import { addDoc, collection, doc } from 'firebase/firestore';
import { threadId } from 'node:worker_threads';
import { AsyncPipe, DatePipe } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { User } from '../../../services/models/user.model';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-chat-answers',
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
  templateUrl: './chat-answers.html',
  styleUrl: './chat-answers.scss',
})
export class ChatAnswers {
  dashboardState = inject(DashboardStateService);
  userService = inject(UserService);
  threadInput: string = '';
  firestore = inject(Firestore);
   users: User[] = [];

  ngOnInit() {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  threadParent$ = toObservable(this.dashboardState.threadId).pipe(
    switchMap(threadId => {
      if (!threadId) return of(null);
  
      // get thread meta first
      return docData(doc(this.firestore, `threads/${threadId}`)).pipe(
        switchMap((thread: any) => {
          if (!thread?.parentMessageId || !thread?.channelId) return of(null);
  
          return docData(
            doc(
              this.firestore,
              `channels/${thread.channelId}/messages/${thread.parentMessageId}`
            ),
            { idField: 'id' }
          );
        })
      );
    })
  );

  threadMessages$ = toObservable(this.dashboardState.threadId).pipe(
    switchMap(threadId => {
      if (!threadId) return of([]);
  
      return collectionData(
        collection(this.firestore, `threads/${threadId}/messages`),
        { idField: 'id' }
      );
    })
  );

  getUserById(userId: string): User | undefined {
    const user = this.users.find(user => user.id === userId);
    return user;
  }


    async sendThread(threadId: string) {
      const messagesRef = collection(this.firestore, 'threads', threadId, 'messages');
  
      await addDoc(messagesRef, {
        text: this.threadInput,
        senderId: this.dashboardState.userId(),
        createdAt: new Date().toISOString(),
      });
  
      this.threadInput = '';
    }

    closeThread(){
      this.dashboardState.openChatAnswers.set(false);
    }

  constructor() {
    effect(() => {
      const threadId = this.dashboardState.threadId();
      // console.log('Thread ID:', threadId);
    });
  }
}
