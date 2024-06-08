// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_APIKEY,
  authDomain: import.meta.env.FIREBASE_AUTHDOMAIN,
  projectId: 'yannick-djoa',
  storageBucket: 'yannick-djoa.appspot.com',
  messagingSenderId: import.meta.env.FIREBASE_MESSAGEINGSENDERID,
  appId: import.meta.env.FIREBASE_APPID,
  measurementId: import.meta.env.FIREBASE_MEASUREMENTID,
};
console.log(firebaseConfig);

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
