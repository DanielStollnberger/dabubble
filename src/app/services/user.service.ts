import { inject, Injectable } from '@angular/core';
import { collectionData, docData, Firestore } from '@angular/fire/firestore';
import { DashboardStateService } from '../state/dashboard-state.service';
import { collection, doc, query } from 'firebase/firestore';
import { Observable, switchMap } from 'rxjs';
import { User } from './models/user.model';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  firestore = inject(Firestore)
  dashboardState = inject(DashboardStateService);

  getUserData() {
    return toObservable(this.dashboardState.userId).pipe(
      switchMap((userId) => {
        if (!userId) return [];
        return docData(doc(this.firestore, `users/${userId}`), { idField: 'id' });
      })
    );
  }

  getAllUsers(): Observable<User[]> {
    const ref = collection(this.firestore, 'users');
    return collectionData(ref, { idField: 'id' }) as Observable<User[]>;
  }
}
