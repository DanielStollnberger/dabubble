import { Component, computed, inject } from '@angular/core';
import { collectionData, docData, Firestore } from '@angular/fire/firestore';
import { collection, doc } from 'firebase/firestore';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { combineLatest, map, Observable, of, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { DashboardStateService } from '../../../state/dashboard-state.service';
import { Channel } from '../../../services/models/channel.model';
import { User } from '../../../services/models/user.model';
import { ChannelService } from '../../../services/channel.service';

@Component({
  selector: 'app-channels',
  imports: [
    MatToolbarModule,
    MatIcon,
    MatIconButton,
    AsyncPipe
  ],
  templateUrl: './channels.html',
  styleUrl: './channels.scss',
})
export class Channels {
  channels$: Observable<any>;
  firestore = inject(Firestore);
  channelService = inject(ChannelService);

  constructor() {
    this.channels$ = this.channelService.getUserChannels();
  }

  toggleChannels() {
    console.log('toggled channels');
  }

  addChannel() {
    console.log('added channel');
  }

  openChat(id: string) {
  }
}
