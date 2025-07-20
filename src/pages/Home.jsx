import React, { useContext } from "react";

import { AuthContext } from "../contexts/AuthContext";

export default function Home() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;
  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white transition-all duration-300">
      <div>Home Page</div>
      <h1>hello {user?.email}</h1>
    </div>
  );
}
