import { inject, Injectable } from '@angular/core';
import { collectionData, docData, Firestore } from '@angular/fire/firestore';
import { DashboardStateService } from '../state/dashboard-state.service';
import { collection, doc, query } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  firestore = inject(Firestore)
  dashboardState = inject(DashboardStateService);

  getUserData() {
    const userId = this.dashboardState.userId();

    return docData(doc(this.firestore, `users/${userId}`), { idField: 'id' });
  }

  getAllUsers() {
    const ref = collection(this.firestore, 'users');
    return collectionData(ref, { idField: 'id' });
  }
}
