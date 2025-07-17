import React from "react";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="px-8">
      AuthLayout
      <Outlet />
    </div>
  );
}
