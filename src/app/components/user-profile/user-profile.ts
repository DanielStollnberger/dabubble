import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { collectionData, docData, Firestore } from '@angular/fire/firestore';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { collection, doc } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  imports: [
    MatIconButton,
    MatIconModule,
    AsyncPipe
  ],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss',
})
export class UserProfile {
  item$!: Observable<any>;
  firestore = inject(Firestore);
  userDoc = doc(this.firestore, 'users/WBHA1uDY1l9RqhlAWNC0');
  
  constructor() {
    this.item$ = docData(this.userDoc);
  }
}
