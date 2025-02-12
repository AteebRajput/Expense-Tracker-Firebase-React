// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  // Add your keys here
  apiKey: "AIzaSyCOr8Yj-pHn63UkcPxJgovP8YIuqe-Zq10",
  authDomain: "expensetracker-154d2.firebaseapp.com",
  projectId: "expensetracker-154d2",
  storageBucket: "expensetracker-154d2.firebasestorage.app",
  messagingSenderId: "876134036978",
  appId: "1:876134036978:web:eec95a09f55418d5d0a76b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

export { auth, provider };
