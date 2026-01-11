// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// (analytics is OPTIONAL, we can remove it for now)

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYwaqg6F0Prbux4TKPCkl2plsyF4lis3c",
  authDomain: "eco-tracker-cd561.firebaseapp.com",
  projectId: "eco-tracker-cd561",
  storageBucket: "eco-tracker-cd561.firebasestorage.app",
  messagingSenderId: "30906157154",
  appId: "1:30906157154:web:dee0d48543cf1591e3a93b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ CREATE AUTH INSTANCE
const auth = getAuth(app);

// ✅ EXPORT AUTH (THIS FIXES YOUR ERROR)
export { auth };
