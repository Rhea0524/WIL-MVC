import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  databaseURL: "https://xamu-75371-default-rtdb.europe-west1.firebasedatabase.app/",
  // You'll need to add your other Firebase config properties here
  // Get these from your Firebase Console -> Project Settings -> General -> Your apps
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);