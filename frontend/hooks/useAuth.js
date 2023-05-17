import { useState, useEffect } from "react";
import Router from "next/router";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../lib/firebase";

const useAuth = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const allowedEmails = [
    "christopher.j.mcelwain@gmail.com",
    "martinconstruction0911@gmail.com",
  ];

  const login = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && allowedEmails.includes(user.email)) {
        setUserEmail(user.email);
        const token = await user.getIdToken();
        localStorage.setItem("token", token);
        localStorage.setItem("loginTimestamp", Date.now());
        setIsLoggedIn(true); // add this line
        Router.push("/admin");
      } else if (user && !allowedEmails.includes(user.email)) {
        setError("You are not authorized to access this page.");
        await logout();
      }
      setLoading(false);
    });

    // Cleanup function: unsubscribe from the listener when the component is unmounted
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      localStorage.setItem("loginTimestamp", "");
      setUserEmail(null);
      setIsLoggedIn(false);
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  return { login, logout, error, loading, userEmail, isLoggedIn };
};

export default useAuth;
