import React, { useContext } from "react";
import { Link, useNavigate } from "react-router";  
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();
  const { createUser } = useContext(AuthContext); // using context method

  const handlerRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    // Validation
    if (!name || !email || !password) {
      alert("Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      alert("Password must contain at least one uppercase letter.");
      return;
    }

    if (!/[0-9]/.test(password)) {
      alert("Password must contain at least one number.");
      return;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      alert("Password must contain at least one special character.");
      return;
    }

    // Firebase signup via context
    createUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name,
          photoURL: photoURL,
        })
          .then(() => {
            // alert("User registered successfully!");
            Swal.fire("register success");
            navigate("/auth/login");
          })
          .catch((error) => {
            console.log("Profile update error:", error.message);
          });
      })
      .catch((error) => {
        console.log("Signup error:", error.message);
        alert(error.message);
      });
  };

  return (
    <div className="bg-base-100 min-h-screen">
      <div className="w-full max-w-md p-10 mx-auto flex items-center justify-center">
        <div className="card w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body bg-base-100">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800">
                Create a new account
              </h2>
              <p className="text-sm text-center text-gray-600">
                Already have an account?
                <Link
                  to="/auth/login"
                  className="ml-1 text-blue-600 underline font-bold"
                >
                  Log In
                </Link>{" "}
                here
              </p>
            </div>

            <form onSubmit={handlerRegister} className="space-y-2">
              <div>
                <label htmlFor="name" className="block text-sm">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-3 py-2 border rounded-md border-[#e5e5e5]"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 border rounded-md border-[#e5e5e5]"
                  placeholder="example@gmail.com"
                />
              </div>
              <div>
                <label htmlFor="photoURL" className="block text-sm">
                  Photo URL
                </label>
                <input
                  type="text"
                  name="photoURL"
                  className="w-full px-3 py-2 border rounded-md border-[#e5e5e5]"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  className="w-full px-3 py-2 border rounded-md border-[#e5e5e5]"
                  placeholder="Password"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  className="w-full px-3 py-2 border rounded-md border-[#e5e5e5]"
                  placeholder="Confirm Password"
                />
              </div>

              <button
                type="submit"
                className="w-full btn px-8 py-3 btn-primary font-semibold"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
