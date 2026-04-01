import { Component, inject, NgZone } from '@angular/core';
import { RouterLink } from "@angular/router";
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from "@angular/router";
import { DashboardStateService } from '../../state/dashboard-state.service';
import { signInWithEmailAndPassword, getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { MatDialog } from '@angular/material/dialog';
import { SignupDialog } from './signup-dialog/signup-dialog';
import { doc, setDoc } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-start-screen',
  imports: [
    MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule
  ],
  templateUrl: './start-screen.html',
  styleUrl: './start-screen.scss',
})
export class StartScreen {
  dashboardState = inject(DashboardStateService);
  router = inject(Router);
  zone = inject(NgZone);
  firestore = inject(Firestore);
  readonly dialog = inject(MatDialog);

  async login(email: string, password: string) {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
  
      const uid = userCredential.user.uid;
  
      // 🔥 FIX
      this.zone.run(() => {
        this.router.navigate([`/dashboard`]);
      });
  
    } catch (error) {
      console.error(error);
    }
  }

  openSignup(){
    this.dialog.open(SignupDialog);
  }


  async loginAsGuest() {
    this.dashboardState.chatId.set(null);
    this.dashboardState.chatType.set(null);
    this.dashboardState.channelId.set(null);
    const auth = getAuth();
  
    const userCredential = await signInAnonymously(auth);
    const user = userCredential.user;
  
    const uid = user.uid;
    await setDoc(doc(this.firestore, `users/${uid}`), {
      id: uid,
      name: `Guest_${uid.slice(0, 4)}`,
      avatar: '/assets/img/profile.png',
      isGuest: true,
      createdAt: new Date().toISOString()
    }, { merge: true });
  }
}
