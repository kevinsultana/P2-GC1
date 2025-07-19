import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import DarkModeToggle from "../components/DarkModeToggle";

export default function MainLayout() {
  return (
    <div className="px-8">
      <Navbar />
      <Outlet />
      <div className="fixed bottom-10 right-10">
        <DarkModeToggle />
      </div>
    </div>
  );
}
