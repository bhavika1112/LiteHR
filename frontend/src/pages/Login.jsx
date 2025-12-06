import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");

    try {
      const res = await axios.post("/api/users/login", formData);
      localStorage.setItem("token", res.data.token);
      setUser(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    setInfo("");

    if (!formData.email) {
      setError("Please enter your email to reset your password.");
      return;
    }

    try {
      const res = await axios.post("/api/users/forgot-password", {
        email: formData.email,
      });

      setInfo("Reset link sent to your email.");
    } catch (err) {
      setError(err.response?.data?.message || "Error sending reset link.");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* LEFT SIDE PANEL */}
      <div className="hidden md:flex flex-col items-center justify-center bg-indigo-600 p-10 text-white">
        <h1 className="text-4xl font-bold mb-4">LiteHR</h1>
        <p className="text-lg max-w-md text-center">
          A simplified HR & Attendance Management System to manage workforce efficiently.
        </p>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="flex items-center justify-center bg-gray-50 p-8">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
            Login to Your Account
          </h2>

          {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
          {info && <p className="text-green-600 mb-4 text-sm">{info}</p>}

          <form onSubmit={handleSubmit}>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Email
            </label>
            <input
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 outline-none"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="email"
              required
            />

            <label className="block text-gray-600 text-sm font-medium mb-1">
              Password
            </label>
            <input
              className="w-full p-3 mb-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 outline-none"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />

            {/* ⭐ Forgot Password Link */}
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-indigo-600 text-sm hover:underline mb-6"
            >
              Forgot Password?
            </button>

            <button className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition font-medium">
              Login
            </button>

            <p className="text-center text-gray-500 mt-4 text-sm">
              Don’t have an account?
              <Link to="/register" className="text-indigo-600 hover:underline ml-1">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
