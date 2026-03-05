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
    MainChat
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  isOpen: boolean = true;

  toggleSidenav(){
console.log('hi');
  }
}
