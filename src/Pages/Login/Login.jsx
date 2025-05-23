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
  const from = location.state?.from?.pathname || "/";

  const { user, signIn } = useContext(AuthContext);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    if (user && user.email) {
      navigate("/");
    }
  }, [user, navigate]);

  // Google signIn
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Google login:", result.user);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Google login error:", error);
      });
  };

  // Email/Password Login
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (!email || !password) {
      Swal.fire("Please enter both email and password.");
      return;
    }

    signIn(email, password)
      .then(() => {
        Swal.fire("Login success").then(() => {
          const from = location.state?.from?.pathname || "/";
          navigate(from, { replace: true });
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Login failed",
          text: error.message,
          icon: "error",
          confirmButtonText: "Go to Register",
        }).then(() => {
          navigate("/auth/register");
        });
      });
  };

  const handleSignUpClick = (e) => {
    e.preventDefault();
    if (!user || !user.email) {
      navigate("/auth/register");
    } else {
      navigate("/");
    }
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
                {!user || !user.email ? (
                  <>
                    Don't have an account? Please{" "}
                    <Link
                      to="/auth/register"
                      className="text-blue-500 underline font-bold cursor-pointer"
                      onClick={handleSignUpClick}
                    >
                      Sign Up
                    </Link>{" "}
                    here
                  </>
                ) : (
                  <>Welcome back!</>
                )}
              </p>
            </div>

            <button
              onClick={handleGoogleSignIn}
              className="btn lg:w-80 bg-white text-black border border-[#e5e5e5] flex items-center gap-3 mb-2"
            >
              <FcGoogle size={25} />
              Login with Google
            </button>
            <button className="btn lg:w-80 bg-white text-black border border-[#e5e5e5] flex items-center gap-3 mb-4">
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
                required
              />
              <label className="label text-gray-600">Password</label>
              <input
                type="password"
                className="input"
                name="password"
                placeholder="Enter your password"
                required
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
