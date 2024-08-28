// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPdKaL_VWI4eBbAHWBJvOVGylEUhrU564",
  authDomain: "expense-tracker-6b3a6.firebaseapp.com",
  projectId: "expense-tracker-6b3a6",
  storageBucket: "expense-tracker-6b3a6.appspot.com",
  messagingSenderId: "801994899843",
  appId: "1:801994899843:web:b9632109d5b2fefff8f6b6",
  measurementId: "G-16V01W5ME9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(); 
export const db = getFirestore(app);

export { auth, provider };
