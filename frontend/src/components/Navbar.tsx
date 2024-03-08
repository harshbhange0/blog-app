import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { authContext } from "../context/authcontext";
import { userContext } from "../context/userContext";

export default function Navbar() {
  const { auth } = useContext(authContext);
  const { user } = useContext(userContext);

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex justify-center w-full gap-3">
          <span className="text-2xl ms-4 font-semibold font-serif me-auto">
            Blogs
          </span>
          <NavLink
            to={"/"}
            className={({ isActive, isPending }) =>
              isPending ? "text-gray-500" : isActive ? "text-blue-500" : ""
            }
          >
            Feed
          </NavLink>
          {auth ? (
            <>
              <NavLink
                to={"/add-post"}
                className={({ isActive, isPending }) =>
                  isPending ? "text-gray-500" : isActive ? "text-blue-500" : ""
                }
              >
                Add Post
              </NavLink>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >
                  {auth ? (
                    <>
                      <li>
                        <span>{user && user.name}</span>
                      </li>
                      <li>
                        <span>{user && user.email}</span>
                      </li>
                      <li>
                        <Link to={"/my-post"}>
                          Your Posts: {user && user.posts.length}
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("id");
                            location.reload();
                          }}
                        >
                          Log out
                        </button>
                      </li>
                    </>
                  ) : (
                    <></>
                  )}
                </ul>
              </div>
            </>
          ) : (
            <>
              <NavLink
                to={"/register"}
                className={({ isActive, isPending }) =>
                  isPending ? "text-gray-500" : isActive ? "text-blue-500" : ""
                }
              >
                Register
              </NavLink>
              <NavLink
                to={"/login"}
                className={({ isActive, isPending }) =>
                  isPending ? "text-gray-500" : isActive ? "text-blue-500" : ""
                }
              >
                Login
              </NavLink>
            </>
          )}
        </div>
      </div>
    </>
  );
}
