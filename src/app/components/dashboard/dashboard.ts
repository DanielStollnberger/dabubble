import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { UserProfile } from '../user-profile/user-profile';
import { Sidenav } from './sidenav/sidenav';
import { MainChat } from './main-chat/main-chat';
import { Header } from './header/header';
import { ChatAnswers } from './chat-answers/chat-answers';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    Sidenav,
    Header,
    MainChat,
    ChatAnswers
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  sidenavIsOpen: boolean = true;
  openChatAnswers: boolean = false;

  toggleSidenav() {
    this.sidenavIsOpen = !this.sidenavIsOpen
  }

  closeChatAnswers(){
    this.openChatAnswers = false;
  }
}
