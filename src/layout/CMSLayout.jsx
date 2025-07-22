import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import DarkModeToggle from "../components/DarkModeToggle";
import { AuthContext } from "../contexts/AuthContext";
import { BiMenu } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { FcAddDatabase } from "react-icons/fc";
import { IoAdd } from "react-icons/io5";

export default function CMSLayout() {
  const navigate = useNavigate();
  const { user, loading, userRole } = useContext(AuthContext);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/auth/login", { replace: true });
    }
    if (userRole === "admin") {
      navigate("/cms", { replace: true });
    }
  }, [user, userRole]);

  if (loading)
    return (
      <div className="bg-primaryLight dark:bg-primaryDark text-black dark:text-white w-full h-screen flex items-center justify-center">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );

  return (
    <div className=" bg-white h-screen dark:bg-gray-800 transition-all duration-300">
      <Navbar />
      <div className="flex h-full">
        <aside
          className={` ${
            isSideBarOpen ? "w-1/8" : "w-1/28"
          } bg-white dark:bg-gray-800 border-r border-black dark:border-white p-4 transition-all duration-300 space-y-4 h-full flex flex-col`}
        >
          <button className="self-end">
            <BiMenu
              onClick={() => setIsSideBarOpen(!isSideBarOpen)}
              className="h-6 w-6 text-black dark:text-white"
            />
          </button>
          <button
            onClick={() => navigate("/cms")}
            className="flex gap-2 transition-all duration-500"
          >
            <HiHome className="h-6 w-6 text-black dark:text-white" />
            {isSideBarOpen && "Home"}
          </button>
          <button
            onClick={() => navigate("/cms/new-product")}
            className="flex gap-2 transition-all duration-500"
          >
            <IoAdd className="h-6 w-6 text-black dark:text-white" />
            {isSideBarOpen && "Add New Product"}
          </button>
        </aside>
        <Outlet />
      </div>
      <div className="fixed bottom-3 right-3 lg:bottom-10 lg:right-10">
        <DarkModeToggle />
      </div>
    </div>
  );
}
