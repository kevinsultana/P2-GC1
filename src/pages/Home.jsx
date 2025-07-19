import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const stateUser = async () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        navigate("/auth/login", { replace: true });
      }
    });
  };

  useEffect(() => {
    stateUser();
  }, []);

  const handleLogOut = () => {
    auth.signOut().then(() => {
      navigate("/auth/login", { replace: true });
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white transition-all duration-300">
      <div>Home Page</div>
      <h1>hello {user.email ? user.email : "user"}</h1>
      <button onClick={handleLogOut}>LogOut</button>
    </div>
  );
}
