import React, { useContext, useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../Firebase/Firebase.config";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signIn, setLoading } = useContext(AuthContext);
  const googleProvider = new GoogleAuthProvider();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user && user.email) {
      navigate(from, { replace: true }); // Sending to the previous page
    }
  }, [user, navigate, from]);

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log(result)
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Google Login Successful",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate(from, { replace: true }); // Sending to the previous page
        });
      })
      .catch((error) => {
        Swal.fire("Google Login Failed", error.message, "error");
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      Swal.fire("Missing Input", "Please enter email and password.", "warning");
      return;
    }

    signIn(email, password)
      .then(() => {
        Swal.fire("Login Success", "", "success").then(() => {
          setLoading(false);
          navigate(from, { replace: true }); // Sending to the previous page
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Login Failed",
          text: error.message,
          icon: "error",
          confirmButtonText: "Go to Register",
        }).then(() => {
          navigate("/auth/register");
        });
      });
  };

  return (
    <div className="bg-base-100 min-h-screen">
      <div className="w-full max-w-md p-10 mx-auto flex items-center justify-center">
        <div className="card w-full max-w-sm shadow-2xl">
          <div className="card-body bg-base-100">
            <div className="text-center mb-4">
              <h2 className="text-3xl font-bold text-gray-800">
                Login to your Account
              </h2>
              <p className="text-gray-800">
                Don't have an account?
                <Link
                  to="/auth/register"
                  className="ml-1 text-blue-600 underline font-bold"
                >
                  Sign Up
                </Link>
                here
              </p>
            </div>

            <button
              onClick={handleGoogleSignIn}
              className="btn w-full bg-white text-black border border-gray-300 flex items-center gap-3 mb-2"
            >
              <FcGoogle size={25} /> Login with Google
            </button>

            <button className="btn w-full bg-white text-black border border-gray-300 flex items-center gap-3 mb-4">
              <FaGithub size={25} /> Login with GitHub
            </button>

            <form onSubmit={handleLogin}>
              <label className="label text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full"
                placeholder="Enter Email"
                required
              />
              <label className="label text-gray-600 mt-2">Password</label>
              <input
                type="password"
                name="password"
                className="input input-bordered w-full"
                placeholder="Enter Password"
                required
              />
              <div className="text-right mt-2">
                <a className="link link-hover text-gray-800">
                  Forgot password?
                </a>
              </div>
              <button type="submit" className="btn btn-primary mt-4 w-full">
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
