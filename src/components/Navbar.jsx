import React, { useState } from "react";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import LogoAlt from "../assets/logoAlt.png";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router";

export default function Navbar() {
  const [showAccMenu, setShowAccMenu] = useState(false);

  const navigate = useNavigate();

  const handleLogOut = () => {
    auth.signOut().then(() => {
      navigate("/auth/login", { replace: true });
    });
  };

  return (
    <div className="flex justify-between p-2 px-4 lg:px-10 border border-black dark:border-white items-center bg-primaryLight dark:bg-primaryDark transition-all duration-300">
      <div className="flex items-center gap-4">
        <img src={LogoAlt} alt="logo" className="w-10" />
        <h1 className="text-black dark:text-white">Apel Gadget Store</h1>
      </div>
      <div className="flex gap-4 text-black dark:text-white">
        <FaCartShopping />
        <FaUser onClick={() => setShowAccMenu(!showAccMenu)} />
      </div>

      {showAccMenu && (
        <div className="absolute top-12 right-10 bg-white dark:bg-gray-600 border rounded-lg shadow-lg p-4 z-10 transition-all duration-300">
          <ul className="flex flex-col gap-2">
            <li className="cursor-pointer text-black dark:text-white hover:text-blue-400  transition-all duration-300">
              Profile
            </li>
            <li
              onClick={handleLogOut}
              className="cursor-pointer text-black dark:text-white hover:text-blue-400  transition-all duration-300"
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
