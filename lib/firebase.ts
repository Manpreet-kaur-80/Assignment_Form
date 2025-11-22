// lib/firebase.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // auth in React Native


// web app's Firebase configuration (copy-pasted from console)
const firebaseConfig = {
  apiKey: "AIzaSyBcCgEg9N-dmfdckxxAE1ytm5RpXKRvWvk",
  authDomain: "forms-fa254.firebaseapp.com",
  projectId: "forms-fa254",
  storageBucket: "forms-fa254.firebasestorage.app",
  messagingSenderId: "571828275550",
  appId: "1:571828275550:web:92ec7ad061627325cda7cf",
  measurementId: "G-SEH89BNMCJ",
};

// Initialized Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;

