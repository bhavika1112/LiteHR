import React, { useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { 
  FiTrendingUp, 
  FiTrendingDown, 
  FiUsers, 
  FiCalendar, 
  FiHome,
  FiDollarSign,
  FiClock,
  FiUserCheck,
  FiUserX,
  FiAlertCircle,
  FiDownload,
  FiFilter,
  FiSearch,
  FiEye,
  FiEdit,
  FiMail,
  FiPhone,
  FiCheckCircle,
  FiXCircle,
  FiMoreVertical
} from "react-icons/fi";
import { 
  HiOutlineOfficeBuilding, 
  HiOutlineDocumentReport,
  HiOutlineCash,
  HiOutlineUserAdd,
  HiOutlineUserGroup
} from "react-icons/hi";

const AdminHome = () => {
  const [timeRange, setTimeRange] = useState("week");
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);
  const [quickStats, setQuickStats] = useState({
    totalEmployees: 0,
    presentToday: 0,
    onLeave: 0,
    remoteWork: 0
  });

  // Simulate loading data
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setQuickStats({
        totalEmployees: 124,
        presentToday: 108,
        onLeave: 7,
        remoteWork: 9
      });
      setLoading(false);
    }, 1000);
  }, []);

  const stats = [
    { 
      title: "Total Employees", 
      value: quickStats.totalEmployees, 
      change: "+12%", 
      trend: "up",
      icon: <HiOutlineUserGroup className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      description: "Active workforce"
    },
    { 
      title: "Present Today", 
      value: quickStats.presentToday, 
      change: "+5%", 
      trend: "up",
      icon: <FiUserCheck className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      description: "Office attendance"
    },
    { 
      title: "On Leave", 
      value: quickStats.onLeave, 
      change: "-2%", 
      trend: "down",
      icon: <FiCalendar className="w-6 h-6" />,
      color: "from-amber-500 to-orange-500",
      description: "Leave applications"
    },
    { 
      title: "Remote Work", 
      value: quickStats.remoteWork, 
      change: "+8%", 
      trend: "up",
      icon: <FiHome className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      description: "Working remotely"
    },
    { 
      title: "Attendance Rate", 
      value: "96.5%", 
      change: "+1.2%", 
      trend: "up",
      icon: <FiClock className="w-6 h-6" />,
      color: "from-indigo-500 to-blue-500",
      description: "Monthly average"
    },
    { 
      title: "Payroll Processed", 
      value: "$124,850", 
      change: "On track", 
      trend: "up",
      icon: <HiOutlineCash className="w-6 h-6" />,
      color: "from-teal-500 to-green-500",
      description: "This month"
    },
  ];

  const recentEmployees = [
    { 
      id: 1, 
      name: "Alex Johnson", 
      department: "Engineering", 
      position: "Senior Developer",
      status: "active",
      joinDate: "2024-01-15",
      avatarColor: "bg-blue-500"
    },
    { 
      id: 2, 
      name: "Sarah Miller", 
      department: "HR", 
      position: "HR Manager",
      status: "active",
      joinDate: "2023-08-22",
      avatarColor: "bg-pink-500"
    },
    { 
      id: 3, 
      name: "Michael Chen", 
      department: "Sales", 
      position: "Sales Lead",
      status: "on-leave",
      joinDate: "2023-11-05",
      avatarColor: "bg-green-500"
    },
    { 
      id: 4, 
      name: "Emma Wilson", 
      department: "Marketing", 
      position: "Content Strategist",
      status: "remote",
      joinDate: "2024-02-10",
      avatarColor: "bg-purple-500"
    },
    { 
      id: 5, 
      name: "David Park", 
      department: "Finance", 
      position: "Financial Analyst",
      status: "active",
      joinDate: "2023-09-18",
      avatarColor: "bg-amber-500"
    },
  ];

  const leaveRequests = [
    { id: 1, name: "Robert Kim", type: "Annual Leave", period: "Mar 15-18", days: 4, status: "pending" },
    { id: 2, name: "Lisa Wong", type: "Sick Leave", period: "Mar 12", days: 1, status: "approved" },
    { id: 3, name: "James Wilson", type: "Emergency", period: "Mar 10-11", days: 2, status: "pending" },
    { id: 4, name: "Maria Garcia", type: "Maternity", period: "Mar 1-31", days: 31, status: "approved" },
    { id: 5, name: "Tom Brown", type: "Study Leave", period: "Mar 20-22", days: 3, status: "rejected" },
  ];

  const upcomingEvents = [
    { id: 1, title: "Quarterly Review Meeting", date: "Mar 15, 10:00 AM", type: "meeting" },
    { id: 2, title: "Team Building Activity", date: "Mar 18, 2:00 PM", type: "event" },
    { id: 3, title: "Project Deadline", date: "Mar 22, EOD", type: "deadline" },
    { id: 4, title: "Company All-Hands", date: "Mar 25, 11:00 AM", type: "meeting" },
    { id: 5, title: "Hiring Interviews", date: "Mar 28, 9:00 AM", type: "interview" },
  ];

  const departmentPerformance = [
    { name: "Engineering", employees: 42, attendance: 96, productivity: 92, budget: "$450K" },
    { name: "Sales", employees: 28, attendance: 94, productivity: 88, budget: "$320K" },
    { name: "Marketing", employees: 18, attendance: 97, productivity: 95, budget: "$280K" },
    { name: "HR", employees: 12, attendance: 98, productivity: 90, budget: "$180K" },
    { name: "Finance", employees: 14, attendance: 95, productivity: 96, budget: "$220K" },
    { name: "Operations", employees: 10, attendance: 93, productivity: 89, budget: "$150K" },
  ];

  const handleQuickAction = (action) => {
    console.log(`Quick action: ${action}`);
    // Implement action logic
  };

  const handleApproveLeave = (id) => {
    console.log(`Approving leave ${id}`);
    // Implement API call
  };

  const handleRejectLeave = (id) => {
    console.log(`Rejecting leave ${id}`);
    // Implement API call
  };

  const handleExportData = () => {
    console.log("Exporting dashboard data...");
    // Implement export logic
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: "bg-green-100 text-green-800",
      "on-leave": "bg-amber-100 text-amber-800",
      remote: "bg-blue-100 text-blue-800",
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800"
    };
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <AdminLayout>
      {/* Header with Actions */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome back, Admin</h1>
          <p className="text-slate-600">
            Here's what's happening with your organization today.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={handleExportData}
            className="flex items-center gap-2 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
          >
            <FiDownload className="w-4 h-4" />
            Export Report
          </button>
          <button 
            onClick={() => handleQuickAction("add-employee")}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:opacity-90 font-medium"
          >
            <HiOutlineUserAdd className="w-4 h-4" />
            Add Employee
          </button>
        </div>
      </div>

      {/* Time Range & Filter Tabs */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
          {["day", "week", "month", "quarter"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                timeRange === range
                  ? "bg-white text-slate-800 shadow"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search employees, departments..."
              className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">
            <FiFilter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Dashboard Tabs */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 border-b border-slate-200">
          {["overview", "analytics", "employees", "attendance", "payroll"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-all ${
                activeTab === tab
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-slate-600 hover:text-slate-800"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className={`bg-white rounded-xl shadow-sm border border-slate-200 p-4 hover:shadow-md transition-all duration-300 ${
              loading ? "animate-pulse" : ""
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color} text-white`}>
                {stat.icon}
              </div>
              <span className={`text-xs font-medium flex items-center ${
                stat.trend === "up" ? "text-green-500" : "text-amber-500"
              }`}>
                {stat.trend === "up" ? <FiTrendingUp className="mr-1" /> : <FiTrendingDown className="mr-1" />}
                {stat.change}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-1">
              {loading ? "..." : stat.value}
            </h2>
            <p className="text-sm font-medium text-slate-600 mb-1">{stat.title}</p>
            <p className="text-xs text-slate-500">{stat.description}</p>
          </div>
        ))}
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Left Column - Chart & Recent Employees */}
        <div className="lg:col-span-2 space-y-6">
          {/* Attendance Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">Attendance Trends</h2>
                <p className="text-sm text-slate-600">Weekly overview</p>
              </div>
              <select className="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last quarter</option>
              </select>
            </div>
            
            {/* Chart Placeholder with Interactive Legend */}
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4 mb-4">
                {["Present", "Late", "Absent", "Remote"].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      idx === 0 ? "bg-green-500" :
                      idx === 1 ? "bg-amber-500" :
                      idx === 2 ? "bg-red-500" : "bg-blue-500"
                    }`} />
                    <span className="text-sm text-slate-600">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="h-64 flex items-end justify-between gap-2 px-4 border-b border-l border-slate-200">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, idx) => (
                  <div key={day} className="flex flex-col items-center flex-1">
                    <div className="text-xs text-slate-500 mb-2">{day}</div>
                    <div className="w-full flex flex-col items-center gap-1">
                      <div 
                        className="w-full bg-green-500 rounded-t"
                        style={{ height: `${60 + Math.random() * 40}%` }}
                        title={`Present: ${Math.floor(80 + Math.random() * 20)}%`}
                      ></div>
                      <div 
                        className="w-3/4 bg-amber-500 rounded-t"
                        style={{ height: `${Math.random() * 30}%` }}
                        title={`Late: ${Math.floor(Math.random() * 15)}%`}
                      ></div>
                      <div 
                        className="w-1/2 bg-red-500 rounded-t"
                        style={{ height: `${Math.random() * 20}%` }}
                        title={`Absent: ${Math.floor(Math.random() * 10)}%`}
                      ></div>
                    </div>
                    <div className="text-xs font-medium text-slate-700 mt-2">
                      {Math.floor(85 + Math.random() * 15)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Employees Table */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">Recent Employees</h2>
                <p className="text-sm text-slate-600">Recently joined team members</p>
              </div>
              <button className="text-blue-500 text-sm font-medium hover:text-blue-600">
                View All →
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Employee</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Department</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Position</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentEmployees.map((emp) => (
                    <tr key={emp.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full ${emp.avatarColor} flex items-center justify-center text-white font-medium`}>
                            {emp.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">{emp.name}</p>
                            <p className="text-xs text-slate-500">Joined {emp.joinDate}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-slate-700">{emp.department}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-slate-700">{emp.position}</span>
                      </td>
                      <td className="py-3 px-4">
                        {getStatusBadge(emp.status)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg">
                            <FiEye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-green-500 hover:bg-green-50 rounded-lg">
                            <FiMail className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
                            <FiMoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column - Quick Actions & Notifications */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => handleQuickAction("add-employee")}
                className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl hover:shadow-md transition-all flex flex-col items-center gap-2"
              >
                <HiOutlineUserAdd className="w-6 h-6 text-blue-500" />
                <span className="text-sm font-medium text-blue-700">Add Employee</span>
              </button>
              <button 
                onClick={() => handleQuickAction("process-payroll")}
                className="p-4 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl hover:shadow-md transition-all flex flex-col items-center gap-2"
              >
                <HiOutlineCash className="w-6 h-6 text-green-500" />
                <span className="text-sm font-medium text-green-700">Process Payroll</span>
              </button>
              <button 
                onClick={() => handleQuickAction("reports")}
                className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl hover:shadow-md transition-all flex flex-col items-center gap-2"
              >
                <HiOutlineDocumentReport className="w-6 h-6 text-purple-500" />
                <span className="text-sm font-medium text-purple-700">Generate Reports</span>
              </button>
              <button 
                onClick={() => handleQuickAction("schedule")}
                className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl hover:shadow-md transition-all flex flex-col items-center gap-2"
              >
                <FiCalendar className="w-6 h-6 text-amber-500" />
                <span className="text-sm font-medium text-amber-700">Schedule Shifts</span>
              </button>
            </div>
          </div>

          {/* Leave Requests */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-slate-800">Leave Requests</h2>
              <span className="text-sm font-medium text-blue-500">{leaveRequests.filter(l => l.status === 'pending').length} pending</span>
            </div>
            
            <div className="space-y-3">
              {leaveRequests.map((request) => (
                <div key={request.id} className="p-3 border border-slate-200 rounded-lg hover:border-slate-300">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-slate-800">{request.name}</p>
                      <p className="text-xs text-slate-500">{request.type}</p>
                    </div>
                    {getStatusBadge(request.status)}
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600">{request.period} • {request.days} days</span>
                    {request.status === "pending" && (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleApproveLeave(request.id)}
                          className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => handleRejectLeave(request.id)}
                          className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-blue-800 mb-4">Upcoming Events</h2>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    event.type === 'meeting' ? 'bg-blue-100 text-blue-600' :
                    event.type === 'event' ? 'bg-green-100 text-green-600' :
                    event.type === 'deadline' ? 'bg-amber-100 text-amber-600' : 'bg-purple-100 text-purple-600'
                  }`}>
                    {event.type === 'meeting' ? 'M' :
                     event.type === 'event' ? 'E' :
                     event.type === 'deadline' ? 'D' : 'I'}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-800">{event.title}</p>
                    <p className="text-sm text-slate-600">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Department Performance Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Department Performance</h2>
            <p className="text-sm text-slate-600">Monthly metrics across departments</p>
          </div>
          <button className="text-blue-500 text-sm font-medium hover:text-blue-600">
            Export Data →
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Department</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Employees</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Attendance</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Productivity</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Budget</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {departmentPerformance.map((dept, idx) => (
                <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${
                        idx === 0 ? 'bg-blue-100 text-blue-700' :
                        idx === 1 ? 'bg-green-100 text-green-700' :
                        idx === 2 ? 'bg-pink-100 text-pink-700' :
                        idx === 3 ? 'bg-purple-100 text-purple-700' :
                        idx === 4 ? 'bg-amber-100 text-amber-700' : 'bg-cyan-100 text-cyan-700'
                      } flex items-center justify-center font-medium`}>
                        {dept.name.charAt(0)}
                      </div>
                      <span className="font-medium text-slate-800">{dept.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-slate-800">{dept.employees}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-100 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            dept.attendance >= 95 ? 'bg-green-500' :
                            dept.attendance >= 90 ? 'bg-amber-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${dept.attendance}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-slate-800">{dept.attendance}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-100 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            dept.productivity >= 90 ? 'bg-green-500' :
                            dept.productivity >= 85 ? 'bg-amber-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${dept.productivity}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-slate-800">{dept.productivity}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-slate-800">{dept.budget}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      dept.attendance >= 95 && dept.productivity >= 90 ? 'bg-green-100 text-green-800' :
                      dept.attendance >= 90 && dept.productivity >= 85 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {dept.attendance >= 95 && dept.productivity >= 90 ? 'Excellent' :
                       dept.attendance >= 90 && dept.productivity >= 85 ? 'Good' : 'Needs Attention'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Alerts */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <FiAlertCircle className="w-5 h-5 text-amber-600" />
          <h2 className="text-lg font-semibold text-amber-800">System Alerts</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white/70 rounded-lg">
            <p className="text-sm font-medium text-slate-800">Payroll Processing</p>
            <p className="text-xs text-slate-600">Due in 3 days</p>
          </div>
          <div className="p-4 bg-white/70 rounded-lg">
            <p className="text-sm font-medium text-slate-800">Quarterly Reports</p>
            <p className="text-xs text-slate-600">Review required</p>
          </div>
          <div className="p-4 bg-white/70 rounded-lg">
            <p className="text-sm font-medium text-slate-800">2 Contracts Expiring</p>
            <p className="text-xs text-slate-600">Action needed</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminHome;