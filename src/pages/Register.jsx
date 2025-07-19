import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
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
      // console.log(response);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      Swal.fire("Register successful");
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
      Swal.fire(error.message);
    }
  };

  const handleToLogin = () => {
    navigate("/auth/login");
  };
  return (
    <div className="w-1/4 bg-white border rounded-2xl p-4">
      <div className="text-2xl font-bold text-black text-center">Register</div>
      <form className="flex flex-col space-y-2">
        <label>Email</label>
        <input
          type="text"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
          className="border p-1 rounded-sm"
        />
        <label>password</label>
        <input
          type="text"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
          className="border p-1 rounded-sm"
        />
        <label>confirm password</label>
        <input
          type="text"
          placeholder="Enter your confirm password..."
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border p-1 rounded-sm"
        />
        <button
          onClick={(e) => handleRegister(e)}
          className="bg-blue-400 w-1/2 self-center text-white dark:bg-blue-700 rounded-xl hover:bg-blue-500 p-2 my-4"
        >
          Register
        </button>
      </form>
      <p className="text-center">
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
