// src/services/FirebaseService.js
import { database } from '../config/firebase';
import { ref, push, get, update, remove } from 'firebase/database';

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

  async saveContactFormAsync(contactData) {
    try {
      const contactFormRef = ref(database, 'contactForms');
      const result = await push(contactFormRef, {
        ...contactData,
        createdAt: new Date().toISOString(),
        status: 'unread' // Add status for admin tracking
      });
      
      console.log('Contact form saved successfully:', result.key);
      return true;
    } catch (error) {
      console.error('Error saving contact form:', error);
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

  async updateContactFormStatus(messageId, status) {
    try {
      const messageRef = ref(database, `contactForms/${messageId}`);
      await update(messageRef, {
        status: status,
        lastModified: new Date().toISOString()
      });
      return true;
    } catch (error) {
      console.error('Error updating message status:', error);
      throw error;
    }
  }

  async deleteContactForm(messageId) {
    try {
      const messageRef = ref(database, `contactForms/${messageId}`);
      await remove(messageRef);
      return true;
    } catch (error) {
      console.error('Error deleting message:', error);
      throw error;
    }
  }

  // Optional: Add method to get contact forms for admin view
  async getContactForms() {
    try {
      const contactFormsRef = ref(database, 'contactForms');
      const snapshot = await get(contactFormsRef);
      
      if (snapshot.exists()) {
        const formsData = snapshot.val();
        return Object.entries(formsData).map(([id, data]) => ({
          id,
          ...data
        }));
      }
      return [];
    } catch (error) {
      console.error('Error fetching contact forms:', error);
      throw error;
    }
  }
}

export const firebaseService = new FirebaseService();