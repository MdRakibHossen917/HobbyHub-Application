import React, { useContext } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext); // using context method
  //
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // Step 1: Check first
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    // Step 2: Try login
    signIn(email, password)
      // Step 3: Successfully resolve than go to .then
      .then((result) => {
        const user = result.user;
        console.log("Logged in user:", user);
        // alert("User login successfully!");
         Swal.fire("LOGIN success");
        navigate("/");
      })
      .catch((error) => {
        console.log("Login error:", error.message);
      });
  };

  return (
    <div className="bg-base-100 min-h-screen">
      <div className="w-full max-w-md p-10 mx-auto flex items-center justify-center">
        <div className="card w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body bg-base-100">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800">
                Login to your Account
              </h2>
              <p className="text-gray-800">
                Don't have account? Please{" "}
                <Link
                  className="text-blue-500 underline font-bold"
                  to="/auth/register"
                >
                  Sign Up
                </Link>{" "}
                here
              </p>
            </div>

            <button className="btn lg:w-80 bg-white text-black border border-[#e5e5e5] flex items-center gap-3">
              <FcGoogle size={25} />
              Login with Google
            </button>
            <button className="btn lg:w-80 bg-white text-black border border-[#e5e5e5] flex items-center gap-3">
              <FaGithub size={25} />
              Login with GitHub
            </button>

            <form onSubmit={handleLogin} className="fieldset">
              <label className="label text-gray-600">Email</label>
              <input
                type="email"
                className="input"
                name="email"
                placeholder="Enter Email"
              />
              <label className="label text-gray-600">Password</label>
              <input
                type="password"
                className="input"
                name="password"
                placeholder="Enter your password"
              />
              <div>
                <a className="link link-hover text-gray-800">
                  Forgot password?
                </a>
              </div>

              <button type="submit" className="btn btn-primary mt-2">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
