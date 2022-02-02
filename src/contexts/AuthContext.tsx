/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
  User,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

import { auth } from "../firebase";

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext<any>(AuthContext);
};

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  const emailUpdate = (email: string) => {
    if (currentUser !== null) {
      return updateEmail(currentUser, email);
    }
  };

  const passwordUpdate = (password: string) => {
    if (currentUser !== null) {
      return updatePassword(currentUser, password);
    }
  };

  const nameUpdate = (name: string) => {
    if (currentUser !== null) {
      return updateProfile(currentUser, { displayName: name });
    }
  };

  const deleteAccount = () => {
    if (currentUser !== null) {
      return deleteUser(currentUser);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    emailUpdate,
    passwordUpdate,
    deleteAccount,
    nameUpdate,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
