import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import DarkModeToggle from "../components/DarkModeToggle";

export default function MainLayout() {
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
