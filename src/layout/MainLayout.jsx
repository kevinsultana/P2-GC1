import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import DarkModeToggle from "../components/DarkModeToggle";

export default function MainLayout() {
  return (
    <div className="px-8">
      <Navbar />
      <Outlet />
      <div className="fixed bottom-3 right-3 lg:bottom-10 lg:right-10">
        <DarkModeToggle />
      </div>
    </div>
  );
}
