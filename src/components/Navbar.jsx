import React, { useContext, useState } from "react";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import LogoAlt from "../assets/logoAlt.png";
import { auth } from "../firebase/firebase";
import { useLocation, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const { userRole } = useContext(AuthContext);
  const [showAccMenu, setShowAccMenu] = useState(false);
  const [modalConfirmation, setModalConfirmation] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const navigate = useNavigate();
  const path = useLocation();

  const openModal = () => {
    setModalConfirmation(true);
    setShowAccMenu(false);
    setShowMobileMenu(false);
    setTimeout(() => setAnimateModal(true), 10);
  };

  const closeModal = () => {
    setAnimateModal(false);
    setTimeout(() => setModalConfirmation(false), 300);
  };

  const handleLogOut = () => {
    auth.signOut().then(() => {
      navigate("/auth/login", { replace: true });
    });
  };

  return (
    <div className="flex justify-between p-2 px-4 lg:px-10 border border-black dark:border-white items-center bg-primaryLight dark:bg-primaryDark transition-all duration-300 relative">
      <div className="flex items-center gap-4">
        <img src={LogoAlt} alt="logo" className="w-10" />
        <h1 className="text-black dark:text-white text-lg font-semibold">
          Apel Gadget Store
        </h1>
      </div>

      {/* Desktop Menu*/}
      <div className="hidden lg:flex gap-4 text-black dark:text-white items-center">
        {userRole === "admin" && (
          <button
            className="cursor-pointer hover:text-blue-400 dark:hover:text-blue-500 transition-colors"
            onClick={() =>
              navigate(path.pathname === "/cms" ? "/" : "/cms", {
                replace: true,
              })
            }
          >
            Go to {path.pathname === "/cms" ? "Home" : "CMS"}
          </button>
        )}
        <FaCartShopping className="w-5 h-5" />
        <FaUser
          className="cursor-pointer w-5 h-5"
          onClick={() => setShowAccMenu(!showAccMenu)}
        />
      </div>

      {/* Mobile Menu Toggle - visible on md and down */}
      <div className="lg:hidden flex items-center gap-4">
        <FaCartShopping className="w-5 h-5 text-black dark:text-white" />
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="p-2 text-black dark:text-white"
        >
          {showMobileMenu ? (
            <FaTimes className="w-6 h-6" />
          ) : (
            <FaBars className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Sidebar/Dropdown Menu */}
      {showMobileMenu && (
        <div className="absolute top-full right-5 w-60 bg-white dark:bg-gray-800 shadow-lg py-4 lg:hidden z-20">
          <ul className="flex flex-col gap-3 px-4 text-black dark:text-white">
            {userRole === "admin" && (
              <li>
                <button
                  className="w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                  onClick={() => {
                    navigate(path.pathname === "/cms" ? "/" : "/cms", {
                      replace: true,
                    });
                    setShowMobileMenu(false);
                  }}
                >
                  Go to {path.pathname === "/cms" ? "Home" : "CMS"}
                </button>
              </li>
            )}
            <li>
              <button
                className="w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                onClick={() => {
                  setShowMobileMenu(false);
                }}
              >
                Profile
              </button>
            </li>
            <li>
              <button
                onClick={openModal}
                className="w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Account Menu*/}
      {showAccMenu && (
        <div className="absolute top-12 right-10 bg-white dark:bg-gray-600 border rounded-lg shadow-lg p-4 z-10 transition-all duration-300 hidden lg:block">
          <ul className="flex flex-col gap-2">
            <li className="cursor-pointer text-black dark:text-white hover:text-blue-400  transition-all duration-300">
              Profile
            </li>
            <li
              onClick={() => {
                openModal();
              }}
              className="cursor-pointer text-black dark:text-white hover:text-blue-400  transition-all duration-300"
            >
              Logout
            </li>
          </ul>
        </div>
      )}

      {modalConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            className={`bg-white dark:bg-gray-800 rounded-lg p-6 w-11/12 max-w-lg relative transform transition-all duration-300 ${
              animateModal ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
          >
            <p className="text-black dark:text-white">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => closeModal()}
                className="mr-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleLogOut}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
