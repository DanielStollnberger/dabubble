import { Component, computed, inject, WritableSignal } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { DashboardStateService } from '../../../services/shared/dashboard-state.service';
import { Observable } from 'rxjs';
import { collectionData, docData, Firestore } from '@angular/fire/firestore';
import { collection, doc, orderBy, query } from 'firebase/firestore';
import { AsyncPipe } from '@angular/common';

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
  chatDoc: any;

  chat$ = computed(() => {
    this.chatDoc = doc(this.firestore, 'channels/' + this.chatId());
    return docData(this.chatDoc);
  });

  messages$ = computed(() => {
    const messagesRef = collection(this.firestore, `channels/${this.chatId()}/messages`);
    const q = query(messagesRef, orderBy('timestamp'));
  
    return collectionData(q, { idField: 'id' });
  });
}