// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, database } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { ref, set, get } from 'firebase/database';

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Fetch user role from database
        try {
          const userRoleRef = ref(database, `users/${currentUser.uid}/role`);
          const snapshot = await get(userRoleRef);
          const role = snapshot.val() || 'customer'; // default to customer
          setUserRole(role);
        } catch (error) {
          console.error('Error fetching user role:', error);
          setUserRole('customer'); // default fallback
        }
      } else {
        setUserRole(null);
      }
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const register = async (email, password, role = 'customer') => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Save user role and basic info to database
      await set(ref(database, `users/${user.uid}`), {
        email: user.email,
        role: role,
        createdAt: new Date().toISOString()
      });
      
      setUserRole(role);
      return userCredential;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
    setUserRole(null);
  };

  const isAdmin = () => {
    return userRole === 'admin';
  };

  const isCustomer = () => {
    return userRole === 'customer';
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      userRole,
      login, 
      register, 
      logout, 
      isAuthenticated: !!user,
      isAdmin,
      isCustomer
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);