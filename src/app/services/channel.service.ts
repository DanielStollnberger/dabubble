import { inject, Injectable } from '@angular/core';
import { DashboardStateService } from '../state/dashboard-state.service';
import { collection, query, where } from 'firebase/firestore';
import { collectionData, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  firestore = inject(Firestore)
  dashboardState = inject(DashboardStateService);

  getUserChannels() {
    const userId = this.dashboardState.userId();

    const ref = collection(this.firestore, 'channels');
    const q = query(ref, where('members', 'array-contains', userId));

    return collectionData(q, { idField: 'id' });
  }
}
