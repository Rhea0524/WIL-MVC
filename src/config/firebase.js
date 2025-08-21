import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCUk2qKdDbp3oXJp1IBzlbQTSJPAs4bBwg",
  authDomain: "xamu-75371-632ed.firebaseapp.com",
  projectId: "xamu-75371-632ed",
  storageBucket: "xamu-75371-632ed.firebasestorage.app",
  messagingSenderId: "851420243803",
  appId: "1:851420243803:web:8e51157b0b3c4cf9ff1c7e"
  // No need for measurementId or databaseURL for Firestore
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);   // Firestore
export const auth = getAuth(app);      // Auth (optional)
export const storage = getStorage(app);// Storage (optional)
