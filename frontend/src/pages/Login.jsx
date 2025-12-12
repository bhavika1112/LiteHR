import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from "../config/googleOAuth";
import { FcGoogle } from "react-icons/fc";
import { 
  HiEnvelope, 
  HiLockClosed, 
  HiEye, 
  HiEyeSlash 
} from "react-icons/hi2";

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setIsLoading(true);

    try {
      const res = await axios.post("/api/users/login", formData);
      localStorage.setItem("token", res.data.token);
      setUser(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/users/google-auth", {
        token: credentialResponse.credential
      });
      localStorage.setItem("token", res.data.token);
      setUser(res.data);
      navigate("/");
    } catch (err) {
      setError("Google login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError("Google login failed. Please try again.");
  };

  const handleForgotPassword = async () => {
    setError("");
    setInfo("");

    if (!formData.email) {
      setError("Please enter your email to reset your password.");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post("/api/users/forgot-password", {
        email: formData.email,
      });
      setInfo(`Password reset link sent to ${formData.email}. Check your inbox.`);
    } catch (err) {
      setError(err.response?.data?.message || "Error sending reset link.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="min-h-screen bg-slate-100">
        
        {/* BACKGROUND ELEMENTS */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-slate-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        {/* TWO COLUMN LAYOUT */}
        <div className="flex min-h-screen">
          
          {/* LEFT PANEL - DESCRIPTION & FEATURES */}
          <div className="hidden lg:flex lg:w-1/2 flex-col justify-center p-12 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
            <div className="max-w-md mx-auto">
              {/* BRANDING */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <span className="text-2xl font-bold">HR</span>
                </div>
                <h1 className="text-3xl font-bold">LiteHR</h1>
              </div>
              
              {/* WELCOME MESSAGE */}
              <h2 className="text-4xl font-bold mb-6 leading-tight">
                Welcome Back to <span className="text-blue-400">LiteHR</span>
              </h2>
              
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                Streamline your HR processes with our intuitive platform. Manage attendance, leaves, and employee data effortlessly.
              </p>

              {/* FEATURES LIST */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-green-400">✓</span>
                  </div>
                  <span className="text-slate-300">Real-time Attendance Tracking</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-blue-400">✓</span>
                  </div>
                  <span className="text-slate-300">Leave Management System</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-slate-300">✓</span>
                  </div>
                  <span className="text-slate-300">Secure & Encrypted Data</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL - LOGIN FORM */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-200 animate-fadeIn">
              
              {/* FORM HEADER */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-3">Sign In</h2>
                <p className="text-slate-600">Enter your credentials to access your dashboard</p>
              </div>

              {/* GOOGLE LOGIN */}
              <div className="mb-6">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  shape="rectangular"
                  theme="filled_blue"
                  text="continue_with"
                  size="large"
                  width="100%"
                />
              </div>

              {/* DIVIDER */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-slate-500">Or continue with email</span>
                </div>
              </div>

              {/* ALERTS */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}
              
              {info && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <p className="text-green-600 text-sm">{info}</p>
                </div>
              )}

              {/* LOGIN FORM */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* EMAIL INPUT */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <HiEnvelope className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 p-4 border border-slate-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                {/* PASSWORD INPUT */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-slate-700">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-sm text-blue-500 hover:text-blue-600 font-medium transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <HiLockClosed className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 p-4 border border-slate-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <HiEyeSlash className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                      ) : (
                        <HiEye className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                      )}
                    </button>
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing In...</span>
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </button>

                {/* REGISTER LINK */}
                <div className="text-center pt-4">
                  <p className="text-slate-600">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="text-blue-500 hover:text-blue-600 font-semibold transition-colors"
                    >
                      Create Account
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* ANIMATIONS */}
        <style>{`
          .animate-fadeIn {
            animation: fadeIn 0.6s ease-out;
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes blob {
            0% {
              transform: translate(0px, 0px) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
            100% {
              transform: translate(0px, 0px) scale(1);
            }
          }
          
          .animate-blob {
            animation: blob 7s infinite;
          }
          
          .animation-delay-2000 {
            animation-delay: 2s;
          }
        `}</style>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;