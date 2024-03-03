import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="w-full flex justify-start items-center gap-x-4  py-2 px-3 md:ps-32">
      <NavLink
        to={"/"}
        className={({ isActive, isPending }) =>
          isPending ? "text-gray-500" : isActive ? "text-blue-500" : ""
        }
      >
        Feed
      </NavLink>
      <NavLink
        to={"/add-post"}
        className={({ isActive, isPending }) =>
          isPending ? "text-gray-500" : isActive ? "text-blue-500" : ""
        }
      >
        Add Post
      </NavLink>
    </div>
  );
}
