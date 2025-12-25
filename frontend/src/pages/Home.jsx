import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FiClock, 
  FiUsers, 
  FiCalendar, 
  FiFileText,
  FiCheckCircle,
  FiBarChart2,
  FiArrowRight,
  FiBriefcase,
  FiUser,
  FiSettings,
  FiClipboard,
  FiBell,
  FiEye,
  FiTrendingUp,
  FiActivity,
  FiTarget
} from "react-icons/fi";

const Home = ({ user, error }) => {
  const navigate = useNavigate();
  const [currentFeature, setCurrentFeature] = useState(0);

  // Features carousel - Only your actual features
  const features = [
    {
      icon: <FiClock className="w-8 h-8" />,
      title: "Attendance Tracking",
      description: "Simple Mark In/Mark Out system with real-time tracking",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: <FiCalendar className="w-8 h-8" />,
      title: "Leave Management",
      description: "Apply for leave and get approvals with automated workflows",
      color: "from-emerald-500 to-green-500"
    },
    {
      icon: <FiClipboard className="w-8 h-8" />,
      title: "Worklog Management",
      description: "Submit daily worklogs and weekly timesheets",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: <FiBarChart2 className="w-8 h-8" />,
      title: "Basic Analytics",
      description: "Real-time dashboards and reports for managers",
      color: "from-slate-600 to-slate-700"
    }
  ];

  // Rotate features every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-purple-900 to-slate-800 text-white">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-purple-300">
                  Welcome back, {user.username}!
                </h1>
                <p className="text-slate-300">Your lightweight HR dashboard</p>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-slate-300">Role</p>
                  <p className="font-medium capitalize text-white">{user.role || "Employee"}</p>
                </div>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur opacity-20 group-hover:opacity-30"></div>
                  <div className="relative w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {user.username?.charAt(0).toUpperCase()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Role-Based Welcome */}
          <div className="relative mb-8 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-30"></div>
            <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-xl border border-white/10">
              <div className="flex items-center">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-20"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mr-6">
                    {user.role === 'admin' ? (
                      <FiSettings className="w-8 h-8 text-white" />
                    ) : user.role === 'manager' ? (
                      <FiUsers className="w-8 h-8 text-white" />
                    ) : (
                      <FiUser className="w-8 h-8 text-white" />
                    )}
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {user.role === 'admin' 
                      ? "Admin Dashboard - Manage Your Team" 
                      : user.role === 'manager' 
                      ? "Manager View - Track Your Team" 
                      : "Employee Dashboard - Your Daily Tasks"}
                  </h2>
                  <p className="text-slate-300">
                    {user.role === 'admin' 
                      ? "Manage employees, configure settings, and view analytics"
                      : user.role === 'manager' 
                      ? "Approve requests and monitor team attendance"
                      : "Mark attendance, apply for leave, and submit worklogs"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Attendance Today */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-30"></div>
              <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-xl border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-cyan-500/20 rounded-xl">
                    <FiClock className="w-8 h-8 text-cyan-400" />
                  </div>
                  <span className="text-emerald-400 text-sm font-medium">Today</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {user.role === 'employee' ? "Mark In/Out" : "85%"}
                </h3>
                <p className="text-slate-300">
                  {user.role === 'employee' ? "Attendance Status" : "Team Present Today"}
                </p>
              </div>
            </div>

            {/* Leave Status */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl blur opacity-20 group-hover:opacity-30"></div>
              <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-xl border border-emerald-500/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-emerald-500/20 rounded-xl">
                    <FiCalendar className="w-8 h-8 text-emerald-400" />
                  </div>
                  <span className="text-cyan-400 text-sm font-medium">Balance</span>
                </div>
                <h3 className="text-2xl font-bold text-emerald-300 mb-1">
                  {user.role === 'employee' ? "12" : "5"}
                </h3>
                <p className="text-slate-300">
                  {user.role === 'employee' ? "Leave Days Available" : "Pending Approvals"}
                </p>
              </div>
            </div>

            {/* Worklogs */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-30"></div>
              <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-xl border border-purple-500/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-500/20 rounded-xl">
                    <FiClipboard className="w-8 h-8 text-purple-400" />
                  </div>
                  <span className="text-purple-400 text-sm font-medium">This Week</span>
                </div>
                <h3 className="text-2xl font-bold text-purple-300 mb-1">
                  {user.role === 'employee' ? "4/5" : "12"}
                </h3>
                <p className="text-slate-300">
                  {user.role === 'employee' ? "Worklogs Submitted" : "Timesheets to Review"}
                </p>
              </div>
            </div>

            {/* Notifications */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl blur opacity-20 group-hover:opacity-30"></div>
              <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-xl border border-amber-500/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-amber-500/20 rounded-xl">
                    <FiBell className="w-8 h-8 text-amber-400" />
                  </div>
                  <span className="text-rose-400 text-sm font-medium">New</span>
                </div>
                <h3 className="text-2xl font-bold text-amber-300 mb-1">3</h3>
                <p className="text-slate-300">
                  {user.role === 'employee' ? "Unread Notifications" : "Team Requests"}
                </p>
              </div>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Quick Actions - Role Specific */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur opacity-20"></div>
                <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 border border-white/10">
                  <h2 className="text-xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-purple-300">
                    Quick Actions
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {user.role === 'employee' ? (
                      // Employee Actions
                      <>
                        <button className="relative group flex flex-col items-center p-4 rounded-xl hover:bg-white/5 transition-colors">
                          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur opacity-0 group-hover:opacity-20"></div>
                          <div className="relative bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-xl text-white mb-3 group-hover:scale-110 transition-transform">
                            <FiClock className="w-6 h-6" />
                          </div>
                          <span className="relative text-sm font-medium text-white">Mark In/Out</span>
                        </button>
                        <button className="relative group flex flex-col items-center p-4 rounded-xl hover:bg-white/5 transition-colors">
                          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl blur opacity-0 group-hover:opacity-20"></div>
                          <div className="relative bg-gradient-to-r from-emerald-500 to-green-500 p-3 rounded-xl text-white mb-3 group-hover:scale-110 transition-transform">
                            <FiCalendar className="w-6 h-6" />
                          </div>
                          <span className="relative text-sm font-medium text-white">Apply Leave</span>
                        </button>
                        <button className="relative group flex flex-col items-center p-4 rounded-xl hover:bg-white/5 transition-colors">
                          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl blur opacity-0 group-hover:opacity-20"></div>
                          <div className="relative bg-gradient-to-r from-purple-500 to-indigo-500 p-3 rounded-xl text-white mb-3 group-hover:scale-110 transition-transform">
                            <FiClipboard className="w-6 h-6" />
                          </div>
                          <span className="relative text-sm font-medium text-white">Submit Worklog</span>
                        </button>
                        <Link to="/reports" className="relative group flex flex-col items-center p-4 rounded-xl hover:bg-white/5 transition-colors">
                          <div className="absolute -inset-1 bg-gradient-to-r from-slate-600 to-slate-700 rounded-xl blur opacity-0 group-hover:opacity-20"></div>
                          <div className="relative bg-gradient-to-r from-slate-600 to-slate-700 p-3 rounded-xl text-white mb-3 group-hover:scale-110 transition-transform">
                            <FiEye className="w-6 h-6" />
                          </div>
                          <span className="relative text-sm font-medium text-white">View Reports</span>
                        </Link>
                      </>
                    ) : user.role === 'manager' ? (
                      // Manager Actions
                      <>
                        <button className="relative group flex flex-col items-center p-4 rounded-xl hover:bg-white/5 transition-colors">
                          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl blur opacity-0 group-hover:opacity-20"></div>
                          <div className="relative bg-gradient-to-r from-emerald-500 to-green-500 p-3 rounded-xl text-white mb-3 group-hover:scale-110 transition-transform">
                            <FiCalendar className="w-6 h-6" />
                          </div>
                          <span className="relative text-sm font-medium text-white">Approve Leaves</span>
                        </button>
                        <button className="relative group flex flex-col items-center p-4 rounded-xl hover:bg-white/5 transition-colors">
                          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl blur opacity-0 group-hover:opacity-20"></div>
                          <div className="relative bg-gradient-to-r from-purple-500 to-indigo-500 p-3 rounded-xl text-white mb-3 group-hover:scale-110 transition-transform">
                            <FiClipboard className="w-6 h-6" />
                          </div>
                          <span className="relative text-sm font-medium text-white">Review Timesheets</span>
                        </button>
                        <button className="relative group flex flex-col items-center p-4 rounded-xl hover:bg-white/5 transition-colors">
                          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur opacity-0 group-hover:opacity-20"></div>
                          <div className="relative bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-xl text-white mb-3 group-hover:scale-110 transition-transform">
                            <FiUsers className="w-6 h-6" />
                          </div>
                          <span className="relative text-sm font-medium text-white">Team Dashboard</span>
                        </button>
                        <Link to="/analytics" className="relative group flex flex-col items-center p-4 rounded-xl hover:bg-white/5 transition-colors">
                          <div className="absolute -inset-1 bg-gradient-to-r from-slate-600 to-slate-700 rounded-xl blur opacity-0 group-hover:opacity-20"></div>
                          <div className="relative bg-gradient-to-r from-slate-600 to-slate-700 p-3 rounded-xl text-white mb-3 group-hover:scale-110 transition-transform">
                            <FiBarChart2 className="w-6 h-6" />
                          </div>
                          <span className="relative text-sm font-medium text-white">View Analytics</span>
                        </Link>
                      </>
                    ) : (
                      // Admin Actions
                      <>
                        <button className="relative group flex flex-col items-center p-4 rounded-xl hover:bg-white/5 transition-colors">
                          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur opacity-0 group-hover:opacity-20"></div>
                          <div className="relative bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-xl text-white mb-3 group-hover:scale-110 transition-transform">
                            <FiUsers className="w-6 h-6" />
                          </div>
                          <span className="relative text-sm font-medium text-white">Add Employee</span>
                        </button>
                        <button className="relative group flex flex-col items-center p-4 rounded-xl hover:bg-white/5 transition-colors">
                          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl blur opacity-0 group-hover:opacity-20"></div>
                          <div className="relative bg-gradient-to-r from-emerald-500 to-green-500 p-3 rounded-xl text-white mb-3 group-hover:scale-110 transition-transform">
                            <FiSettings className="w-6 h-6" />
                          </div>
                          <span className="relative text-sm font-medium text-white">Configure Settings</span>
                        </button>
                        <Link to="/analytics" className="relative group flex flex-col items-center p-4 rounded-xl hover:bg-white/5 transition-colors">
                          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl blur opacity-0 group-hover:opacity-20"></div>
                          <div className="relative bg-gradient-to-r from-purple-500 to-indigo-500 p-3 rounded-xl text-white mb-3 group-hover:scale-110 transition-transform">
                            <FiBarChart2 className="w-6 h-6" />
                          </div>
                          <span className="relative text-sm font-medium text-white">View Analytics</span>
                        </Link>
                        <Link to="/reports" className="relative group flex flex-col items-center p-4 rounded-xl hover:bg-white/5 transition-colors">
                          <div className="absolute -inset-1 bg-gradient-to-r from-slate-600 to-slate-700 rounded-xl blur opacity-0 group-hover:opacity-20"></div>
                          <div className="relative bg-gradient-to-r from-slate-600 to-slate-700 p-3 rounded-xl text-white mb-3 group-hover:scale-110 transition-transform">
                            <FiFileText className="w-6 h-6" />
                          </div>
                          <span className="relative text-sm font-medium text-white">Generate Reports</span>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur opacity-20"></div>
                <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 border border-white/10">
                  <h2 className="text-xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-purple-300">
                    Recent Activity
                  </h2>
                  <div className="space-y-4">
                    {[
                      { user: "You", action: "marked attendance", time: "2 min ago", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
                      { user: "Sarah Smith", action: "applied for leave", time: "15 min ago", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" },
                      { user: "Mike Johnson", action: "submitted timesheet", time: "1 hour ago", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
                      { user: "System", action: "sent daily reminder", time: "2 hours ago", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" }
                    ].map((activity, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition-colors border border-white/10">
                        <div className="flex items-center">
                          <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur opacity-0 group-hover:opacity-20"></div>
                            <div className="relative w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium mr-3">
                              {activity.user.charAt(0)}
                            </div>
                          </div>
                          <div>
                            <p className="font-medium text-white">
                              <span className="font-semibold">{activity.user}</span> {activity.action}
                            </p>
                            <p className="text-sm text-slate-400">{activity.time}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${activity.color}`}>
                          {activity.action.split(' ')[0]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              
              {/* System Status */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur opacity-20"></div>
                <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 border border-white/10">
                  <h2 className="text-xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-purple-300">
                    System Status
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Attendance Tracking</span>
                      <span className="text-emerald-400 font-medium">Active</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Leave Requests</span>
                      <span className="text-cyan-400 font-medium">3 Pending</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Worklogs Today</span>
                      <span className="text-purple-400 font-medium">24/30</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Notifications</span>
                      <span className="text-amber-400 font-medium">Unread: 3</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upcoming Tasks */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-30"></div>
                <div className="relative bg-gradient-to-br from-cyan-900/50 via-blue-900/50 to-slate-900 text-white rounded-xl shadow-xl p-6 border border-cyan-500/30">
                  <h2 className="text-xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-white">Upcoming Tasks</h2>
                  <div className="space-y-4">
                    {[
                      { task: "Submit weekly timesheet", due: "Tomorrow", priority: "High" },
                      { task: "Approve pending leaves", due: "Today", priority: "Medium" },
                      { task: "Review team attendance", due: "This week", priority: "Low" }
                    ].map((task, idx) => (
                      <div key={idx} className="flex items-center p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                        <div className="flex-1">
                          <p className="font-semibold text-white">{task.task}</p>
                          <p className="text-sm opacity-90 text-slate-300">Due: {task.due}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          task.priority === 'High' ? 'bg-gradient-to-r from-rose-500 to-pink-500' :
                          task.priority === 'Medium' ? 'bg-gradient-to-r from-amber-500 to-yellow-500' : 
                          'bg-gradient-to-r from-emerald-500 to-green-500'
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Public Homepage (Non-authenticated)
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 overflow-hidden">
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-slate-900 via-purple-900 to-slate-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="animate-fadeIn">
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl blur opacity-20"></div>
                  <div className="relative w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center shadow-2xl">
                    <FiBriefcase className="w-7 h-7 text-white" />
                  </div>
                </div>
                <h1 className="text-5xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                    LiteHR
                  </span>
                </h1>
              </div>
              
              <h2 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
                Lightweight HR for <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-purple-300">Small Teams</span>
              </h2>
              
              <p className="text-xl text-slate-300 mb-8 max-w-2xl">
                A simplified Zoho People alternative for teams of 10-30. No complex features, 
                just essential HR tools: attendance, leave management, worklogs, and basic analytics.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="relative group inline-flex items-center justify-center px-8 py-4 rounded-xl text-lg font-semibold"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur opacity-30 group-hover:opacity-50"></div>
                  <div className="relative bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl shadow-2xl hover:shadow-3xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 px-8 py-4">
                    Get Started Free
                    <FiArrowRight className="ml-2 w-5 h-5 inline group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
                
                <Link
                  to="/login"
                  className="relative group inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 text-lg"
                >
                  Sign In
                </Link>
              </div>

              {/* Key Benefit */}
              <div className="mt-12 p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-slate-300">
                  <span className="text-cyan-400 font-semibold">Perfect for:</span> Startups, Small IT teams, Coaching centers, NGOs, Retail shops
                </p>
              </div>
            </div>

            {/* Right - Animated Features */}
            <div className="relative animate-slideIn">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-3xl blur opacity-30"></div>
                <div className="relative bg-slate-900/50 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-2xl">
                  <div className="relative h-80">
                    {features.map((feature, idx) => (
                      <div
                        key={idx}
                        className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                          idx === currentFeature ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                      >
                        <div className={`relative group p-6 rounded-2xl mb-6`}>
                          <div className="absolute -inset-1 bg-gradient-to-r ${feature.color} rounded-2xl blur opacity-30"></div>
                          <div className="relative bg-gradient-to-br ${feature.color} rounded-2xl p-6">
                            <div className="text-white">{feature.icon}</div>
                            <h3 className="text-2xl font-bold text-white mt-4">{feature.title}</h3>
                            <p className="text-white/90 mt-2">{feature.description}</p>
                          </div>
                        </div>
                        
                        {/* Feature Indicators */}
                        <div className="flex justify-center space-x-2 mt-6">
                          {features.map((_, dotIdx) => (
                            <button
                              key={dotIdx}
                              onClick={() => setCurrentFeature(dotIdx)}
                              className={`w-2 h-2 rounded-full transition-all ${
                                dotIdx === currentFeature 
                                  ? 'bg-gradient-to-r from-cyan-400 to-purple-400 w-8' 
                                  : 'bg-white/30 hover:bg-white/50'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Only What You <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-purple-300">Actually Need</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Unlike enterprise HR systems with dozens of complex modules, LiteHR focuses on 
              essential features for small teams
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FiUsers className="w-10 h-10" />,
                title: "Employee Module",
                description: "Simple employee management with role-based access",
                features: ["Login & Profile", "Mark In/Out", "Leave Balance", "Notifications"]
              },
              {
                icon: <FiCalendar className="w-10 h-10" />,
                title: "Leave Management",
                description: "Apply for leave with automated approval workflows",
                features: ["Leave Requests", "Auto-approvals", "Balance Tracking", "Team Calendar"]
              },
              {
                icon: <FiClipboard className="w-10 h-10" />,
                title: "Worklog System",
                description: "Submit daily worklogs and weekly timesheets",
                features: ["Daily Worklogs", "Timesheets", "Manager Review", "History"]
              },
              {
                icon: <FiBarChart2 className="w-10 h-10" />,
                title: "Basic Analytics",
                description: "Simple dashboards for managers and admins",
                features: ["Attendance Reports", "Leave Analytics", "Team Overview", "Export Data"]
              }
            ].map((feature, idx) => (
              <div 
                key={idx} 
                className="relative group hover:-translate-y-2 transition-all duration-300"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-20"></div>
                <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-white/10 group-hover:shadow-2xl transition-all duration-300">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-20"></div>
                    <div className="relative w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-300 mb-6">{feature.description}</p>
                  
                  <ul className="space-y-2">
                    {feature.features.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-center text-slate-300">
                        <FiCheckCircle className="w-5 h-5 text-emerald-400 mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Why LiteHR */}
          <div className="relative mt-20 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur opacity-20"></div>
            <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-white/10">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-white mb-6">
                  Why Choose LiteHR Over Spreadsheets?
                </h3>
                <div className="grid md:grid-cols-3 gap-8 mt-8">
                  <div className="text-center">
                    <div className="relative mx-auto mb-4">
                      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl blur opacity-20"></div>
                      <div className="relative w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center text-white">
                        <span className="text-2xl">✓</span>
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Eliminate Errors</h4>
                    <p className="text-slate-300">No more spreadsheet calculation mistakes</p>
                  </div>
                  <div className="text-center">
                    <div className="relative mx-auto mb-4">
                      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-20"></div>
                      <div className="relative w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center text-white">
                        <span className="text-2xl">⏱️</span>
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Real-time Updates</h4>
                    <p className="text-slate-300">Live data for better decision making</p>
                  </div>
                  <div className="text-center">
                    <div className="relative mx-auto mb-4">
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl blur opacity-20"></div>
                      <div className="relative w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white">
                        <span className="text-2xl">👥</span>
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Team Transparency</h4>
                    <p className="text-slate-300">Everyone knows what's happening</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-gradient-to-r from-slate-900 via-purple-900 to-slate-800 text-white py-20">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to Replace Spreadsheets?
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Get started with LiteHR - the lightweight HR system designed for small teams
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="relative group inline-flex items-center justify-center px-8 py-4 rounded-xl text-lg font-semibold"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur opacity-30 group-hover:opacity-50"></div>
              <div className="relative bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl shadow-2xl hover:shadow-3xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 px-8 py-4">
                Get Started Free
                <FiArrowRight className="ml-2 w-5 h-5 inline group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
            
            <Link
              to="/login"
              className="relative group inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 text-lg"
            >
              Sign In Now
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
        
        .animate-slideIn {
          animation: slideIn 1s ease-out 0.3s both;
        }
      `}</style>
    </div>
  );
};

export default Home;