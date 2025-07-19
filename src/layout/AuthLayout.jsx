import React from "react";
import { Outlet } from "react-router";
import DarkModeToggle from "../components/DarkModeToggle";
import LogoAlt from "../assets/logoAlt.png";

export default function AuthLayout() {
  return (
    <div className="lg:px-8 w-full h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-700 transition-all duration-300">
      <div className="rounded-3xl overflow-hidden mb-4">
        <img src={LogoAlt} alt="logo" className="w-20" />
      </div>
      <Outlet />
      <div className="fixed bottom-3 right-3 lg:bottom-10 lg:right-10">
        <DarkModeToggle />
      </div>
    </div>
  );
}
