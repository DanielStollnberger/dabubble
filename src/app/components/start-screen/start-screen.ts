import { Component, inject, NgZone } from '@angular/core';
import { RouterLink } from "@angular/router";
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from "@angular/router";
import { DashboardStateService } from '../../state/dashboard-state.service';
import { signInWithEmailAndPassword, getAuth, onAuthStateChanged } from "firebase/auth";

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
  goToDashboard(userId: string) {
    this.dashboardState.userId.set(userId);
    this.router.navigate([`/dashboard/${userId}`]);
  }

  async login(email: string, password: string) {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
  
      const uid = userCredential.user.uid;
  
      // 🔥 FIX
      this.zone.run(() => {
        this.router.navigate([`/dashboard/${uid}`]);
      });
  
    } catch (error) {
      console.error(error);
    }
  }
}
