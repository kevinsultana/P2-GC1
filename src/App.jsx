import React from "react";
import { RouterProvider } from "react-router";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import WebRoute from "./routes/router.jsx";

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={WebRoute} />
    </AuthProvider>
  );
}
