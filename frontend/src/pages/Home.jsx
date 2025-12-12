import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  HiClock, 
  HiUserGroup, 
  HiCalendar, 
  HiDocumentReport,
  HiCheckCircle,
  HiChartBar,
  HiArrowRight,
  HiOfficeBuilding,
  HiUserCircle,
  HiCog,
  HiClipboardList,
  HiBell,
  HiEye
} from "react-icons/hi";
import { 
  MdDashboard, 
  MdPeople, 
  MdAssessment,
  MdNotifications
} from "react-icons/md";

const Home = ({ user, error }) => {
  const navigate = useNavigate();
  const [currentFeature, setCurrentFeature] = useState(0);

  // Features carousel - Only your actual features
  const features = [
    {
      icon: <HiClock className="w-8 h-8" />,
      title: "Attendance Tracking",
      description: "Simple Mark In/Mark Out system with real-time tracking",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <HiCalendar className="w-8 h-8" />,
      title: "Leave Management",
      description: "Apply for leave and get approvals with automated workflows",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <HiClipboardList className="w-8 h-8" />,
      title: "Worklog Management",
      description: "Submit daily worklogs and weekly timesheets",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <HiChartBar className="w-8 h-8" />,
      title: "Basic Analytics",
      description: "Real-time dashboards and reports for managers",
      color: "from-slate-700 to-slate-800"
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">Welcome back, {user.username}!</h1>
                <p className="text-slate-300">Your lightweight HR dashboard</p>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-slate-300">Role</p>
                  <p className="font-medium capitalize">{user.role || "Employee"}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {user.username?.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Role-Based Welcome */}
          <div className="mb-8 bg-gradient-to-r from-blue-50 to-white p-6 rounded-2xl border border-blue-100">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-6">
                {user.role === 'admin' ? (
                  <HiCog className="w-8 h-8 text-white" />
                ) : user.role === 'manager' ? (
                  <HiUserGroup className="w-8 h-8 text-white" />
                ) : (
                  <HiUserCircle className="w-8 h-8 text-white" />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  {user.role === 'admin' 
                    ? "Admin Dashboard - Manage Your Team" 
                    : user.role === 'manager' 
                    ? "Manager View - Track Your Team" 
                    : "Employee Dashboard - Your Daily Tasks"}
                </h2>
                <p className="text-slate-600">
                  {user.role === 'admin' 
                    ? "Manage employees, configure settings, and view analytics"
                    : user.role === 'manager' 
                    ? "Approve requests and monitor team attendance"
                    : "Mark attendance, apply for leave, and submit worklogs"}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Attendance Today */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-50 rounded-xl">
                  <HiClock className="w-8 h-8 text-blue-500" />
                </div>
                <span className="text-green-500 text-sm font-medium">Today</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-1">
                {user.role === 'employee' ? "Mark In/Out" : "85%"}
              </h3>
              <p className="text-slate-600">
                {user.role === 'employee' ? "Attendance Status" : "Team Present Today"}
              </p>
            </div>

            {/* Leave Status */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-50 rounded-xl">
                  <HiCalendar className="w-8 h-8 text-green-500" />
                </div>
                <span className="text-blue-500 text-sm font-medium">Balance</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-1">
                {user.role === 'employee' ? "12" : "5"}
              </h3>
              <p className="text-slate-600">
                {user.role === 'employee' ? "Leave Days Available" : "Pending Approvals"}
              </p>
            </div>

            {/* Worklogs */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-50 rounded-xl">
                  <HiClipboardList className="w-8 h-8 text-purple-500" />
                </div>
                <span className="text-purple-500 text-sm font-medium">This Week</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-1">
                {user.role === 'employee' ? "4/5" : "12"}
              </h3>
              <p className="text-slate-600">
                {user.role === 'employee' ? "Worklogs Submitted" : "Timesheets to Review"}
              </p>
            </div>

            {/* Notifications */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-yellow-50 rounded-xl">
                  <HiBell className="w-8 h-8 text-yellow-500" />
                </div>
                <span className="text-red-500 text-sm font-medium">New</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-1">3</h3>
              <p className="text-slate-600">
                {user.role === 'employee' ? "Unread Notifications" : "Team Requests"}
              </p>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Quick Actions - Role Specific */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                <h2 className="text-xl font-bold text-slate-800 mb-6">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {user.role === 'employee' ? (
                    // Employee Actions
                    <>
                      <button className="flex flex-col items-center p-4 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl text-white mb-3 group-hover:scale-110 transition-transform">
                          <HiClock className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-medium text-slate-700">Mark In/Out</span>
                      </button>
                      <button className="flex flex-col items-center p-4 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl text-white mb-3 group-hover:scale-110 transition-transform">
                          <HiCalendar className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-medium text-slate-700">Apply Leave</span>
                      </button>
                      <button className="flex flex-col items-center p-4 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-xl text-white mb-3 group-hover:scale-110 transition-transform">
                          <HiClipboardList className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-medium text-slate-700">Submit Worklog</span>
                      </button>
                      <Link to="/reports" className="flex flex-col items-center p-4 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className="bg-gradient-to-r from-slate-600 to-slate-700 p-3 rounded-xl text-white mb-3 group-hover:scale-110 transition-transform">
                          <HiEye className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-medium text-slate-700">View Reports</span>
                      </Link>
                    </>
                  ) : user.role === 'manager' ? (
                    // Manager Actions
                    <>
                      <button className="flex flex-col items-center p-4 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl text-white mb-3 group-hover:scale-110 transition-transform">
                          <HiCalendar className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-medium text-slate-700">Approve Leaves</span>
                      </button>
                      <button className="flex flex-col items-center p-4 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-xl text-white mb-3 group-hover:scale-110 transition-transform">
                          <HiClipboardList className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-medium text-slate-700">Review Timesheets</span>
                      </button>
                      <button className="flex flex-col items-center p-4 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl text-white mb-3 group-hover:scale-110 transition-transform">
                          <HiUserGroup className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-medium text-slate-700">Team Dashboard</span>
                      </button>
                      <Link to="/analytics" className="flex flex-col items-center p-4 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className="bg-gradient-to-r from-slate-600 to-slate-700 p-3 rounded-xl text-white mb-3 group-hover:scale-110 transition-transform">
                          <HiChartBar className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-medium text-slate-700">View Analytics</span>
                      </Link>
                    </>
                  ) : (
                    // Admin Actions
                    <>
                      <button className="flex flex-col items-center p-4 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl text-white mb-3 group-hover:scale-110 transition-transform">
                          <HiUserGroup className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-medium text-slate-700">Add Employee</span>
                      </button>
                      <button className="flex flex-col items-center p-4 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl text-white mb-3 group-hover:scale-110 transition-transform">
                          <HiCog className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-medium text-slate-700">Configure Settings</span>
                      </button>
                      <Link to="/analytics" className="flex flex-col items-center p-4 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-xl text-white mb-3 group-hover:scale-110 transition-transform">
                          <HiChartBar className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-medium text-slate-700">View Analytics</span>
                      </Link>
                      <Link to="/reports" className="flex flex-col items-center p-4 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className="bg-gradient-to-r from-slate-600 to-slate-700 p-3 rounded-xl text-white mb-3 group-hover:scale-110 transition-transform">
                          <HiDocumentReport className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-medium text-slate-700">Generate Reports</span>
                      </Link>
                    </>
                  )}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                <h2 className="text-xl font-bold text-slate-800 mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  {[
                    { user: "You", action: "marked attendance", time: "2 min ago", color: "bg-green-100 text-green-600" },
                    { user: "Sarah Smith", action: "applied for leave", time: "15 min ago", color: "bg-blue-100 text-blue-600" },
                    { user: "Mike Johnson", action: "submitted timesheet", time: "1 hour ago", color: "bg-purple-100 text-purple-600" },
                    { user: "System", action: "sent daily reminder", time: "2 hours ago", color: "bg-yellow-100 text-yellow-600" }
                  ].map((activity, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-slate-700 to-slate-800 rounded-full flex items-center justify-center text-white font-medium mr-3">
                          {activity.user.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">
                            <span className="font-semibold">{activity.user}</span> {activity.action}
                          </p>
                          <p className="text-sm text-slate-500">{activity.time}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${activity.color}`}>
                        {activity.action.split(' ')[0]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              
              {/* System Status */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                <h2 className="text-xl font-bold text-slate-800 mb-6">System Status</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">Attendance Tracking</span>
                    <span className="text-green-600 font-medium">Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">Leave Requests</span>
                    <span className="text-blue-600 font-medium">3 Pending</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">Worklogs Today</span>
                    <span className="text-purple-600 font-medium">24/30</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">Notifications</span>
                    <span className="text-yellow-600 font-medium">Unread: 3</span>
                  </div>
                </div>
              </div>

              {/* Upcoming Tasks */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl shadow-xl p-6">
                <h2 className="text-xl font-bold mb-6">Upcoming Tasks</h2>
                <div className="space-y-4">
                  {[
                    { task: "Submit weekly timesheet", due: "Tomorrow", priority: "High" },
                    { task: "Approve pending leaves", due: "Today", priority: "Medium" },
                    { task: "Review team attendance", due: "This week", priority: "Low" }
                  ].map((task, idx) => (
                    <div key={idx} className="flex items-center p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                      <div className="flex-1">
                        <p className="font-semibold">{task.task}</p>
                        <p className="text-sm opacity-90">Due: {task.due}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        task.priority === 'High' ? 'bg-red-400' :
                        task.priority === 'Medium' ? 'bg-yellow-400' : 'bg-green-400'
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
    );
  }

  // Public Homepage (Non-authenticated)
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-slate-900 to-slate-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-600 rounded-full -translate-x-48 translate-y-48"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="animate-fadeIn">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-2xl">
                  <HiOfficeBuilding className="w-7 h-7" />
                </div>
                <h1 className="text-5xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                    LiteHR
                  </span>
                </h1>
              </div>
              
              <h2 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Lightweight HR for <span className="text-blue-400">Small Teams</span>
              </h2>
              
              <p className="text-xl text-slate-300 mb-8 max-w-2xl">
                A simplified Zoho People alternative for teams of 10-30. No complex features, 
                just essential HR tools: attendance, leave management, worklogs, and basic analytics.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl shadow-2xl hover:shadow-3xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 group text-lg"
                >
                  Get Started Free
                  <HiArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 text-lg"
                >
                  Sign In
                </Link>
              </div>

              {/* Key Benefit */}
              <div className="mt-12 p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-slate-300">
                  <span className="text-blue-400 font-semibold">Perfect for:</span> Startups, Small IT teams, Coaching centers, NGOs, Retail shops
                </p>
              </div>
            </div>

            {/* Right - Animated Features */}
            <div className="relative animate-slideIn">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="relative h-80">
                  {features.map((feature, idx) => (
                    <div
                      key={idx}
                      className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                        idx === currentFeature ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}
                    >
                      <div className={`p-6 bg-gradient-to-br ${feature.color} rounded-2xl mb-6`}>
                        <div className="text-white">{feature.icon}</div>
                        <h3 className="text-2xl font-bold text-white mt-4">{feature.title}</h3>
                        <p className="text-white/90 mt-2">{feature.description}</p>
                      </div>
                      
                      {/* Feature Indicators */}
                      <div className="flex justify-center space-x-2 mt-6">
                        {features.map((_, dotIdx) => (
                          <button
                            key={dotIdx}
                            onClick={() => setCurrentFeature(dotIdx)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              dotIdx === currentFeature 
                                ? 'bg-white w-8' 
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

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Only What You <span className="text-blue-500">Actually Need</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Unlike enterprise HR systems with dozens of complex modules, LiteHR focuses on 
              essential features for small teams
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <HiUserGroup className="w-10 h-10" />,
                title: "Employee Module",
                description: "Simple employee management with role-based access",
                features: ["Login & Profile", "Mark In/Out", "Leave Balance", "Notifications"]
              },
              {
                icon: <HiCalendar className="w-10 h-10" />,
                title: "Leave Management",
                description: "Apply for leave with automated approval workflows",
                features: ["Leave Requests", "Auto-approvals", "Balance Tracking", "Team Calendar"]
              },
              {
                icon: <HiClipboardList className="w-10 h-10" />,
                title: "Worklog System",
                description: "Submit daily worklogs and weekly timesheets",
                features: ["Daily Worklogs", "Timesheets", "Manager Review", "History"]
              },
              {
                icon: <HiChartBar className="w-10 h-10" />,
                title: "Basic Analytics",
                description: "Simple dashboards for managers and admins",
                features: ["Attendance Reports", "Leave Analytics", "Team Overview", "Export Data"]
              }
            ].map((feature, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                <p className="text-slate-600 mb-6">{feature.description}</p>
                
                <ul className="space-y-2">
                  {feature.features.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-center text-slate-700">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Why LiteHR */}
          <div className="mt-20 bg-gradient-to-r from-blue-50 to-white rounded-2xl p-8 border border-blue-100">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-slate-800 mb-6">
                Why Choose LiteHR Over Spreadsheets?
              </h3>
              <div className="grid md:grid-cols-3 gap-8 mt-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                    <span className="text-2xl">✓</span>
                  </div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-2">Eliminate Errors</h4>
                  <p className="text-slate-600">No more spreadsheet calculation mistakes</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                    <span className="text-2xl">⏱️</span>
                  </div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-2">Real-time Updates</h4>
                  <p className="text-slate-600">Live data for better decision making</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                    <span className="text-2xl">👥</span>
                  </div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-2">Team Transparency</h4>
                  <p className="text-slate-600">Everyone knows what's happening</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Replace Spreadsheets?
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Get started with LiteHR - the lightweight HR system designed for small teams
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl shadow-2xl hover:shadow-3xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 group text-lg"
            >
              Get Started Free
              <HiArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 text-lg"
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