import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      Swal.fire("Login successful");
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
      Swal.fire("invalid email or password");
    }
  };

  const handleRegister = () => {
    navigate("/auth/register");
  };

  return (
    <div className="w-7/8 lg:w-1/4 bg-white border rounded-2xl p-4">
      <div className="text-2xl font-bold text-black text-center">Login</div>
      <form className="flex flex-col space-y-2">
        <label>Email</label>
        <input
          type="text"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
          className="border p-1 rounded-sm"
        />
        <label>Password</label>
        <div className="flex items-center justify-between border p-1 rounded-sm ">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password..."
            onChange={(e) => setPassword(e.target.value)}
            className="w-full outline-none"
          />
          <div
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </div>
        </div>
        <button
          onClick={(e) => handleLogin(e)}
          className="bg-blue-400 w-1/2 self-center text-white dark:bg-blue-700 rounded-xl hover:bg-blue-500 p-2 my-4"
        >
          Login
        </button>
      </form>
      <p className="text-center">
        Don't have an Account{" "}
        <span
          onClick={handleRegister}
          className="cursor-pointer font-bold text-blue-400 dark:text-blue-700 hover:text-blue-500 dark:hover:text-blue-800"
        >
          Register Here
        </span>
      </p>
    </div>
  );
}
