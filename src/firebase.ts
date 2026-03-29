// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_MYUxj2sL0WkwjI5K55WpM7izu8ZOwFE",
  authDomain: "dabubble-93439.firebaseapp.com",
  projectId: "dabubble-93439",
  storageBucket: "dabubble-93439.firebasestorage.app",
  messagingSenderId: "275750981191",
  appId: "1:275750981191:web:e56546c68aa03b26872b62",
  measurementId: "G-V5HZ2VQP20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
console.log("Firebase initialized");