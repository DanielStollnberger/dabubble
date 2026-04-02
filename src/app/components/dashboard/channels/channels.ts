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
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { AddChannelDialog } from './add-channel-dialog/add-channel-dialog';
import { toObservable } from '@angular/core/rxjs-interop';


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
  dashboardState = inject(DashboardStateService);
  channelsOpen = true;
  readonly dialog = inject(MatDialog);


  constructor() {
    this.channels$ = toObservable(this.dashboardState.userId).pipe(
      switchMap(userId => {
        if (!userId) return of([]);
        return this.channelService.getUserChannels(userId);
      })
    );
  }

  toggleChannels() {
   this.channelsOpen = !this.channelsOpen
  }

  addChannelDialogOpen(): void {
    this.dashboardState.channelId.set(null);
    this.dashboardState.chatType.set(null);
    const dialogRef = this.dialog.open(AddChannelDialog);
  }

  openChat(id: string) {
    this.dashboardState.chatId.set(null); 
    this.dashboardState.channelId.set(id);
    this.dashboardState.chatType.set('channel');
  }
}
