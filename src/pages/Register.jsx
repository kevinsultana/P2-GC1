import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAgree, setIsAgree] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showModalTc, setShowModalTc] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const openModalTc = () => {
    setShowModalTc(true);
    setTimeout(() => setAnimateModal(true), 10);
  };

  const handleCloseModal = () => {
    setAnimateModal(false);
    setTimeout(() => setShowModalTc(false), 300);
  };

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password || !confirmPassword) {
      Swal.fire("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire("Passwords do not match");
      setLoading(false);
      return;
    }

    if (!isAgree) {
      Swal.fire("Please agree to the terms and conditions");
      setLoading(false);
      return;
    }

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      Swal.fire("Register successful");
      navigate("/", { replace: true });
      setLoading(false);
    } catch (error) {
      let message = "Register Failed";
      if (error.code === "auth/email-already-in-use") {
        message = "Email already in use";
      } else if (error.code === "auth/invalid-email") {
        message = "Invalid email";
      } else if (error.code === "auth/weak-password") {
        message = "Weak password";
      }
      Swal.fire(message);
      setLoading(false);
    }
  };

  const handleToLogin = () => {
    navigate("/auth/login");
  };
  return (
    <div className="w-7/8 lg:w-1/4 bg-white border rounded-2xl p-4 shadow-2xl dark:shadow-white/50">
      <div className="text-2xl font-bold text-black text-center">Register</div>
      <form className="flex flex-col space-y-2 text-black">
        <label className="text-black">Email</label>
        <input
          type="text"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
          className="border p-1 rounded-sm outline-none"
        />
        <label>Password</label>
        <div className="border p-1 px-2 rounded-sm flex justify-between items-center">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password..."
            onChange={(e) => setPassword(e.target.value)}
            className="outline-none w-full"
          />
          <div
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            {!showPassword ? <FaEye /> : <FaEyeSlash />}
          </div>
        </div>
        <label>Confirm password</label>
        <div className="border p-1 px-2 rounded-sm flex justify-between items-center">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Enter your confirm password..."
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="outline-none w-full"
          />
          <div
            onClick={() => {
              setShowConfirmPassword(!showConfirmPassword);
            }}
          >
            {!showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
          </div>
        </div>
        <label className="flex gap-2 items-center mt-2">
          <input
            type="checkbox"
            value={isAgree}
            onChange={() => setIsAgree(!isAgree)}
          />
          <span className="text-sm">
            I agree to the{" "}
            <span
              onClick={openModalTc}
              className="text-blue-500 cursor-pointer"
            >
              terms and conditions
            </span>
          </span>
        </label>
        <button
          onClick={(e) => handleRegister(e)}
          className="bg-blue-400 w-1/2 self-center text-white dark:bg-blue-700 rounded-xl hover:bg-blue-500 p-2 my-4"
        >
          {loading ? (
            <span className="loading loading-dots loading-md"></span>
          ) : (
            "Register"
          )}
        </button>
      </form>
      <p className="text-center text-black">
        Already Have an Account?{" "}
        <span
          onClick={handleToLogin}
          className="cursor-pointer font-bold text-blue-400 dark:text-blue-700 hover:text-blue-500 dark:hover:text-blue-800"
        >
          login Here
        </span>
      </p>
      {showModalTc && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            className={`bg-white dark:bg-gray-800 rounded-lg p-6 w-11/12 max-w-lg relative transform transition-all duration-300 ${
              animateModal ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
          >
            <h2 className="text-xl font-bold mb-4 text-black dark:text-white">
              Terms & Conditions
            </h2>
            <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2 max-h-[300px] overflow-y-auto">
              <p>
                By registering, you agree to abide by the rules and regulations
                of our platform.
              </p>
              <p>
                Your data will be securely stored and not shared with third
                parties without consent.
              </p>
              <p>
                Please do not share your account credentials with anyone else.
              </p>
              <p>
                We reserve the right to update our terms at any time with proper
                notice.
              </p>
            </div>
            <button
              onClick={handleCloseModal}
              className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
