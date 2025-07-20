import React, { useContext } from "react";

import { AuthContext } from "../contexts/AuthContext";

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className=" bg-white dark:bg-gray-800 text-black dark:text-white transition-all duration-300">
      <div className="flex flex-col items-center justify-center h-96 ">
        <div>Home Page</div>
        <p>hello {user?.email}</p>
        <h1 className="animate-pulse text-7xl my-4">Under Development</h1>
      </div>
    </div>
  );
}
