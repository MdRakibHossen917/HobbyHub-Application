import React, { useContext } from "react";
import { LuLogOut } from "react-icons/lu";
import { NavLink, useNavigate, useLocation } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const links = (
  <>
    <li>
      <NavLink to="/" className="flex items-center gap-0">
        <span>Home</span>
      </NavLink>
    </li>
    <li>
      <NavLink to="/createGroup" className="flex items-center gap-0">
        <span>
          <img
            className="h-5 w-5"
            src="https://img.icons8.com/?size=80&id=95119&format=png"
            alt=""
          />
        </span>
        Create Group
      </NavLink>
    </li>
    <li>
      <NavLink to="/myGroups" className="flex items-center gap-0">
        <span>
          <img
            className="h-5 w-5"
            src="https://img.icons8.com/?size=80&id=97614&format=png"
            alt=""
          />
        </span>
        My Groups
      </NavLink>
    </li>
    <li>
      <NavLink to="/allGroups" className="flex items-center gap-0">
        <span>
          <img
            className="h-5 w-5"
            src="https://img.icons8.com/?size=50&id=9542&format=png"
            alt=""
          />
        </span>
        All Groups
      </NavLink>
    </li>
  </>
);

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire("Sign-out Successful");
        navigate("/auth/signIn");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">
          <img
            className="w-25"
            src="https://i.ibb.co/DDbQG6K2/logo-transparent.png"
            alt=""
          />
        </a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end gap-3">
        {/* Theme Toggle */}
        <label className="toggle text-base-content">
          <input
            type="checkbox"
            value="synthwave"
            className="theme-controller"
          />
          <svg
            aria-label="sun"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="m4.93 4.93 1.41 1.41"></path>
              <path d="m17.66 17.66 1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="m6.34 17.66-1.41 1.41"></path>
              <path d="m19.07 4.93-1.41 1.41"></path>
            </g>
          </svg>
          <svg
            aria-label="moon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </g>
          </svg>
        </label>

        {/* If user logged in */}
        {user ? (
          <>
            {/* ✅ Profile Picture with Tooltip */}
            <div>
              <img
                src={user.photoURL || "https://i.ibb.co/zfHd2GV/user.png"}
                alt="user"
                data-tooltip-id="user-tooltip"
                data-tooltip-content={user.displayName || "User"}
                className="w-10 h-10 rounded-full cursor-pointer border border-gray-400"
              />
              <Tooltip id="user-tooltip" place="right" />
            </div>

            <button
              onClick={handleLogout}
              className="btn btn-sm btn-primary flex items-center gap-1"
            >
              <LuLogOut />
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/auth/login"
              className="hover:bg-gray-200 text-gray-700 px-4 py-2 rounded"
            >
              LogIn
            </NavLink>

            {/* ✅ Show SignUp button only if not on login page */}
            {pathname !== "/auth/login" && (
              <NavLink
                to="/auth/register"
                className="hover:bg-gray-200 text-gray-700 px-4 py-2 rounded"
              >
                SignUp
              </NavLink>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
