import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div className="px-8">
      <Navbar />
      <Outlet />
    </div>
  );
}
