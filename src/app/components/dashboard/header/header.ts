import { Component, inject } from '@angular/core';
import { UserProfile } from './user-profile/user-profile';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { collection, getDocs } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { MatSelectModule } from '@angular/material/select';
import { DashboardStateService } from '../../../state/dashboard-state.service';
import { query, where } from 'firebase/firestore';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-header',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    UserProfile,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,

  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  searchTerm = '';
  results: any[] = [];
  firestore = inject(Firestore);
  dashboardState = inject(DashboardStateService);
  userService = inject(UserService);
  users: any;

  async searchDirects() {
    if (!this.searchTerm.trim()) {
      this.results = [];
      return;
    }

    this.results = [];

    const currentUserId = this.dashboardState.userId();

    const q = query(
      collection(this.firestore, 'directs'),
      where('members', 'array-contains', currentUserId)
    );

    const directsSnap = await getDocs(q);

    for (const direct of directsSnap.docs) {
      const messagesSnap = await getDocs(
        collection(this.firestore, `directs/${direct.id}/messages`)
      );

      messagesSnap.forEach(doc => {
        const data = doc.data();

        if (
          data['text']?.toLowerCase().includes(this.searchTerm.toLowerCase())
        ) {
          this.results.push({
            text: data['text'],
            chatId: direct.id,
            members: direct.data()['members']
          });
        }
      });
    }
  }
  openDirect(result: any) {
    this.dashboardState.openChatAnswers.set(false);
    this.dashboardState.channelId.set(null);
    this.dashboardState.chatId.set(result.chatId);
    this.dashboardState.chatType.set('directs');

    this.results = [];
  }

  getOtherUser(direct: any) {
    const myId = this.dashboardState.userId();
  
    if (!myId || !direct?.members || !this.users) return null;
  
    const otherId = direct.members.find((id: string) => id !== myId);
  
    return this.users.find((user: any) => user.id === otherId);
  }

  constructor(){
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }
}

