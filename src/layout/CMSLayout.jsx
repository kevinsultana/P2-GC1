import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import DarkModeToggle from "../components/DarkModeToggle";
import { AuthContext } from "../contexts/AuthContext";

export default function CMSLayout() {
  const navigate = useNavigate();
  const { user, loading, userRole } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      navigate("/auth/login", { replace: true });
    }
    if (userRole === "admin") {
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
    <div className=" bg-white h-screen dark:bg-gray-800 transition-all duration-300">
      <Navbar />
      <Outlet />
      <div className="fixed bottom-3 right-3 lg:bottom-10 lg:right-10">
        <DarkModeToggle />
      </div>
    </div>
  );
}
