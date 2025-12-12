import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  HiHome, 
  HiUser, 
  HiCog, 
  HiChartBar, 
  HiCalendar, 
  HiLogout,
  HiChevronDown,
  HiMenu,
  HiX,
  HiOfficeBuilding
} from "react-icons/hi";
import { MdDashboard } from "react-icons/md";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  // Navigation items for authenticated users
  const navItems = [
    { name: "Dashboard", path: "/", icon: <MdDashboard className="w-5 h-5" /> },
    { name: "Attendance", path: "/attendance", icon: <HiCalendar className="w-5 h-5" /> },
    { name: "Employees", path: "/employees", icon: <HiUser className="w-5 h-5" /> },
    { name: "Analytics", path: "/analytics", icon: <HiChartBar className="w-5 h-5" /> },
    { name: "Settings", path: "/settings", icon: <HiCog className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200' 
          : 'bg-white border-b border-slate-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* LEFT SIDE - LOGO & NAV LINKS */}
            <div className="flex items-center">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <HiOfficeBuilding className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-900 bg-clip-text text-transparent">
                    LiteHR
                  </h1>
                  <p className="text-xs text-slate-500 -mt-1">Human Resources</p>
                </div>
              </Link>

              {/* Desktop Navigation Links - Only show when logged in */}
              {user && (
                <div className="hidden md:flex items-center ml-10 space-x-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                        location.pathname === item.path
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      {item.icon}
                      <span className="ml-2">{item.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT SIDE - USER PROFILE / AUTH LINKS */}
            <div className="flex items-center space-x-4">
              
              {/* Desktop View */}
              {user ? (
                <>
                  {/* Notifications (Optional) */}
                  <button className="hidden md:block p-2 rounded-full hover:bg-slate-100 transition-colors relative">
                    <div className="w-2 h-2 bg-red-500 rounded-full absolute top-2 right-2"></div>
                    <span className="text-slate-600">🔔</span>
                  </button>

                  {/* User Profile Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center space-x-3 p-2 rounded-xl hover:bg-slate-50 transition-all duration-200 group"
                    >
                      <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                        {user.username?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div className="hidden md:block text-left">
                        <p className="font-medium text-slate-800 text-sm">
                          {user.username || 'User'}
                        </p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                      <HiChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                        isDropdownOpen ? 'rotate-180' : ''
                      }`} />
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 animate-fadeIn">
                        <div className="px-4 py-3 border-b border-slate-100">
                          <p className="font-medium text-slate-800">{user.username}</p>
                          <p className="text-sm text-slate-500 truncate">{user.email}</p>
                        </div>
                        
                        <div className="py-1">
                          <Link
                            to="/profile"
                            className="flex items-center px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <HiUser className="w-5 h-5 mr-3 text-slate-400" />
                            My Profile
                          </Link>
                          <Link
                            to="/settings"
                            className="flex items-center px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <HiCog className="w-5 h-5 mr-3 text-slate-400" />
                            Settings
                          </Link>
                          <div className="border-t border-slate-100 my-1"></div>
                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <HiLogout className="w-5 h-5 mr-3" />
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                /* Login/Register Buttons */
                <div className="hidden md:flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="px-5 py-2.5 text-slate-700 hover:text-slate-900 font-medium rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                  >
                    Get Started
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <HiX className="w-6 h-6 text-slate-700" />
                ) : (
                  <HiMenu className="w-6 h-6 text-slate-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 shadow-lg animate-slideDown">
            <div className="px-4 py-3 space-y-1">
              {/* Mobile Navigation Links */}
              {user ? (
                <>
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                        location.pathname === item.path
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.icon}
                      <span className="ml-3">{item.name}</span>
                    </Link>
                  ))}
                  
                  {/* User Info in Mobile */}
                  <div className="px-4 py-3 border-t border-slate-100">
                    <p className="font-medium text-slate-800">{user.username}</p>
                    <p className="text-sm text-slate-500">{user.email}</p>
                  </div>
                  
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <HiUser className="w-5 h-5 mr-3 text-slate-400" />
                    My Profile
                  </Link>
                  
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <HiLogout className="w-5 h-5 mr-3" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <HiUser className="w-5 h-5 mr-3 text-slate-400" />
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <HiOfficeBuilding className="w-5 h-5 mr-3" />
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-16"></div>

      {/* Dropdown click outside handler */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        ></div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Navbar;