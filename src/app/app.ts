import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { DashboardStateService } from './state/dashboard-state.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('dabubble');
  router = inject(Router);
  dashboardState = inject(DashboardStateService);

  platformId = inject(PLATFORM_ID);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const auth = getAuth();

      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.dashboardState.userId.set(user.uid);
          setTimeout(() => {
            this.router.navigate(['/dashboard']); // falls nötig
          }, 1000);
        } else {
          this.dashboardState.userId.set(null);
          this.router.navigate(['/']);
        }
      });
    }
  }
}
