import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { UserProfile } from './header/user-profile/user-profile';
import { Sidenav } from './sidenav/sidenav';
import { MainChat } from './main-chat/main-chat';
import { Header } from './header/header';
import { ChatAnswers } from './chat-answers/chat-answers';
import { ActivatedRoute } from '@angular/router';
import { DashboardStateService } from '../../state/dashboard-state.service';

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
  userId: any;
  dashboardState = inject(DashboardStateService);

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.dashboardState.userId.set(params['userId']);
    });
  }

  toggleSidenav() {
    this.sidenavIsOpen = !this.sidenavIsOpen
  }

  closeChatAnswers() {
    this.dashboardState.openChatAnswers.set(false);
  }
}
