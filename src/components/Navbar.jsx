import React from "react";
import { FaCartShopping, FaUser } from "react-icons/fa6";

export default function Navbar() {
  return (
    <div className="flex justify-between">
      <div className="flex">
        <img src="" alt="" />
        <h1>Gadget Store</h1>
      </div>
      <div className="flex gap-4">
        <FaCartShopping />
        <FaUser />
      </div>
    </div>
  );
}
