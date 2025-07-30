import { database } from '../config/firebase';
import { ref, push } from 'firebase/database';

export class FirebaseService {
  async saveClientInfoAsync(clientInfo) {
    try {
      const clientInfoRef = ref(database, 'ClientInfo');
      await push(clientInfoRef, clientInfo);
      return true;
    } catch (error) {
      console.error('Error saving client info:', error);
      throw error;
    }
  }
}

export const firebaseService = new FirebaseService();