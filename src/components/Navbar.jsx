import React, { useState } from "react";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import LogoAlt from "../assets/logoAlt.png";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router";

export default function Navbar() {
  const [showAccMenu, setShowAccMenu] = useState(false);
  const [modalConfirmation, setModalConfirmation] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);

  const navigate = useNavigate();

  const openModal = () => {
    setModalConfirmation(true);
    setShowAccMenu(false);
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
    <div className="flex justify-between p-2 px-4 lg:px-10 border border-black dark:border-white items-center bg-primaryLight dark:bg-primaryDark transition-all duration-300">
      <div className="flex items-center gap-4">
        <img src={LogoAlt} alt="logo" className="w-10" />
        <h1 className="text-black dark:text-white">Apel Gadget Store</h1>
      </div>
      <div className="flex gap-4 text-black dark:text-white">
        <FaCartShopping />
        <FaUser
          className="cursor-pointer"
          onClick={() => setShowAccMenu(!showAccMenu)}
        />
      </div>

      {showAccMenu && (
        <div className="absolute top-12 right-10 bg-white dark:bg-gray-600 border rounded-lg shadow-lg p-4 z-10 transition-all duration-300">
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
