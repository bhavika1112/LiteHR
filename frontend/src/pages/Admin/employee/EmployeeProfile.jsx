import React, { useState } from "react";
import { FiMail, FiPhone, FiCalendar, FiMapPin, FiBriefcase, FiUser, FiDownload, FiEdit2 } from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { useTheme, useThemeClasses } from "../../../contexts/ThemeContext";

const EmployeeProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
const darkMode = useTheme() || false; // Default to false if undefined
const theme = useThemeClasses();


  const employee = {
    employeeId: "EMP001",
    name: "Rahul Sharma",
    jobTitle: "Senior Software Engineer",
    department: "IT",
    email: "rahul.sharma@example.com",
    phone: "+91 98765 43210",
    status: "Active",
    joinDate: "2024-01-15",
    manager: "Simran Kaur",
    location: "Mumbai, India",
    shift: "General (9 AM - 6 PM)",
    employmentType: "Full-time",
    dob: "1995-05-22",
    experience: "5 years",
    reportsTo: "Simran Kaur",
    avatar: "https://ui-avatars.com/api/?name=Rahul+Sharma&background=0F172A&color=fff&size=128",
  };

  const leaveBalances = {
    earned: { total: 20, used: 12, remaining: 8 },
    sick: { total: 10, used: 6, remaining: 4 },
    casual: { total: 15, used: 12, remaining: 3 },
  };

  const attendanceStats = {
    present: 22,
    absent: 2,
    late: 1,
    earlyExit: 0,
    overtime: 8,
  };

  const performance = {
    rating: 4.5,
    goals: 8,
    completed: 6,
    pending: 2,
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "attendance", label: "Attendance" },
    { id: "leaves", label: "Leaves" },
    { id: "performance", label: "Performance" },
    { id: "documents", label: "Documents" },
  ];

  return (
    <div className="w-full">
      {/* Header with Actions */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className={`text-3xl font-bold ${theme.text.primary} mb-2`}>
            Employee Profile
          </h1>
          <p className={theme.text.secondary}>
            Detailed view of employee information, leave balances, and attendance.
          </p>
        </div>
        <div className="flex gap-3">
          <button className={`flex items-center gap-2 px-4 py-2.5 ${theme.bg.secondary} border ${theme.border.primary} ${theme.text.primary} rounded-lg hover:border-purple-500 transition-colors`}>
            <FiDownload className="w-4 h-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors">
            <FiEdit2 className="w-4 h-4" />
            Edit Profile
          </button>
        </div>
      </div>

      {/* PROFILE HEADER */}
      <div className={`${theme.bg.secondary} rounded-xl p-8 border ${theme.border.primary} shadow-sm mb-6`}>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <img
              src={employee.avatar}
              className="w-32 h-32 rounded-full border-4 border-white/20 shadow-xl"
              alt="Profile"
            />
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-emerald-500 border-2 border-white rounded-full animate-pulse"></div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{employee.name}</h2>
                <p className={theme.text.secondary + " mt-2"}>
                  {employee.jobTitle} • {employee.department} Department
                </p>
                <div className="flex flex-wrap gap-4 mt-4">
                  <div className={`flex items-center gap-2 ${theme.text.secondary}`}>
                    <FiMail className="w-4 h-4" />
                    <span className="text-sm">{employee.email}</span>
                  </div>
                  <div className={`flex items-center gap-2 ${theme.text.secondary}`}>
                    <FiPhone className="w-4 h-4" />
                    <span className="text-sm">{employee.phone}</span>
                  </div>
                  <div className={`flex items-center gap-2 ${theme.text.secondary}`}>
                    <HiOutlineOfficeBuilding className="w-4 h-4" />
                    <span className="text-sm">{employee.location}</span>
                  </div>
                </div>
              </div>
              <div className={`${darkMode ? 'bg-gray-900/50' : 'bg-gray-100'} rounded-xl p-4 border ${theme.border.primary}`}>
                <div className="text-center">
                  <p className={`text-sm ${theme.text.secondary}`}>Employee ID</p>
                  <p className={`text-2xl font-bold ${theme.text.primary} mt-1`}>
                    {employee.employeeId}
                  </p>
                  <div className="mt-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      employee.status === "Active" 
                        ? `${darkMode ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-emerald-100 text-emerald-700 border border-emerald-300'}` 
                        : `${darkMode ? 'bg-gray-500/20 text-gray-300 border border-gray-700' : 'bg-gray-100 text-gray-600 border border-gray-300'}`
                    }`}>
                      {employee.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="mb-6">
        <div className={`flex space-x-1 ${theme.bg.secondary} p-1 rounded-lg w-fit border ${theme.border.primary}`}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-purple-500/20 text-purple-700 dark:text-white border border-purple-500/30"
                  : `${theme.text.secondary} hover:text-purple-600 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700`
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Performance Rating */}
            <div className={`${theme.bg.secondary} rounded-xl p-5 border ${theme.border.primary} shadow-sm`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${theme.text.secondary}`}>Performance Rating</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{performance.rating}</h3>
                    <span className="text-emerald-500 dark:text-emerald-400 font-medium">/5.0</span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-full ${darkMode ? 'bg-emerald-500/20' : 'bg-emerald-100'} flex items-center justify-center`}>
                  <span className="text-2xl text-emerald-500 dark:text-emerald-400">★</span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className={`flex-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
                  <div 
                    className="bg-emerald-500 h-2 rounded-full"
                    style={{ width: `${(performance.rating/5)*100}%` }}
                  ></div>
                </div>
                <span className="text-sm text-emerald-500 dark:text-emerald-400">Top 10%</span>
              </div>
            </div>

            {/* Goals Progress */}
            <div className={`${theme.bg.secondary} rounded-xl p-5 border ${theme.border.primary} shadow-sm`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${theme.text.secondary}`}>Goals Progress</p>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {performance.completed}/{performance.goals}
                  </h3>
                </div>
                <div className={`w-12 h-12 rounded-full ${darkMode ? 'bg-purple-500/20' : 'bg-purple-100'} flex items-center justify-center`}>
                  <FiBriefcase className="w-6 h-6 text-purple-500 dark:text-purple-400" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>Completion</span>
                  <span className="text-purple-500 dark:text-purple-400">{Math.round((performance.completed/performance.goals)*100)}%</span>
                </div>
                <div className={`mt-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
                  <div 
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: `${(performance.completed/performance.goals)*100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Overtime Hours */}
            <div className={`${theme.bg.secondary} rounded-xl p-5 border ${theme.border.primary} shadow-sm`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${theme.text.secondary}`}>Overtime Hours</p>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {attendanceStats.overtime}h
                  </h3>
                </div>
                <div className={`w-12 h-12 rounded-full ${darkMode ? 'bg-amber-500/20' : 'bg-amber-100'} flex items-center justify-center`}>
                  <FiCalendar className="w-6 h-6 text-amber-500 dark:text-amber-400" />
                </div>
              </div>
              <p className="text-sm text-amber-500 dark:text-amber-400 mt-4">This month</p>
            </div>
          </div>

          {/* Employee Details Card */}
          <div className={`${theme.bg.secondary} rounded-xl border ${theme.border.primary} shadow-sm p-6`}>
            <h3 className={`text-lg font-semibold ${theme.text.primary} mb-4`}>Employee Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: <FiUser className="text-purple-500 dark:text-purple-400" />, label: "Reporting Manager", value: employee.manager },
                { icon: <FiBriefcase className="text-blue-500 dark:text-blue-400" />, label: "Employment Type", value: employee.employmentType },
                { icon: <FiCalendar className="text-emerald-500 dark:text-emerald-400" />, label: "Join Date", value: employee.joinDate },
                { icon: <FiCalendar className="text-amber-500 dark:text-amber-400" />, label: "Date of Birth", value: employee.dob },
                { icon: <FiMapPin className="text-purple-500 dark:text-purple-400" />, label: "Location", value: employee.location },
                { icon: <FiPhone className="text-blue-500 dark:text-blue-400" />, label: "Shift", value: employee.shift },
                { icon: <FiBriefcase className="text-emerald-500 dark:text-emerald-400" />, label: "Experience", value: employee.experience },
                { icon: <HiOutlineOfficeBuilding className="text-amber-500 dark:text-amber-400" />, label: "Department", value: employee.department },
              ].map((detail, idx) => (
                <div key={idx} className={`flex items-center gap-3 p-3 rounded-lg ${darkMode ? 'bg-gray-900/50' : 'bg-gray-100'} border ${theme.border.primary} hover:border-purple-500/50 transition-colors`}>
                  <div className={`w-10 h-10 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-white'} flex items-center justify-center`}>
                    {detail.icon}
                  </div>
                  <div>
                    <p className={`text-sm ${theme.text.secondary}`}>{detail.label}</p>
                    <p className={`font-medium ${theme.text.primary}`}>{detail.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* Leave Balances */}
          <div className={`${theme.bg.secondary} rounded-xl border ${theme.border.primary} shadow-sm p-6`}>
            <h3 className={`text-lg font-semibold ${theme.text.primary} mb-4`}>Leave Balances</h3>
            <div className="space-y-4">
              {[
                { 
                  type: "Earned Leave", 
                  data: leaveBalances.earned, 
                  color: "bg-emerald-500" 
                },
                { 
                  type: "Sick Leave", 
                  data: leaveBalances.sick, 
                  color: "bg-amber-500" 
                },
                { 
                  type: "Casual Leave", 
                  data: leaveBalances.casual, 
                  color: "bg-purple-500" 
                },
              ].map((leave, idx) => (
                <div key={idx} className={`p-4 rounded-lg border ${theme.border.primary} ${darkMode ? 'bg-gray-900/50' : 'bg-gray-100'} hover:border-purple-500/50 transition-colors`}>
                  <div className="flex justify-between items-center mb-3">
                    <span className={`font-medium ${theme.text.primary}`}>{leave.type}</span>
                    <span className={`text-lg font-bold ${theme.text.primary}`}>{leave.data.remaining}</span>
                  </div>
                  <div className="mb-2">
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-1">
                      <span>Used: {leave.data.used}</span>
                      <span>Total: {leave.data.total}</span>
                    </div>
                    <div className={`h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                      <div 
                        className={`h-full rounded-full ${leave.color}`}
                        style={{ width: `${(leave.data.used/leave.data.total)*100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Remaining</span>
                    <span>{leave.data.remaining} days</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attendance Summary */}
          <div className={`${theme.bg.secondary} rounded-xl border ${theme.border.primary} shadow-sm p-6`}>
            <h3 className={`text-lg font-semibold ${theme.text.primary} mb-4`}>Attendance Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Present", value: attendanceStats.present, color: "text-emerald-500 dark:text-emerald-400" },
                { label: "Absent", value: attendanceStats.absent, color: "text-rose-500 dark:text-rose-400" },
                { label: "Late", value: attendanceStats.late, color: "text-amber-500 dark:text-amber-400" },
                { label: "Early Exit", value: attendanceStats.earlyExit, color: "text-blue-500 dark:text-blue-400" },
              ].map((stat, idx) => (
                <div key={idx} className={`text-center p-4 rounded-lg border ${theme.border.primary} ${darkMode ? 'bg-gray-900/50' : 'bg-gray-100'}`}>
                  <p className={`text-sm ${theme.text.secondary} mb-2`}>{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  <div className="mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-600'} border ${theme.border.primary}`}>
                      Days
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;