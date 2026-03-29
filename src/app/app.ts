import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

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

  platformId = inject(PLATFORM_ID);

ngOnInit() {
  if (isPlatformBrowser(this.platformId)) {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.router.navigate([`/dashboard/${user.uid}`]);
      }
      if (!user) {
        this.router.navigate(['/']);
      }
    });
  }
}
}
