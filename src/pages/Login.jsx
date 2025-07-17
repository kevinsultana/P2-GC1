import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // console.log(email, password);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      // console.log(response);
      setEmail("");
      setPassword("");
      Swal.fire("Login successful");
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = () => {
    navigate("/auth/register");
  };

  return (
    <div>
      <div>Login</div>
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
        <button onClick={(e) => handleLogin(e)}>Login</button>
      </form>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
