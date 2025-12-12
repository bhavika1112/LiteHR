import React, { useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import { FiUsers, FiMail, FiUser, FiEdit2, FiActivity, FiCalendar, FiTrendingUp, FiClock } from "react-icons/fi";
import { HiOutlineOfficeBuilding, HiOutlineUserGroup } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";

const DepartmentDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  const department = {
    id,
    name: "IT Department",
    email: "it@company.com",
    head: "Rahul Sharma",
    headAvatar: "RS",
    colorTag: "blue",
    description: "Responsible for all technical operations, software development, network management, and IT support across the organization.",
    status: "Active",
    createdAt: "2024-01-10",
    notes: "Ensure daily standups and weekly project updates.\nMaintain documentation standards.\nMonthly tech review on last Friday.\nTeam building quarterly.",
    budget: "$1,200,000",
    projects: 8,
  };

  const analytics = {
    totalEmployees: 24,
    presentToday: 21,
    onLeaveToday: 2,
    absentToday: 1,
    monthlyAttendance: 92,
    lateMarks: 4,
    averageWorkHours: "7.6 hrs",
    productivity: 88,
    overtime: 120,
  };

  const performanceTrends = [
    { month: "Jan", attendance: 89, productivity: 82 },
    { month: "Feb", attendance: 91, productivity: 85 },
    { month: "Mar", attendance: 90, productivity: 84 },
    { month: "Apr", attendance: 92, productivity: 86 },
    { month: "May", attendance: 93, productivity: 88 },
    { month: "Jun", attendance: 94, productivity: 90 },
  ];

  const employees = [
    {
      id: 1,
      name: "Rahul Sharma",
      role: "Engineering Manager",
      email: "rahul.sharma@example.com",
      status: "Active",
      avatar: "RS",
      performance: 4.8,
      attendance: 98,
    },
    {
      id: 2,
      name: "Ananya Mehta",
      role: "Senior Developer",
      email: "ananya.mehta@example.com",
      status: "Active",
      avatar: "AM",
      performance: 4.5,
      attendance: 96,
    },
    {
      id: 3,
      name: "Aman Verma",
      role: "DevOps Engineer",
      email: "aman.verma@example.com",
      status: "Active",
      avatar: "AV",
      performance: 4.3,
      attendance: 94,
    },
    {
      id: 4,
      name: "Priya Patel",
      role: "Frontend Developer",
      email: "priya.patel@example.com",
      status: "Active",
      avatar: "PP",
      performance: 4.6,
      attendance: 97,
    },
  ];

  const badgeColors = {
    blue: { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200" },
    green: { bg: "bg-green-100", text: "text-green-700", border: "border-green-200" },
    pink: { bg: "bg-pink-100", text: "text-pink-700", border: "border-pink-200" },
    yellow: { bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-200" },
    indigo: { bg: "bg-indigo-100", text: "text-indigo-700", border: "border-indigo-200" },
  };

  const color = badgeColors[department.colorTag];

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className={`px-3 py-1 text-xs rounded-full ${color.bg} ${color.text} ${color.border}`}>
              {department.name.split(" ")[0]}
            </span>
            <span className="text-sm text-slate-600">Department ID: DEP-{department.id}</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-800">{department.name}</h1>
          <p className="text-slate-600 mt-2 max-w-3xl">{department.description}</p>
        </div>

        <div className="flex gap-3">
          <Link
            to={`/admin/departments/edit/${department.id}`}
            className="flex items-center gap-2 bg-white border border-slate-300 text-slate-800 px-4 py-2.5 rounded-lg hover:bg-slate-50 font-medium"
          >
            <FiEdit2 /> Edit
          </Link>
          <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2.5 rounded-lg shadow hover:bg-blue-600 font-medium">
            <HiOutlineUserGroup /> Add Member
          </button>
        </div>
      </div>

      {/* Department Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Total Employees</p>
              <h3 className="text-3xl font-bold mt-2">{analytics.totalEmployees}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
              <FiUsers className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-2 text-sm text-green-400">
              <FiTrendingUp />
              <span>+12% from last month</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Monthly Attendance</p>
              <h3 className="text-3xl font-bold text-slate-800 mt-2">{analytics.monthlyAttendance}%</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <FiCalendar className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-slate-100 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${analytics.monthlyAttendance}%` }}
                ></div>
              </div>
              <span className="text-sm text-slate-600">Target: 95%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Avg Work Hours</p>
              <h3 className="text-3xl font-bold text-slate-800 mt-2">{analytics.averageWorkHours}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <FiClock className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-slate-600">
              <span className="text-green-500 font-medium">+0.4h</span> from last week
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Productivity</p>
              <h3 className="text-3xl font-bold text-slate-800 mt-2">{analytics.productivity}%</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
              <FiActivity className="w-6 h-6 text-indigo-500" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-slate-100 rounded-full h-2">
                <div 
                  className="bg-indigo-500 h-2 rounded-full"
                  style={{ width: `${analytics.productivity}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Status */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Today's Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg border border-green-200 bg-green-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <FiUser className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Present</p>
                <p className="text-2xl font-bold text-green-600">{analytics.presentToday}</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 rounded-lg border border-blue-200 bg-blue-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <FiCalendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">On Leave</p>
                <p className="text-2xl font-bold text-blue-600">{analytics.onLeaveToday}</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 rounded-lg border border-red-200 bg-red-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <FiUser className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Absent</p>
                <p className="text-2xl font-bold text-red-600">{analytics.absentToday}</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 rounded-lg border border-amber-200 bg-amber-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <FiClock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Late Today</p>
                <p className="text-2xl font-bold text-amber-600">{analytics.lateMarks}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg w-fit">
          {["overview", "employees", "performance", "settings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-md text-sm font-medium capitalize transition-all ${
                activeTab === tab
                  ? "bg-white text-slate-800 shadow"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Employees */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-slate-800">Team Members</h3>
                <span className="text-sm text-slate-600">{employees.length} members</span>
              </div>
            </div>
            
            <div className="divide-y divide-slate-200">
              {employees.map((emp) => (
                <div key={emp.id} className="p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                        {emp.avatar}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                        emp.status === "Active" ? "bg-green-500" : "bg-slate-400"
                      }`}></div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-slate-800">{emp.name}</p>
                          <p className="text-sm text-slate-600">{emp.role}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-xs text-slate-500">{emp.email}</span>
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 rounded-full bg-green-500"></div>
                              <span className="text-xs text-slate-600">{emp.attendance}% attendance</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-slate-800">{emp.performance}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${i < Math.floor(emp.performance) ? 'text-amber-500' : 'text-slate-300'}`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <Link
                            to={`/admin/employees/${emp.id}`}
                            className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                          >
                            View Profile →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-slate-200">
              <Link
                to="/admin/employees"
                className="w-full py-3 text-center text-blue-500 hover:text-blue-600 font-medium"
              >
                View All Team Members →
              </Link>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mt-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">Performance Trends</h3>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-xl">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center">
                  <FiTrendingUp className="w-8 h-8 text-blue-500" />
                </div>
                <p className="text-slate-700 font-medium">Performance Analytics</p>
                <p className="text-sm text-slate-500 mt-1">Chart.js integration ready</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Department Info */}
        <div className="space-y-6">
          {/* Department Head */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Department Head</h3>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-50">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xl font-bold">
                {department.headAvatar}
              </div>
              <div>
                <p className="font-bold text-slate-800">{department.head}</p>
                <p className="text-sm text-slate-600 mt-1">Engineering Manager</p>
                <div className="flex items-center gap-2 mt-2">
                  <FiMail className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-600">{department.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Department Details */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Department Details</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg hover:bg-slate-50">
                <span className="text-slate-600">Status</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  {department.status}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg hover:bg-slate-50">
                <span className="text-slate-600">Created</span>
                <span className="font-medium text-slate-800">{department.createdAt}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg hover:bg-slate-50">
                <span className="text-slate-600">Annual Budget</span>
                <span className="font-bold text-slate-800">{department.budget}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg hover:bg-slate-50">
                <span className="text-slate-600">Active Projects</span>
                <span className="font-bold text-slate-800">{department.projects}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg hover:bg-slate-50">
                <span className="text-slate-600">Overtime Hours</span>
                <span className="font-bold text-amber-600">{analytics.overtime}h</span>
              </div>
            </div>
          </div>

          {/* Internal Notes */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Internal Notes</h3>
              <button className="text-sm text-blue-500 hover:text-blue-600 font-medium">
                Edit
              </button>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-slate-700 whitespace-pre-line text-sm leading-relaxed">
                {department.notes}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DepartmentDetails;