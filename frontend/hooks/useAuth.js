import { useState } from "react";
import Router from "next/router";

const useAuth = () => {
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.status === 200) {
        const { token } = await res.json();
        localStorage.setItem("token", token);
        Router.push("/admin");
        return true;
      } else {
        setError("Invalid email or password");
        return false;
      }
    } catch (error) {
      setError("An error occurred, please try again");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
  };

  return { login, logout, error };
};

export default useAuth;