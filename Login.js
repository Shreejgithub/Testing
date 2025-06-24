import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";
import { toast } from "react-toastify";
// import { fetchEntitlements } from "../common/service"; // Import the fetchEntitlements function

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in both email and password fields", {
        position: "top-center",
      });
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully");

      // Fetch entitlements and store them in local storage
      // try {
      //   const entitlementsData = await fetchEntitlements();
      //   localStorage.setItem("entitlements", JSON.stringify(entitlementsData));
      //   console.log("Entitlements data stored in local storage.");
      // } catch (entitlementError) {
      //   console.error("Error fetching entitlements: ", entitlementError);
      //   toast.error("Failed to fetch entitlements. Please try again.", {
      //     position: "top-center",
      //   });
      // }

      // Redirect to the contents page
      window.location.href = "/contents";
    } catch (error) {
      console.log(error.message);
      toast.error("Incorrect email or password. Please try again.", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg" style={{ width: '400px' }}>
        <div className="card-body">
          <div className="text-center mb-4">
            <img
              src="https://avatars.githubusercontent.com/u/134041854?v=4"
              alt="Logo"
              style={{ width: "50px", height: "50px" }}
            />
            <h2 className="mt-2"><b>BIOMIK</b></h2>
          </div>
          <h3 className="text-center mb-3">Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary btn-block">Login</button>
            </div>
            <div className="text-center mt-3">
              <p className="mb-1"><a href="#">I forgot my password</a></p>
              <p className="mb-0">New user? <a href="/register">Sign Up Here</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
