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
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";

import { auth, db } from "../firebase";

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

  const photoURLUpdate = (photoURL: string) => {
    if (currentUser !== null) {
      return updateProfile(currentUser, { photoURL });
    }
  };

  const deleteAccount = () => {
    if (currentUser !== null) {
      return deleteUser(currentUser);
    }
  };

  const addUser = (email: string) => {
    return setDoc(doc(db, "users", email), {
      id: email,
      friends: [],
    });
  };

  const getUserData = async (email: string) => {
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
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
    addUser,
    getUserData,
    photoURLUpdate,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
