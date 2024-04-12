import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "./config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";

import { setData } from "../redux/jobseekerReducer";
import { useDispatch } from "react-redux";

const AuthContext = React.createContext();

export const AuthContexts = ({ children }) => {
  const dispatch = useDispatch();
  const [user, setCurrentUser] = useState();
  const [isLoading, setLoading] = useState(true);

  const signUp = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    return signOut(auth);
  };

  const sendPasswordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const uid = user?.uid;
          const userColl = collection(db, "users");
          const docRef = query(userColl, where("uid", "==", uid));
          const res = await getDocs(docRef);
          if (res.docs.length != 0) {
            const data = res.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));

            if (data[0].role === "jobseeker") {
              try {
                const collectionRef = collection(db, "jobs");
                const res1 = await getDocs(collectionRef);

                if (res1.docs.length !== 0) {
                  const temp = res1.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                  }));

                  temp.sort((a, b) => {
                    const dateA = new Date(a.postedDate);
                    const dateB = new Date(b.postedDate);

                    // Compare the dates
                    return dateB-dateA;
                  });

                  dispatch(setData({ data: data[0], jobs: temp }));
                }
              } catch (error) {
                console.error(error);
              }
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
      setCurrentUser(user);
    });
    setLoading(false);

    return unsubscribe;
  }, []);

  const value = {
    user,
    signUp,
    signIn,
    logout,
    sendPasswordReset,
    signInWithGoogle,
  };
  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
