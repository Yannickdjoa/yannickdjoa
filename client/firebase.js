// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAgW7qfyx7J75QYwylu1Lp-TS1JmQLtxVA',
  authDomain: 'yannickdjoa-web.firebaseapp.com',
  projectId: 'yannickdjoa-web',
  storageBucket: 'yannickdjoa-web.appspot.com',
  messagingSenderId: '168129074733',
  appId: '1:168129074733:web:db6edf3ecc8dee5bab0aa4',
  measurementId: 'G-4LHTMLJ8TC',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
