import React from "react";
import { RouterProvider } from "react-router";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import router from "./routes/router.jsx";

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
