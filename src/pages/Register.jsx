import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password !== confirmPassword) {
      Swal.fire("Passwords do not match");
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
      setLoading(false);
      console.log(error);
      Swal.fire(error.message);
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
    </div>
  );
}
