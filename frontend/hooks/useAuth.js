import { useState } from "react";
import Router from "next/router";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../lib/firebase";

const useAuth = () => {
  const [error, setError] = useState(null);

  const allowedEmails = [
    "christopher.j.mcelwain@gmail.com",
    "martinconstruction0911@gmail.com",
  ];

  const login = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      if (!allowedEmails.includes(user.email)) {
        setError("You are not authorized to access this page.");
        return false;
      }
      
      const token = await user.getIdToken();
      localStorage.setItem("token", token); 
      Router.push("/admin");
      return user;
    } catch (error) {
      const errorMessage = error.message;
      setError(errorMessage);
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
  };

  return { login, logout, error };
};

export default useAuth;