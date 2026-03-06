import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardStateService {
  userId = signal<string | null>(null);
}
