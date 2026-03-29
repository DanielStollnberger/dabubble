import { Component, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { getAuth } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { UserService } from '../../../../services/user.service';
import { DashboardStateService } from '../../../../state/dashboard-state.service';
import { Observable } from 'rxjs';
import { User } from '../../../../services/models/user.model';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
@Component({
  selector: 'app-edit-user-dialog',
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButton
  ],
  templateUrl: './edit-user-dialog.html',
  styleUrl: './edit-user-dialog.scss',
})
export class EditUserDialog {
  user$!: Observable<any>;
  firestore = inject(Firestore);
  userService = inject(UserService);
  dashboardState = inject(DashboardStateService);
  user: User = {
    name: '',
    avatar: '',
    email: '',
    id: '',
    createdAt: ''
  };

  constructor() {
    this.user$ = this.userService.getUserData();
  
    this.user$.subscribe(user => {
      if (user) {
          this.user = { ...user };
      }
    });
  }
  
  async saveUser() {
    const userId = this.dashboardState.userId();

    await updateDoc(
      doc(this.firestore, `users/${userId}`),
      {
        name: this.user.name,
        avatar: this.user.avatar
      }
    );

    console.log("User updated");
  }
}
