import useAuth from "../../hooks/useAuth";
import AdminDashboard from "./AdminDashboard";
import { useState, useEffect, useCallback } from "react";

import styles from "../../styles/Home.module.css";

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, logout, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await login(email, password);
      if (success) {
        setIsLoggedIn(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const autoLogoutTimeout = 30 * 60 * 1000; // 30 minutes

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
  }, [logout]);

  useEffect(() => {
    if (isLoggedIn) {
      const timer = setTimeout(handleLogout, autoLogoutTimeout);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, handleLogout]);

  

  return (
    <div className="bg-neutral-800 text-neutral-100 py-20 px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto">
        {isLoggedIn ? (
          <>
            <AdminDashboard />
            <div className="flex justify-center">
              <button
                onClick={handleLogout}
                className=" px-12 py-2 bg-neutral-700 hover:bg-neutral-600 text-neutral-100 rounded-md"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold mb-8 text-center">
              Admin Login
            </h1>
            <form
              onSubmit={handleSubmit}
              className="bg-neutral-700 p-6 rounded-md space-y-6"
            >
              <div>
                <label htmlFor="email" className="block mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-3 bg-neutral-600 rounded-md text-neutral-100"
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-3 bg-neutral-600 rounded-md text-neutral-100"
                />
              </div>
              {error && (
                <div className="bg-red-700 hover:bg-red-600 p-2 rounded-md">
                  {error}
                </div>
              )}
              <button
                type="submit"
                className={`w-full p-3 rounded-md text-neutral-800 font-bold ${styles.mcBackColor} ${styles.backHov}`}
              >
                LOGIN
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
