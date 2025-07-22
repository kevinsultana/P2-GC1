import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import AuthLayout from "../layout/AuthLayout";
import Home from "../pages/Home";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import CMSLayout from "../layout/CMSLayout";
import DashboardCMS from "../pages/DashboardCMS";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/cms",
    element: <CMSLayout />,
    children: [
      {
        index: true,
        element: <DashboardCMS />,
      },
    ],
  },
  {
    path: "*",
    element: <div>404</div>,
  },
]);

export default router;
