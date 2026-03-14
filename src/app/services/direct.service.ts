import { inject, Injectable } from '@angular/core';
import { collectionData, docData, Firestore } from '@angular/fire/firestore';
import { DashboardStateService } from '../state/dashboard-state.service';
import { collection, doc, query, where } from 'firebase/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DirectService {
  firestore = inject(Firestore)
  dashboardState = inject(DashboardStateService);

  getUserChats() {
    const userId = this.dashboardState.userId();

    const ref = collection(this.firestore, 'directs');
    const q = query(ref, where('members', 'array-contains', userId));

    return collectionData(q, { idField: 'id' });
  }

}
