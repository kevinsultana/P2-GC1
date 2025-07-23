import React, { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa6";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoadingBtn(true);

    if (!email) {
      Swal.fire("Please enter your email");
      setLoadingBtn(false);
      return;
    }

    if (!password) {
      Swal.fire("Please enter your password");
      setLoadingBtn(false);
      return;
    }

    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      Swal.fire("Login successful");
      navigate("/", { replace: true });
      setLoadingBtn(false);
    } catch (error) {
      setLoadingBtn(false);
      console.log(error);
      Swal.fire("Invalid Email or Password");
    }
  };

  const handleRegister = () => {
    navigate("/auth/register");
  };

  const handleGoogleSignIn = async () => {
    try {
      const oauthLogin = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(oauthLogin);
      const token = credential.accessToken;
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
      Swal.fire("Error Signing in with Google");
    }
  };

  return (
    <div className="w-7/8 lg:w-1/4 bg-white border rounded-2xl p-4 shadow-2xl dark:shadow-white/50">
      <div className="text-2xl font-bold text-black text-center">Login</div>
      <form className="flex flex-col space-y-2">
        <label className="text-black ">Email</label>
        <input
          type="text"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
          className="border p-1 rounded-sm text-black outline-none"
        />
        <label className="text-black">Password</label>
        <div className="flex items-center justify-between border p-1 border-black rounded-sm">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password..."
            onChange={(e) => setPassword(e.target.value)}
            className="w-full outline-none text-black "
          />
          <div
            onClick={() => {
              setShowPassword(!showPassword);
            }}
            className="text-black cursor-pointer"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </div>
        </div>
        <button
          onClick={(e) => handleLogin(e)}
          className="bg-blue-400 w-1/2 self-center text-white dark:bg-blue-700 rounded-xl hover:bg-blue-500 p-2 mt-2"
        >
          {loadingBtn ? (
            <span className="loading loading-dots loading-md"></span>
          ) : (
            "Login"
          )}
        </button>
      </form>
      <div className="w-full justify-center flex">
        <button
          onClick={handleGoogleSignIn}
          className="w-3/4 flex items-center justify-center gap-4 text-white bg-red-600 rounded-xl hover:bg-red-700 p-2 my-2 transition-all duration-300"
        >
          <FaGoogle />
          <p>Login with Google</p>
        </button>
      </div>
      <p className="text-center text-black">
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
