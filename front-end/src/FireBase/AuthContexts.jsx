import React, { useContext, useEffect, useState } from "react";

import { auth, db } from "./config.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { collection, getDocs, query, where } from "firebase/firestore";
import { setUser } from "../features/user/UserSlice.js";
import { setGuide } from "../features/guide/GuideSlice.js";
import { setHotel } from "../features/hotel/HotelSlice.js";
import { setAgency } from "../features/agency/AgencySlice.js";
const AuthContext = React.createContext();

export const AuthContexts = ({ children }) => {
  const dispatch = useDispatch();
  const [user, setCurrentUser] = useState();
  const [role, setRole] = useState();
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

            if (data[0].role == "user") {
              dispatch(setUser(data[0]));
              setRole("user");
            } else if (data[0].role == "guide") {
              dispatch(setGuide(data[0]));
              setRole("guide");
            }else if(data[0].role == "hotel"){
              dispatch(setHotel(data[0]));
              setRole("hotel");
            }else if(data[0].role == "agency"){
              dispatch(setAgency(data[0]));
              setRole("agency");
            }
            setCurrentUser(user);
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        setRole();
        setCurrentUser();
      }
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
    role,
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
