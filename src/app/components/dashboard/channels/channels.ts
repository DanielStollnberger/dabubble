import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-channels',
  imports: [
    MatToolbarModule,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './channels.html',
  styleUrl: './channels.scss',
})
export class Channels {

}
