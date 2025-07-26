import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import Navbar from "../components/Navbar";
import DarkModeToggle from "../components/DarkModeToggle";
import { AuthContext } from "../contexts/AuthContext";
import { HiHome } from "react-icons/hi";
import { IoAdd } from "react-icons/io5";
import { BiMenu } from "react-icons/bi";

export default function CMSLayout() {
  const navigate = useNavigate();
  const { user, loading, userRole } = useContext(AuthContext);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!user) {
      navigate("/auth/login", { replace: true });
    } else if (userRole !== "admin") {
      navigate("/", { replace: true });
    }
  }, [user, loading, userRole, navigate]);

  if (loading)
    return (
      <div className="bg-primaryLight dark:bg-primaryDark text-black dark:text-white w-full h-screen flex items-center justify-center">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col transition-all duration-300">
      <Navbar
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:static h-full lg:h-auto top-0 left-0 z-40
            ${
              isSideBarOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full"
            } lg:${isSideBarOpen ? "w-64" : "w-20"} lg:translate-x-0
            bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
            py-6 px-4 transition-all duration-300 ease-in-out
            flex flex-col flex-shrink-0 shadow-md overflow-hidden lg:overflow-visible`}
        >
          {/* toggle sidebar desktop */}
          <button
            onClick={() => setIsSideBarOpen(!isSideBarOpen)}
            className="self-end p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors mb-6 hidden lg:block"
          >
            <BiMenu className="h-7 w-7 text-gray-700 dark:text-gray-300" />
          </button>

          {/* Navigation Links */}
          <nav className="space-y-4 flex-1">
            {/* Home Link */}
            <button
              onClick={() => {
                navigate("/cms");
                if (window.innerWidth < 1024) setIsSideBarOpen(false);
              }}
              className={`flex items-center gap-4 w-full p-3 rounded-lg
                transition-colors duration-200
                ${
                  location.pathname === "/cms"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
            >
              <HiHome className="h-6 w-6 flex-shrink-0" />
              <span
                className={`whitespace-nowrap transition-opacity duration-300 ${
                  isSideBarOpen ? "opacity-100" : "lg:opacity-0 lg:hidden"
                }`}
              >
                Home
              </span>
            </button>

            {/* Add New Product Link */}
            <button
              onClick={() => {
                navigate("/cms/new-product");
                if (window.innerWidth < 1024) setIsSideBarOpen(false);
              }}
              className={`flex items-center gap-4 w-full p-3 rounded-lg
                transition-colors duration-200
                ${
                  location.pathname === "/cms/new-product"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
            >
              <IoAdd className="h-6 w-6 flex-shrink-0" />
              <span
                className={`whitespace-nowrap transition-opacity duration-300 ${
                  isSideBarOpen ? "opacity-100" : "lg:opacity-0 lg:hidden"
                }`}
              >
                Add New Product
              </span>
            </button>
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {isSideBarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsSideBarOpen(false)}
          ></div>
        )}

        {/* Main Content Area */}
        <main className={`flex-1  lg:p-6 overflow-auto `}>
          <Outlet />
        </main>
      </div>

      {/* Dark Mode Toggle (Fixed Position) */}
      <div className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-50">
        <DarkModeToggle />
      </div>
    </div>
  );
}
