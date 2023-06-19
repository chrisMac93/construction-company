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

  // Define the list of allowed emails that can login
  const allowedEmails = process.env.ALLOWED_EMAILS.split(",");

  // Function to login the user using GoogleAuthProvider
  const login = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  // Effect to handle the user's auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // Check if the user is logged in and is an allowed user
      if (user && allowedEmails.includes(user.email)) {
        setUserEmail(user.email);
        const token = await user.getIdToken();
        // Store the user's token and the login timestamp in local storage
        localStorage.setItem("token", token);
        localStorage.setItem("loginTimestamp", Date.now());
        setIsLoggedIn(true);
        // Redirect the user to the admin page
        Router.push("/admin");
      }
      // Check if the user is logged in and is not an allowed user
      else if (user && !allowedEmails.includes(user.email)) {
        setError("You are not authorized to access this page.");
        await logout();
      }
      setLoading(false);
    });

    // Cleanup function: unsubscribe from the listener when the component is unmounted
    return () => unsubscribe();
  }, []);

  // Function to logout the user
  const logout = async () => {
    try {
      await signOut(auth);
      // Clear the user's token and the login timestamp from local storage
      localStorage.removeItem("token");
      localStorage.setItem("loginTimestamp", "");
      setUserEmail(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error(error);
    }
  };

  return { login, logout, error, loading, userEmail, isLoggedIn };
};

export default useAuth;
