import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from "@angular/router";
import { DashboardStateService } from '../../state/dashboard-state.service';

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
  router = inject(Router);
  dashboardState = inject(DashboardStateService);
  
  goToDashboard(userId: string) {
    this.dashboardState.userId.set(userId);
    this.router.navigate([`/dashboard/${userId}`]);
  }
}
