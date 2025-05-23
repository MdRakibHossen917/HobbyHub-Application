import React, { useContext, useState, useEffect } from "react";
import { LuLogOut } from "react-icons/lu";
import { NavLink, useNavigate, useLocation } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const links = (
  <>
    <li>
      <NavLink to="/" className="flex items-center gap-1">
        Home
      </NavLink>
    </li>
    <li>
      <NavLink to="/createGroup" className="flex items-center gap-1">
        <img
          className="h-5 w-5"
          src="https://img.icons8.com/?size=80&id=95119&format=png"
          alt="create"
        />
        Create Group
      </NavLink>
    </li>
    <li>
      <NavLink to="/myGroups" className="flex items-center gap-1">
        <img
          className="h-5 w-5"
          src="https://img.icons8.com/?size=80&id=97614&format=png"
          alt="my"
        />
        My Groups
      </NavLink>
    </li>
    <li>
      <NavLink to="/allGroups" className="flex items-center gap-1">
        <img
          className="h-5 w-5"
          src="https://img.icons8.com/?size=50&id=9542&format=png"
          alt="all"
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

  // Theme toggle
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

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire("Signed out successfully");
        navigate("/auth/login");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="navbar bg-base-300 shadow-sm">
      {/* Navbar Start */}
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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
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

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end gap-3">
        {/* Theme Toggle */}
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            onChange={() => setIsDarkMode(!isDarkMode)}
            checked={isDarkMode}
          />
          {/* Light icon */}
          <svg
            className="swap-on w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414M17.95 17.95l-1.414-1.414M6.05 6.05L4.636 7.464"
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
          {/* Dark icon */}
          <svg
            className="swap-off w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14A8,8,0,0,1,12,4a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,11,1a10,10,0,1,0,10.05,12A1,1,0,0,0,21.64,13Z" />
          </svg>
        </label>

        {/* User Info or Login/Register */}
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
              <LuLogOut /> Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/auth/login"
              className="hover:bg-gray-200 text-gray-700 px-4 py-2 rounded"
            >
              Login
            </NavLink>
            {pathname !== "/auth/login" && (
              <NavLink
                to="/auth/register"
                className="hover:bg-gray-200 text-gray-700 px-4 py-2 rounded"
              >
                Sign Up
              </NavLink>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
