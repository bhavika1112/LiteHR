import React, { useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import { FiMail, FiPhone, FiCalendar, FiMapPin, FiBriefcase, FiUser, FiDownload, FiEdit2 } from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";

const EmployeeProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");

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

  const recentActivity = [
    { action: "Checked in", date: "2025-12-08 09:12 AM", type: "attendance" },
    { action: "Applied for leave", date: "2025-12-07 03:40 PM", type: "leave" },
    { action: "Profile updated", date: "2025-12-05 05:20 PM", type: "profile" },
    { action: "Completed training", date: "2025-12-03 11:00 AM", type: "training" },
  ];

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "attendance", label: "Attendance" },
    { id: "leaves", label: "Leaves" },
    { id: "performance", label: "Performance" },
    { id: "documents", label: "Documents" },
  ];

  return (
    <AdminLayout>
      {/* Header with Actions */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Employee Profile</h1>
          <p className="text-slate-600">
            Detailed view of employee information, leave balances, and attendance.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 font-medium">
            <FiDownload className="w-4 h-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium">
            <FiEdit2 className="w-4 h-4" />
            Edit Profile
          </button>
        </div>
      </div>

      {/* PROFILE HEADER */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 mb-6 text-white">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <img
              src={employee.avatar}
              className="w-32 h-32 rounded-full border-4 border-white/20 shadow-xl"
              alt="Profile"
            />
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold">{employee.name}</h2>
                <p className="text-slate-300 mt-2">
                  {employee.jobTitle} • {employee.department} Department
                </p>
                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <FiMail className="w-4 h-4" />
                    <span className="text-sm">{employee.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiPhone className="w-4 h-4" />
                    <span className="text-sm">{employee.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HiOutlineOfficeBuilding className="w-4 h-4" />
                    <span className="text-sm">{employee.location}</span>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-center">
                  <p className="text-sm text-slate-300">Employee ID</p>
                  <p className="text-2xl font-bold mt-1">{employee.employeeId}</p>
                  <div className="mt-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      employee.status === "Active" 
                        ? "bg-green-500 text-white" 
                        : "bg-slate-500 text-white"
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
        <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-white text-slate-800 shadow"
                  : "text-slate-600 hover:text-slate-800"
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
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Performance Rating</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <h3 className="text-3xl font-bold text-slate-800">{performance.rating}</h3>
                    <span className="text-green-500 font-medium">/5.0</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-600">★</span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex-1 bg-slate-100 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${(performance.rating/5)*100}%` }}
                  ></div>
                </div>
                <span className="text-sm text-slate-600">Top 10%</span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Goals Progress</p>
                  <h3 className="text-3xl font-bold text-slate-800 mt-2">
                    {performance.completed}/{performance.goals}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center">
                  <FiBriefcase className="w-6 h-6 text-blue-500" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Completion</span>
                  <span>{Math.round((performance.completed/performance.goals)*100)}%</span>
                </div>
                <div className="mt-2 bg-slate-100 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(performance.completed/performance.goals)*100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Overtime Hours</p>
                  <h3 className="text-3xl font-bold text-slate-800 mt-2">
                    {attendanceStats.overtime}h
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 flex items-center justify-center">
                  <FiCalendar className="w-6 h-6 text-amber-500" />
                </div>
              </div>
              <p className="text-sm text-slate-600 mt-4">This month</p>
            </div>
          </div>

          {/* Employee Details Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Employee Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: <FiUser />, label: "Reporting Manager", value: employee.manager },
                { icon: <FiBriefcase />, label: "Employment Type", value: employee.employmentType },
                { icon: <FiCalendar />, label: "Join Date", value: employee.joinDate },
                { icon: <FiCalendar />, label: "Date of Birth", value: employee.dob },
                { icon: <FiMapPin />, label: "Location", value: employee.location },
                { icon: <FiPhone />, label: "Shift", value: employee.shift },
                { icon: <FiBriefcase />, label: "Experience", value: employee.experience },
                { icon: <HiOutlineOfficeBuilding />, label: "Department", value: employee.department },
              ].map((detail, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                    {detail.icon}
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">{detail.label}</p>
                    <p className="font-medium text-slate-800">{detail.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* Leave Balances */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Leave Balances</h3>
            <div className="space-y-4">
              {[
                { 
                  type: "Earned Leave", 
                  data: leaveBalances.earned, 
                  color: "bg-gradient-to-r from-green-500 to-emerald-500" 
                },
                { 
                  type: "Sick Leave", 
                  data: leaveBalances.sick, 
                  color: "bg-gradient-to-r from-amber-500 to-yellow-500" 
                },
                { 
                  type: "Casual Leave", 
                  data: leaveBalances.casual, 
                  color: "bg-gradient-to-r from-blue-500 to-cyan-500" 
                },
              ].map((leave, idx) => (
                <div key={idx} className="p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium text-slate-800">{leave.type}</span>
                    <span className="text-lg font-bold text-slate-800">{leave.data.remaining}</span>
                  </div>
                  <div className="mb-2">
                    <div className="flex justify-between text-sm text-slate-600 mb-1">
                      <span>Used: {leave.data.used}</span>
                      <span>Total: {leave.data.total}</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${leave.color.split(' ')[0]}`}
                        style={{ width: `${(leave.data.used/leave.data.total)*100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Remaining</span>
                    <span>{leave.data.remaining} days</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attendance Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Attendance Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Present", value: attendanceStats.present, color: "bg-green-100 text-green-700" },
                { label: "Absent", value: attendanceStats.absent, color: "bg-red-100 text-red-700" },
                { label: "Late", value: attendanceStats.late, color: "bg-amber-100 text-amber-700" },
                { label: "Early Exit", value: attendanceStats.earlyExit, color: "bg-blue-100 text-blue-700" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center p-4 rounded-lg border border-slate-200">
                  <p className="text-sm text-slate-600 mb-2">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color.split(' ')[2]}`}>{stat.value}</p>
                  <div className="mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${stat.color}`}>
                      Days
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Recent Activity</h3>
              <button className="text-sm text-blue-500 hover:text-blue-600">View All</button>
            </div>
            <div className="space-y-3">
              {recentActivity.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    item.type === 'attendance' ? 'bg-green-100 text-green-600' :
                    item.type === 'leave' ? 'bg-blue-100 text-blue-600' :
                    item.type === 'profile' ? 'bg-purple-100 text-purple-600' :
                    'bg-amber-100 text-amber-600'
                  }`}>
                    {item.type === 'attendance' && <FiCalendar />}
                    {item.type === 'leave' && <FiCalendar />}
                    {item.type === 'profile' && <FiUser />}
                    {item.type === 'training' && <FiBriefcase />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">{item.action}</p>
                    <p className="text-xs text-slate-500 mt-1">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EmployeeProfile;