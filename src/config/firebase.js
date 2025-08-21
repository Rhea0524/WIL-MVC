// src/config/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCUk2qKdDbp3oXJp1IBzlbQTSJPAs4bBwg",
  authDomain: "xamu-75371-632ed.firebaseapp.com",
  databaseURL: "https://xamu-75371-632ed-default-rtdb.firebaseio.com",
  projectId: "xamu-75371-632ed",
  storageBucket: "xamu-75371-632ed.appspot.com",
  messagingSenderId: "851420243803",
  appId: "1:851420243803:web:8e51157b0b3c4cf9ff1c7e",
  measurementId: "G-7EV033WFZE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
export default app;

