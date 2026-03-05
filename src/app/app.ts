import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { RouterOutlet } from '@angular/router';
import { collection } from 'firebase/firestore';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    AsyncPipe
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('dabubble');

  firestore = inject(Firestore);
  itemCollection = collection(this.firestore, 'items');
  item$ = collectionData(this.itemCollection);
}
