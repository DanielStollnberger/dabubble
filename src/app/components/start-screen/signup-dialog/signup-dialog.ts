import { Component, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { createUserWithEmailAndPassword, getAuth, signInAnonymously } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

@Component({
  selector: 'app-signup-dialog',
  imports: [
    FormsModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatOption,
    MatSelectModule   // 👈 DAS fehlt meistens
  ],
  templateUrl: './signup-dialog.html',
  styleUrl: './signup-dialog.scss',
})
export class SignupDialog {
  profilePictures:string[] = [
    '/assets/img/profile.png',
    '/assets/img/profile-two.png',
    '/assets/img/profile-girl.png'
  ];
  firestore = inject(Firestore);

  email: string = '';
  password: string = '';
  name: string = '';
  avatar: string = '';

  async signUp() {
    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        this.email,
        this.password
      );

      const uid = userCredential.user.uid;

      // 🔥 User in Firestore speichern
      await setDoc(doc(this.firestore, `users/${uid}`), {
        id: uid,
        email: this.email,
        name: this.name || 'New User',
        avatar: this.avatar || '/assets/img/profile.png',
        createdAt: new Date().toISOString()
      });

      console.log('User created');

    } catch (error) {
      console.error(error);
    }
  }
}
