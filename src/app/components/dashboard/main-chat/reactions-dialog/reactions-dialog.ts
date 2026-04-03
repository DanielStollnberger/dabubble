import { AsyncPipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { DashboardStateService } from '../../../../state/dashboard-state.service';


@Component({
  selector: 'app-reactions-dialog',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCardModule,
    FormsModule,
    MatIcon,
],
  templateUrl: './reactions-dialog.html',
  styleUrl: './reactions-dialog.scss',
})
export class ReactionsDialog {
reaction:any;
firestore= inject(Firestore);
dashboardState = inject(DashboardStateService);


async sendReaction() {
  const userId = this.dashboardState.userId();
  const messageId = this.dashboardState.messageId();
  const emoji = this.reaction;

  if (!userId || !messageId || !emoji) return;

  let path = '';

  if (this.dashboardState.channelId()) {
    path = `channels/${this.dashboardState.channelId()}/messages/${messageId}`;
  } else if (this.dashboardState.chatId()) {
    path = `directs/${this.dashboardState.chatId()}/messages/${messageId}`;
  }

  const messageRef = doc(this.firestore, path);
  const snap = await getDoc(messageRef);

  const data = snap.data();
  const reactions = data?.['reactions'] || {};

  const users = reactions[emoji] || [];

  // toggle
  let updatedUsers;
  if (users.includes(userId)) {
    updatedUsers = users.filter((id: string) => id !== userId);
  } else {
    updatedUsers = [...users, userId];
  }

  reactions[emoji] = updatedUsers;

  if (updatedUsers.length === 0) {
    delete reactions[emoji];
  }

  await updateDoc(messageRef, {
    reactions
  });
}
}
