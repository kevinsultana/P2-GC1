import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import DarkModeToggle from "../components/DarkModeToggle";
import LogoAlt from "../assets/logoAlt.png";
import { AuthContext } from "../contexts/AuthContext";

export default function AuthLayout() {
  const navigate = useNavigate();
  const { user, loading, userRole } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    } else if (userRole === "admin") {
      navigate("/cms", { replace: true });
    }
  }, [user, userRole]);

  if (loading)
    return (
      <div className="bg-primaryLight dark:bg-primaryDark text-black dark:text-white w-full h-screen flex items-center justify-center">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );

  return (
    <div className="lg:px-8 w-full h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-700 transition-all duration-300">
      <div className="rounded-3xl overflow-hidden mb-4 bg-white dark:bg-gray-400 transition-all duration-300">
        <img src={LogoAlt} alt="logo" className="w-20" />
      </div>
      <Outlet />
      <div className="fixed bottom-3 right-3 lg:bottom-10 lg:right-10">
        <DarkModeToggle />
      </div>
    </div>
  );
}
