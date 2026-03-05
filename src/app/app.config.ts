import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD_MYUxj2sL0WkwjI5K55WpM7izu8ZOwFE",
  authDomain: "dabubble-93439.firebaseapp.com",
  projectId: "dabubble-93439",
  storageBucket: "dabubble-93439.firebasestorage.app",
  messagingSenderId: "275750981191",
  appId: "1:275750981191:web:e56546c68aa03b26872b62",
  measurementId: "G-V5HZ2VQP20"
};

export const appConfig: ApplicationConfig = {
  providers: [ provideFirebaseApp(() => initializeApp( firebaseConfig )),
    provideFirestore(() => getFirestore()),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideClientHydration(withEventReplay())
  ]
};
