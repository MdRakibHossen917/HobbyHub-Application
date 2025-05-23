import React, { useContext, useState, useEffect } from "react";
import { LuLogOut } from "react-icons/lu";
import { NavLink, useNavigate, useLocation } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";


// Navigation Links
const links = (
  <>
    <li>
      <NavLink to="/" className="flex items-center gap-0">
        <span>Home</span>
      </NavLink>
    </li>
    <li>
      <NavLink to="/createGroup" className="flex items-center gap-0">
        <img
          className="h-5 w-5"
          src="https://img.icons8.com/?size=80&id=95119&format=png"
          alt=""
        />
        Create Group
      </NavLink>
    </li>
    <li>
      <NavLink to="/myGroups" className="flex items-center gap-0">
        <img
          className="h-5 w-5"
          src="https://img.icons8.com/?size=80&id=97614&format=png"
          alt=""
        />
        My Groups
      </NavLink>
    </li>
    <li>
      <NavLink to="/allGroups" className="flex items-center gap-0">
        <img
          className="h-5 w-5"
          src="https://img.icons8.com/?size=50&id=9542&format=png"
          alt=""
        />
        All Groups
      </NavLink>
    </li>
  </>
);

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Dark Mode
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);
//darkmode
  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire("Sign-out Successful");
        navigate("/auth/login");
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <NavLink to="/" className="btn btn-ghost text-xl">
          <img
            className="w-28"
            src="https://i.ibb.co/DDbQG6K2/logo-transparent.png"
            alt="HobbyHub Logo"
          />
        </NavLink>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end gap-3">
        {/*  Theme Toggle */}
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            onChange={() => setIsDarkMode(!isDarkMode)}
            checked={isDarkMode}
          />
          {/* Sun icon */}
          <svg
            className="swap-on w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414M17.95 17.95l-1.414-1.414M6.05 6.05L4.636 7.464"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="12"
              cy="12"
              r="5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {/* Moon icon */}
          <svg
            className="swap-off w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              d="M21 12.79A9 9 0 0112.21 3a7 7 0 000 14 9 9 0 008.79-4.21z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </label>

        {/* ✅ User */}
        {user ? (
          <>
            <img
              src={user.photoURL || "https://i.ibb.co/zfHd2GV/user.png"}
              alt="User"
              data-tooltip-id="user-tooltip"
              data-tooltip-content={user.displayName || "User"}
              className="w-10 h-10 rounded-full cursor-pointer border border-gray-400"
            />
            <Tooltip id="user-tooltip" place="right" />
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
