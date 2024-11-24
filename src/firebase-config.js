

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBdZlBHf_kHLRDFsJgqWTvcer68w7cSxE",
  authDomain: "wassup-cd75d.firebaseapp.com",
  projectId: "wassup-cd75d",
  storageBucket: "wassup-cd75d.firebasestorage.app",
  messagingSenderId: "7066621211",
  appId: "1:7066621211:web:3ba3ef4efa96d8f49a2fbe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);