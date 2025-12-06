import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = ({ setUser }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/users/register", formData);
      localStorage.setItem("token", res.data.token);
      setUser(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* LEFT */}
      <div className="hidden md:flex flex-col items-center justify-center bg-indigo-600 p-10 text-white">
        <h1 className="text-4xl font-bold mb-4">LiteHR Registration</h1>
        <p className="text-lg max-w-md text-center">
          Join LiteHR and start managing employees, attendance, and HR activities efficiently.
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-center bg-gray-50 p-8">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
            Create Your Account
          </h2>

          {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

          <form onSubmit={handleSubmit}>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Username
            </label>
            <input
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 outline-none"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              autoComplete="new-username"
              required
            />

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
              className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 outline-none"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition font-medium">
              Register
            </button>

            <p className="text-center text-gray-500 mt-4 text-sm">
              Already have an account?
              <Link to="/login" className="text-indigo-600 hover:underline ml-1">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
