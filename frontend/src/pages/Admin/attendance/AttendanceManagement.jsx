import React, { useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import { FiCalendar, FiCheck, FiX, FiClock, FiDownload, FiFilter, FiSearch } from "react-icons/fi";
import { HiOutlineUserGroup, HiOutlineCalendar } from "react-icons/hi";

const DailyAttendance = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState("all"); // all, present, absent
  const [searchTerm, setSearchTerm] = useState("");

  const attendanceData = [
    {
      id: 1,
      employeeId: "EMP001",
      name: "Rahul Sharma",
      department: "IT",
      checkIn: "09:02 AM",
      checkOut: "06:15 PM",
      status: "present",
      workingHours: "8h 13m",
      late: "2 min",
      avatar: "RS",
    },
    {
      id: 2,
      employeeId: "EMP002",
      name: "Simran Kaur",
      department: "HR",
      checkIn: "09:15 AM",
      checkOut: "05:45 PM",
      status: "present",
      workingHours: "7h 30m",
      late: "15 min",
      avatar: "SK",
    },
    {
      id: 3,
      employeeId: "EMP003",
      name: "Aman Verma",
      department: "Finance",
      checkIn: "-",
      checkOut: "-",
      status: "absent",
      workingHours: "0h",
      late: "-",
      avatar: "AV",
    },
    {
      id: 4,
      employeeId: "EMP004",
      name: "Priya Patel",
      department: "IT",
      checkIn: "08:58 AM",
      checkOut: "06:05 PM",
      status: "present",
      workingHours: "8h 7m",
      late: "On time",
      avatar: "PP",
    },
    {
      id: 5,
      employeeId: "EMP005",
      name: "Ankit Mehta",
      department: "Marketing",
      checkIn: "-",
      checkOut: "-",
      status: "leave",
      workingHours: "0h",
      late: "-",
      avatar: "AM",
    },
  ];

  const filteredData = attendanceData.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (viewMode === "all") return matchesSearch;
    if (viewMode === "present") return matchesSearch && emp.status === "present";
    if (viewMode === "absent") return matchesSearch && emp.status === "absent";
    return matchesSearch;
  });

  const stats = {
    total: attendanceData.length,
    present: attendanceData.filter(emp => emp.status === "present").length,
    absent: attendanceData.filter(emp => emp.status === "absent").length,
    onLeave: attendanceData.filter(emp => emp.status === "leave").length,
    late: attendanceData.filter(emp => emp.late !== "On time" && emp.late !== "-").length,
  };

  const markAttendance = (employeeId, status) => {
    console.log(`Marking ${employeeId} as ${status}`);
    // API call would go here
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Daily Attendance</h1>
          <p className="text-slate-600">
            Track and manage daily attendance for all employees.
          </p>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium">
            <FiDownload className="w-4 h-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium">
            <FiCalendar className="w-4 h-4" />
            Bulk Update
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{stats.total}</h3>
            </div>
            <HiOutlineUserGroup className="w-8 h-8 text-slate-400" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-green-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">Present</p>
              <h3 className="text-2xl font-bold text-green-600 mt-1">{stats.present}</h3>
            </div>
            <FiCheck className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-red-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600">Absent</p>
              <h3 className="text-2xl font-bold text-red-600 mt-1">{stats.absent}</h3>
            </div>
            <FiX className="w-8 h-8 text-red-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-blue-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600">On Leave</p>
              <h3 className="text-2xl font-bold text-blue-600 mt-1">{stats.onLeave}</h3>
            </div>
            <HiOutlineCalendar className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-amber-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-amber-600">Late</p>
              <h3 className="text-2xl font-bold text-amber-600 mt-1">{stats.late}</h3>
            </div>
            <FiClock className="w-8 h-8 text-amber-500" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Date Picker */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-800 mb-2">
              Select Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            />
          </div>
          
          {/* Search */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-800 mb-2">
              Search Employee
            </label>
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name or ID..."
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Status Filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-800 mb-2">
              Filter by Status
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  viewMode === "all"
                    ? "bg-blue-500 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setViewMode("present")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  viewMode === "present"
                    ? "bg-green-500 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Present
              </button>
              <button
                onClick={() => setViewMode("absent")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  viewMode === "absent"
                    ? "bg-red-500 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Absent
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-slate-700">Employee</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-700">Check In</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-700">Check Out</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-700">Working Hours</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-700">Late By</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-700">Status</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50 transition-colors border-t border-slate-200">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                        {emp.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{emp.name}</p>
                        <p className="text-sm text-slate-600">{emp.employeeId} • {emp.department}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <FiClock className={`w-4 h-4 ${emp.checkIn !== "-" ? "text-green-500" : "text-slate-400"}`} />
                      <span className="font-medium">{emp.checkIn}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <FiClock className={`w-4 h-4 ${emp.checkOut !== "-" ? "text-blue-500" : "text-slate-400"}`} />
                      <span className="font-medium">{emp.checkOut}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-slate-800">{emp.workingHours}</span>
                  </td>
                  <td className="p-4">
                    <span className={`font-medium ${
                      emp.late === "On time" ? "text-green-600" :
                      emp.late === "-" ? "text-slate-500" : "text-amber-600"
                    }`}>
                      {emp.late}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium ${
                      emp.status === "present"
                        ? "bg-green-100 text-green-700"
                        : emp.status === "leave"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${
                        emp.status === "present" ? "bg-green-500" :
                        emp.status === "leave" ? "bg-blue-500" : "bg-red-500"
                      }`}></span>
                      {emp.status.charAt(0).toUpperCase() + emp.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      {emp.status !== "present" && (
                        <button
                          onClick={() => markAttendance(emp.id, "present")}
                          className="px-3 py-1.5 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600"
                        >
                          Mark Present
                        </button>
                      )}
                      {emp.status !== "absent" && emp.status !== "leave" && (
                        <button
                          onClick={() => markAttendance(emp.id, "absent")}
                          className="px-3 py-1.5 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600"
                        >
                          Mark Absent
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="p-4 border-t border-slate-200 bg-slate-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-slate-600">
              Showing {filteredData.length} of {attendanceData.length} employees
            </div>
            <div className="text-sm text-slate-800 font-medium">
              Work Hours Today: <span className="text-green-600">38h 45m</span> • 
              Average: <span className="text-blue-600">7.5h</span> per employee
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 rounded-lg border border-green-200 bg-green-50 hover:bg-green-100 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <FiCheck className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-slate-800">Mark All Present</p>
                <p className="text-sm text-slate-600">Set all employees as present</p>
              </div>
            </div>
          </button>
          
          <button className="p-4 rounded-lg border border-blue-200 bg-blue-50 hover:bg-blue-100 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <FiCalendar className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-slate-800">Import Attendance</p>
                <p className="text-sm text-slate-600">Upload Excel/CSV file</p>
              </div>
            </div>
          </button>
          
          <button className="p-4 rounded-lg border border-amber-200 bg-amber-50 hover:bg-amber-100 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <FiDownload className="w-5 h-5 text-amber-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-slate-800">Export Report</p>
                <p className="text-sm text-slate-600">Download attendance report</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DailyAttendance;