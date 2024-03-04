import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { authContext } from "../context/authcontext";

export default function Navbar() {
  const { auth } = useContext(authContext);
  return (
    <div className="w-full flex justify-center md:justify-end items-center gap-x-4  py-2  md:pe-32">
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
      {auth ? (
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("id");
            location.reload();
          }}
        >
          Log out
        </button>
      ) : (
        <>
          <Link to={"/register"}>Register</Link>
          <Link to={"/login"}>Login</Link>
        </>
      )}
    </div>
  );
}
