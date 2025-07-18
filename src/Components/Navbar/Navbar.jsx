import React, { useContext, useState, useEffect } from "react";
import { LuLogOut } from "react-icons/lu";
import { NavLink, useNavigate, useLocation } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

// Navigation links stored separately for easy reuse
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

  // Theme state (initially from localStorage or default "light")
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Set theme to localStorage and update html attribute
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  // Theme toggle handler
  const handleToggle = (e) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  // Logout handler
  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "You have successfully logged out",
          showConfirmButton: false,
          timer: 1500,
        });
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
        {/* Mobile dropdown menu */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            {/* Hamburger icon */}
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
        {/* Website Logo */}
        <NavLink to="/" className="btn btn-ghost text-xl">
          <img
            className="w-28"
            src="https://i.ibb.co/DDbQG6K2/logo-transparent.png"
            alt="HobbyHub Logo"
          />
        </NavLink>
      </div>

      {/* Navbar Center (visible only in large screen) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* Navbar End (right side) */}
      <div className="navbar-end gap-3">
        {/* Theme Toggle Switch */}
        <label className="swap swap-rotate cursor-pointer">
          <input
            type="checkbox"
            onChange={handleToggle}
            checked={theme === "dark"}
          />
          {/* Sun icon for light mode */}
          <svg
            className="swap-off h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>
          {/* Moon icon for dark mode */}
          <svg
            className="swap-on h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>

        {/* User info or login/register links */}
        {user ? (
          <>
            <img
              src={user.photoURL || "https://i.ibb.co/zfHd2GV/user.png"}
              alt="User"
              data-tooltip-id="user-tooltip"
              className="w-10 h-10 rounded-full border border-gray-300"
            />
            <Tooltip
              id="user-tooltip"
              content={user.displayName || "Anonymous"}
            />
            <button onClick={handleLogout} className="btn btn-error btn-sm btn-outline">
              <LuLogOut className="text-xl" />
            </button>
          </>
        ) : (
          <>
            {pathname !== "/auth/register" && (
              <NavLink to="/auth/register" className="btn btn-outline btn-sm">
                Sign Up
              </NavLink>
            )}
            {pathname !== "/auth/login" && (
              <NavLink to="/auth/login" className="btn btn-outline btn-sm">
                Login
              </NavLink>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
