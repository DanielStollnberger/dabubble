import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../../../services/user.service';
import { AsyncPipe } from '@angular/common';
import { addDoc, arrayUnion, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { DashboardStateService } from '../../../../state/dashboard-state.service';
import { MatCardModule } from "@angular/material/card";
import { docData, Firestore } from '@angular/fire/firestore';
import { toObservable } from '@angular/core/rxjs-interop';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-add-channel-dialog',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    AsyncPipe,
    MatCardModule,
    FormsModule
  ],
  templateUrl: './add-channel-dialog.html',
  styleUrl: './add-channel-dialog.scss',
})
export class AddChannelDialog {
  selectedUsers = new FormControl<any[]>([]);
  userService = inject(UserService);
  users = this.userService.getAllUsers();
  firestore = inject(Firestore);
  dashboardState = inject(DashboardStateService);
  channelName = '';

  channel$ = toObservable(this.dashboardState.channelId).pipe(
    switchMap(channelId => {
      if (!channelId) return of(null);

      return docData(
        doc(this.firestore, `channels/${channelId}`), { idField: 'id' });
    })
  );

  async createChannel() {
    const ref = collection(this.firestore, 'channels');

    await addDoc(ref, {
      name: this.channelName,
      members: (this.selectedUsers.value || []).map((user: any) => user.id),
      createdBy: this.dashboardState.userId(),
      createdAt: new Date().toISOString()
    });
  }
  async saveChannelEdit(channelId: any) {
    const ref = doc(this.firestore, 'channels', channelId);

    await updateDoc(ref, {
      name: this.channelName,
      members: this.selectedUsers.value || []
    });
  }
  async deleteChannel(channelId: any) {
    const ref = doc(this.firestore, 'channels', channelId);

    await deleteDoc(ref);
    this.dashboardState.channelId.set(null);
    this.dashboardState.chatType.set(null);
  }

  ngOnInit() {
    if (this.dashboardState.editChannel()) {

      this.channel$.subscribe(channel => {
        if (channel) {
          this.selectedUsers.setValue(channel['members']);
          this.channelName = channel['name'];
        }
      });
    }

  }
  // ngOnInit() {
  //   this.channel$.subscribe(channel => {
  //     if (channel) {
  //       this.channelName = channel['name'];
  //     }
  //   });
  // }
}
