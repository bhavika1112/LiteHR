import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiLayers,
  FiCalendar,
  FiSettings,
  FiLogOut,
  FiBell,
  FiChevronDown,
  FiUser,
  FiMessageSquare,
  FiGrid,
} from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { HiOutlineOfficeBuilding } from "react-icons/hi";

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const [userDropdown, setUserDropdown] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const menuItems = [
  { label: "Dashboard", icon: <FiGrid />, path: "/admin/dashboard" },
  { label: "Employees", icon: <FiUsers />, path: "/admin/employees" },
  { label: "Departments", icon: <HiOutlineOfficeBuilding />, path: "/admin/departments" },
  { 
    label: "Attendance", 
    icon: <FiCalendar />, 
    path: "/admin/attendance",
    subItems: [
      { label: "Daily", path: "/admin/attendance/daily" },
      { label: "Monthly", path: "/admin/attendance/monthly" },
      { label: "Reports", path: "/admin/attendance/reports" },
    ]
  },
  { 
    label: "Leaves", 
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>, 
    path: "/admin/leaves",
    subItems: [
      { label: "Requests", path: "/admin/leaves/requests" },
      { label: "Policy", path: "/admin/leaves/policy" },
    ]
  },
  { label: "Settings", icon: <FiSettings />, path: "/admin/settings" },
];

  const notifications = [
    { id: 1, text: "New leave request from Rahul Sharma", time: "2 min ago", unread: true },
    { id: 2, text: "Performance review scheduled", time: "1 hour ago", unread: true },
    { id: 3, text: "System maintenance tonight", time: "3 hours ago", unread: false },
  ];

  return (
    <div className="flex h-screen bg-slate-100">
      {/* SIDEBAR */}
      <aside className={`${sidebarCollapsed ? 'w-20' : 'w-64'} bg-slate-900 text-white flex flex-col transition-all duration-300 shadow-xl z-20`}>
        
        {/* Logo */}
        <div className="px-6 py-5 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div className={`${sidebarCollapsed ? 'hidden' : 'block'}`}>
              <div className="text-2xl font-bold tracking-wide">LiteHR</div>
              <div className="text-xs text-slate-300 mt-1">Admin Panel</div>
            </div>
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d={sidebarCollapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={[
                  "flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-all duration-200 group",
                  isActive
                    ? "bg-blue-500 text-white shadow-md"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white",
                  sidebarCollapsed ? "justify-center" : ""
                ].join(" ")}
                title={sidebarCollapsed ? item.label : ""}
              >
                <span className="text-lg transition-transform group-hover:scale-110">{item.icon}</span>
                {!sidebarCollapsed && (
                  <span className="flex-1">{item.label}</span>
                )}
                {isActive && !sidebarCollapsed && (
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-slate-800">
          {!sidebarCollapsed ? (
            <>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center text-white font-bold">
                  AU
                </div>
                <div className="flex-1">
                  <p className="font-medium">Admin User</p>
                  <p className="text-xs text-slate-400">Super Admin</p>
                </div>
              </div>
              <button className="flex w-full items-center justify-center gap-2 text-sm bg-slate-800 text-white px-3 py-2 rounded-lg hover:bg-red-500 transition-colors">
                <FiLogOut />
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center text-white font-bold text-sm">
                AU
              </div>
              <button className="p-2 rounded-lg hover:bg-slate-800 transition-colors">
                <FiLogOut className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* HEADER */}
        <header className="bg-white px-6 py-3 border-b border-slate-200 flex justify-between items-center shadow-sm">
          <div>
            <h1 className="text-lg font-semibold text-slate-800">
              {menuItems.find(item => location.pathname.startsWith(item.path))?.label || "Dashboard"}
            </h1>
            <p className="text-sm text-slate-600">
              HR & Attendance Management System
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-lg hover:bg-slate-100 relative"
              >
                <IoMdNotificationsOutline className="w-5 h-5 text-slate-600" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
              
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-200">
                    <h3 className="font-semibold text-slate-800">Notifications</h3>
                  </div>
                  {notifications.map(notif => (
                    <div key={notif.id} className={`px-4 py-3 hover:bg-slate-50 ${notif.unread ? 'bg-blue-50' : ''}`}>
                      <p className="text-sm text-slate-800">{notif.text}</p>
                      <p className="text-xs text-slate-500 mt-1">{notif.time}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Clock */}
            <div className="bg-slate-800 text-slate-300 px-4 py-2 rounded-lg text-sm font-medium">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>

            {/* User Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center text-white font-bold text-sm">
                  AU
                </div>
                <FiChevronDown className={`transition-transform ${userDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {userDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-slate-200">
                    <p className="font-semibold text-slate-800">Admin User</p>
                    <p className="text-xs text-slate-600">admin@company.com</p>
                  </div>
                  <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    <FiUser className="inline mr-2" /> Profile
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    <FiSettings className="inline mr-2" /> Settings
                  </button>
                  <div className="border-t border-slate-200 mt-2 pt-2">
                    <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                      <FiLogOut className="inline mr-2" /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;