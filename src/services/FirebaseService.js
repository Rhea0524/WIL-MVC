import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export class FirebaseService {
  async saveClientInfoAsync(clientInfo) {
    try {
      const docRef = await addDoc(collection(db, 'clients'), {
        ...clientInfo,
        createdAt: Timestamp.now(),
      });
      return docRef.id; // returns the ID of the new document
    } catch (error) {
      console.error('Error saving client info:', error);
      throw error;
    }
  }
}

export const firebaseService = new FirebaseService();
