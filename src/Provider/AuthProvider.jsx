import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";

// Create context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  //state
  const [user, setUser] = useState(null);
  //state
  const [loading, setLoading] = useState(true);

  console.log(user, loading);
  // create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //update user
  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };
  //  sign in
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    // Check authentication status when the app loads
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe(); // Cleanup on component unmount
  }, []);

  const authData = {
    user,
    setUser,
    createUser,
    signIn,
    logOut,
    loading,
    setLoading,
    updateUser,
  };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;