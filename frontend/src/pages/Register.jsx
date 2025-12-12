import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from "../config/googleOAuth";
import { 
  HiUser, 
  HiEnvelope, 
  HiLockClosed, 
  HiEye, 
  HiEyeSlash, 
  HiBuildingOffice2 
} from "react-icons/hi2";

const Register = ({ setUser }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    companyName: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const nextStep = () => {
    if (!formData.username || !formData.email) {
      setError("Please fill in all required fields");
      return;
    }
    setStep(2);
    setError("");
  };

  const prevStep = () => {
    setStep(1);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.password) {
      setError("Password is required");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      const res = await axios.post("/api/users/register", formData);
      localStorage.setItem("token", res.data.token);
      setUser(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
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
      setError("Google registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError("Google registration failed. Please try again.");
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="min-h-screen bg-slate-100">
        
        {/* BACKGROUND DECORATION */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        {/* TWO COLUMN LAYOUT */}
        <div className="flex min-h-screen">
          
          {/* LEFT PANEL - DESCRIPTION & BENEFITS */}
          <div className="hidden lg:flex lg:w-1/2 flex-col justify-center p-12 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
            <div className="max-w-md mx-auto">
              {/* BRANDING */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                    <HiBuildingOffice2 className="w-6 h-6" />
                  </div>
                  <h1 className="text-3xl font-bold">LiteHR</h1>
                </div>
                <h2 className="text-4xl font-bold mb-6 leading-tight">
                  Join Our <span className="text-blue-400">HR Platform</span>
                </h2>
                <p className="text-slate-300 text-lg mb-8">
                  Streamline your HR processes and manage your team efficiently with our comprehensive solution.
                </p>
              </div>

              {/* BENEFITS */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-400 text-lg">⚡</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Quick Setup</h4>
                    <p className="text-slate-300 text-sm">Get started in minutes with easy onboarding</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-green-400 text-lg">🔒</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Secure & Compliant</h4>
                    <p className="text-slate-300 text-sm">Enterprise-grade security & data protection</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-slate-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-slate-300 text-lg">📈</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Advanced Analytics</h4>
                    <p className="text-slate-300 text-sm">Insights to optimize your workforce</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL - REGISTRATION FORM */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-200 animate-fadeIn">
              
              {/* FORM HEADER */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-3">Create Account</h2>
                <p className="text-slate-600">Join thousands of HR professionals</p>
              </div>

              {/* PROGRESS STEPS */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 1 ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
                    1
                  </div>
                  <span className={`text-sm font-medium ${step === 1 ? 'text-blue-500' : 'text-slate-600'}`}>
                    Basic Info
                  </span>
                </div>
                <div className="flex-1 h-px bg-slate-300 mx-4"></div>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 2 ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
                    2
                  </div>
                  <span className={`text-sm font-medium ${step === 2 ? 'text-blue-500' : 'text-slate-600'}`}>
                    Security
                  </span>
                </div>
              </div>

              {/* GOOGLE REGISTER */}
              <div className="mb-6">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  shape="rectangular"
                  theme="filled_blue"
                  text="signup_with"
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
                  <span className="px-4 bg-white text-slate-500">Or register with email</span>
                </div>
              </div>

              {/* ERROR DISPLAY */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {/* REGISTRATION FORM */}
              <form onSubmit={handleSubmit}>
                {step === 1 ? (
                  <div className="space-y-6">
                    {/* USERNAME */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Username *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <HiUser className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                          type="text"
                          name="username"
                          required
                          autoComplete="username"
                          value={formData.username}
                          onChange={handleChange}
                          className="w-full pl-10 p-4 border border-slate-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
                          placeholder="Enter username"
                        />
                      </div>
                    </div>

                    {/* EMAIL */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Work Email *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <HiEnvelope className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-10 p-4 border border-slate-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
                          placeholder="you@company.com"
                        />
                      </div>
                    </div>

                    {/* COMPANY NAME (OPTIONAL) */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Company Name (Optional)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <HiBuildingOffice2 className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          className="w-full pl-10 p-4 border border-slate-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
                          placeholder="Your company name"
                        />
                      </div>
                    </div>

                    {/* NEXT BUTTON */}
                    <button
                      type="button"
                      onClick={nextStep}
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold"
                    >
                      Continue to Security
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* PASSWORD */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Password *
                      </label>
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
                          placeholder="Create a strong password"
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
                      <p className="text-xs text-slate-500 mt-2">
                        Use at least 8 characters with a mix of letters, numbers & symbols
                      </p>
                    </div>

                    {/* PASSWORD STRENGTH */}
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <h4 className="text-sm font-semibold text-slate-700 mb-2">Password Strength</h4>
                      <div className="flex gap-1 mb-2">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className={`h-2 flex-1 rounded-full ${
                              formData.password.length > i * 2
                                ? formData.password.length > 6
                                  ? 'bg-green-500'
                                  : formData.password.length > 4
                                  ? 'bg-yellow-500'
                                  : 'bg-red-500'
                                : 'bg-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-slate-600">
                        {formData.password.length === 0
                          ? 'Enter a password'
                          : formData.password.length < 4
                          ? 'Too weak'
                          : formData.password.length < 6
                          ? 'Could be stronger'
                          : 'Strong password'}
                      </p>
                    </div>

                    {/* BUTTONS */}
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="flex-1 p-4 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-medium"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                      </button>
                    </div>
                  </div>
                )}

                {/* LOGIN LINK */}
                <div className="text-center mt-8 pt-6 border-t border-slate-200">
                  <p className="text-slate-600">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-blue-500 hover:text-blue-600 font-semibold transition-colors"
                    >
                      Sign In
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
        `}</style>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Register;