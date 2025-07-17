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
    <div>
      <div>Register</div>
      <form className="flex flex-col">
        <label>Email</label>
        <input
          type="text"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>password</label>
        <input
          type="text"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>confirm password</label>
        <input
          type="text"
          placeholder="Enter your confirm password..."
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button onClick={(e) => handleRegister(e)}>Register</button>
      </form>
      <button onClick={handleToLogin}>Login</button>
    </div>
  );
}
