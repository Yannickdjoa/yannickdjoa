// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDEAZ3dH5KXtLrsGmBvge3CqkxQImMiiYY',
  authDomain: 'yannick-djoa.firebaseapp.com',
  projectId: 'yannick-djoa',
  storageBucket: 'yannick-djoa.appspot.com',
  messagingSenderId: '363334214935',
  appId: '1:363334214935:web:3b4a2132d1a4592b154352',
  measurementId: 'G-L4PKX4MLLX',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
