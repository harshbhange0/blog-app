import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../context/authcontext";
import { userContext } from "../context/userContext";
import { removeFromLocalStorage } from "../utils/localstorage";

export default function Navbar() {
  const navigate = useNavigate();
  const { auth } = useContext(authContext);
  const { user } = useContext(userContext);

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex w-full justify-center gap-3">
          <span className="me-auto ms-4 font-serif text-2xl font-semibold">
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
                  className="avatar btn btn-circle btn-ghost"
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
                  className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
                >
                  {auth && user ? (
                    <>
                      <li>
                        <span>{user && user.name}</span>
                      </li>
                      <li>
                        <span>{user && user.email}</span>
                      </li>
                      <li>
                        <Link to={"/my-post"}>My Posts</Link>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            removeFromLocalStorage("authorization");
                            removeFromLocalStorage("id");
                            navigate("/");
                            location.reload();
                          }}
                        >
                          Log out
                        </button>
                      </li>
                    </>
                  ) : (
                    ""
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
