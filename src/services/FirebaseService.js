// src/services/FirebaseService.js
import { database } from '../config/firebase';
import { ref, push } from 'firebase/database';

export class FirebaseService {
  async saveClientInfoAsync(clientInfo, userRole = null) {
    try {
      // Optional: Add server-side role validation
      if (userRole && userRole !== 'customer') {
        throw new Error('Access denied: Only customers can create projects');
      }

      const clientInfoRef = ref(database, 'clientInfo');
      const result = await push(clientInfoRef, {
        ...clientInfo,
        // Add metadata for tracking
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString()
      });
      
      console.log('Project saved successfully:', result.key);
      return true;
    } catch (error) {
      console.error('Error saving client info:', error);
      throw error;
    }
  }

  // Optional: Add method to get projects for admin view
  async getProjects() {
    try {
      const projectsRef = ref(database, 'clientInfo');
      const snapshot = await get(projectsRef);
      
      if (snapshot.exists()) {
        const projectsData = snapshot.val();
        return Object.entries(projectsData).map(([id, data]) => ({
          id,
          ...data
        }));
      }
      return [];
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  }
}

export const firebaseService = new FirebaseService();