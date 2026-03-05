import { Component, Output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { EventEmitter } from 'stream';
import { Channels } from '../channels/channels';
import { DirectMessages } from '../direct-messages/direct-messages';


@Component({
  selector: 'app-sidenav',
  imports: [
    MatIcon,
    MatIconButton,
    Channels,
    DirectMessages
  ],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
})
export class Sidenav {
}
