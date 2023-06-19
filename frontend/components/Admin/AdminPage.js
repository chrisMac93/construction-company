import useAuth from "../../hooks/useAuth";
import AdminDashboard from "./AdminDashboard";
import { useEffect, useCallback } from "react";

import styles from "../../styles/Home.module.css";

const AdminPage = () => {
  const { login, logout, error, loading, userEmail, isLoggedIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login();
  };

  const autoLogoutTimeout = 30 * 60 * 1000; // 30 minutes

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  useEffect(() => {
    if (isLoggedIn) {
      const loginTimestamp = localStorage.getItem("loginTimestamp");
      const currentTimestamp = Date.now();

      if (currentTimestamp - loginTimestamp > autoLogoutTimeout) {
        handleLogout();
      }
    }
  }, [isLoggedIn, handleLogout, autoLogoutTimeout]);

  useEffect(() => {
    if (isLoggedIn) {
      const timer = setTimeout(handleLogout, autoLogoutTimeout);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, handleLogout, autoLogoutTimeout]);

  return (
    <div className="bg-neutral-800 text-neutral-100 py-20 px-4 sm:px-8 md:px-16 lg:px-24 overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        {loading ? (
          <div>Loading...</div>
        ) : isLoggedIn ? (
          <>
            <AdminDashboard userEmail={userEmail} />
            <div className="flex justify-center">
              <button
                onClick={handleLogout}
                className="px-12 py-2 bg-neutral-700 hover:bg-neutral-600 text-neutral-100 rounded-md"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold mb-8 mt-16 text-center">
              Admin Login
            </h1>
            <form
              onSubmit={handleSubmit}
              className="bg-neutral-700 p-6 rounded-md space-y-6"
            >
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
