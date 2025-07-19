import React from "react";
import { Outlet } from "react-router";
import DarkModeToggle from "../components/DarkModeToggle";

export default function AuthLayout() {
  return (
    <div className="px-8 w-full h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-700 transition-all duration-300">
      <Outlet />
      <div className="fixed bottom-10 right-10">
        <DarkModeToggle />
      </div>
    </div>
  );
}
