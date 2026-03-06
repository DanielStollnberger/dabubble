import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-main-chat',
  imports: [
    MatToolbar,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './main-chat.html',
  styleUrl: './main-chat.scss',
})
export class MainChat {

}
