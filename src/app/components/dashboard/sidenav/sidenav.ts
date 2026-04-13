import { Component, Output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { EventEmitter } from 'stream';
import { Channels } from '../channels/channels';
import { DirectMessages } from '../direct-messages/direct-messages';
import {ChangeDetectionStrategy, inject, model, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { ServerDialog } from './server-dialog/server-dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sidenav',
  imports: [
    MatIcon,
    MatIconButton,
    Channels,
    DirectMessages,
    FormsModule,
  ],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
})
export class Sidenav {
  readonly dialog = inject(MatDialog);

  openServerInfo(){
    const dialogRef = this.dialog.open(ServerDialog);
  }
}
