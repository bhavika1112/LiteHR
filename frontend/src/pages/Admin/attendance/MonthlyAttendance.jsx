import React, { useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import { FiCalendar, FiChevronLeft, FiChevronRight, FiDownload, FiFilter } from "react-icons/fi";

const MonthlyAttendance = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedEmployee, setSelectedEmployee] = useState("all");
  const [viewMode, setViewMode] = useState("calendar"); // calendar, summary

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const employees = [
    { id: 1, name: "Rahul Sharma", department: "IT" },
    { id: 2, name: "Simran Kaur", department: "HR" },
    { id: 3, name: "Aman Verma", department: "Finance" },
    { id: 4, name: "Priya Patel", department: "IT" },
  ];

  // Generate sample attendance data for 30 days
  const generateAttendanceData = () => {
    const daysInMonth = 30;
    const data = [];
    
    for (let day = 1; day <= daysInMonth; day++) {
      const dayOfWeek = new Date(2024, 0, day).getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      const dayData = {
        day,
        date: `2024-01-${day.toString().padStart(2, '0')}`,
        isWeekend,
        employees: employees.map(emp => ({
          id: emp.id,
          status: isWeekend ? 'weekend' : 
                  Math.random() > 0.1 ? 'present' : 
                  Math.random() > 0.5 ? 'absent' : 'leave',
          checkIn: isWeekend ? '-' : '09:' + (Math.floor(Math.random() * 15)).toString().padStart(2, '0'),
          checkOut: isWeekend ? '-' : '18:' + (Math.floor(Math.random() * 45)).toString().padStart(2, '0'),
        }))
      };
      
      data.push(dayData);
    }
    
    return data;
  };

  const attendanceData = generateAttendanceData();
  const currentMonthName = months[currentMonth.getMonth()];
  const currentYear = currentMonth.getFullYear();

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'present': return 'bg-green-100 text-green-700';
      case 'absent': return 'bg-red-100 text-red-700';
      case 'leave': return 'bg-blue-100 text-blue-700';
      case 'weekend': return 'bg-slate-100 text-slate-500';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'present': return '✓';
      case 'absent': return '✗';
      case 'leave': return 'L';
      case 'weekend': return 'W';
      default: return '-';
    }
  };

  const calculateStats = () => {
    const stats = {
      totalDays: attendanceData.length,
      workingDays: attendanceData.filter(d => !d.isWeekend).length,
      presentDays: 0,
      absentDays: 0,
      leaveDays: 0,
    };

    attendanceData.forEach(day => {
      if (!day.isWeekend) {
        day.employees.forEach(emp => {
          if (emp.status === 'present') stats.presentDays++;
          if (emp.status === 'absent') stats.absentDays++;
          if (emp.status === 'leave') stats.leaveDays++;
        });
      }
    });

    return stats;
  };

  const stats = calculateStats();

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Monthly Attendance</h1>
          <p className="text-slate-600">
            View and manage monthly attendance records for all employees.
          </p>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium">
            <FiDownload className="w-4 h-4" />
            Export Excel
          </button>
        </div>
      </div>

      {/* Month Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          {/* Month Selector */}
          <div className="flex items-center gap-4">
            <button
              onClick={prevMonth}
              className="p-2 rounded-lg hover:bg-slate-100"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-800">
                {currentMonthName} {currentYear}
              </h2>
              <p className="text-slate-600">Attendance Overview</p>
            </div>
            
            <button
              onClick={nextMonth}
              className="p-2 rounded-lg hover:bg-slate-100"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Filters */}
          <div className="flex gap-4">
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="px-4 py-2.5 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
            >
              <option value="all">All Employees</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
            </select>

            <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode("calendar")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  viewMode === "calendar"
                    ? "bg-white text-slate-800 shadow"
                    : "text-slate-600 hover:text-slate-800"
                }`}
              >
                Calendar View
              </button>
              <button
                onClick={() => setViewMode("summary")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  viewMode === "summary"
                    ? "bg-white text-slate-800 shadow"
                    : "text-slate-600 hover:text-slate-800"
                }`}
              >
                Summary View
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-gradient-to-br from-slate-50 to-white p-4 rounded-lg border border-slate-200">
            <p className="text-sm text-slate-600">Working Days</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{stats.workingDays}</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-white p-4 rounded-lg border border-green-200">
            <p className="text-sm text-green-600">Present Days</p>
            <p className="text-2xl font-bold text-green-600 mt-1">{stats.presentDays}</p>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-white p-4 rounded-lg border border-red-200">
            <p className="text-sm text-red-600">Absent Days</p>
            <p className="text-2xl font-bold text-red-600 mt-1">{stats.absentDays}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-600">Leave Days</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">{stats.leaveDays}</p>
          </div>
        </div>
      </div>

      {/* Calendar Table */}
      {viewMode === "calendar" && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="p-4 text-left text-sm font-semibold text-slate-700">Employee</th>
                  {attendanceData.map((day) => (
                    <th key={day.day} className="p-4 text-center">
                      <div className={`text-sm font-medium ${day.isWeekend ? 'text-slate-400' : 'text-slate-700'}`}>
                        {day.day}
                      </div>
                      <div className={`text-xs ${day.isWeekend ? 'text-slate-400' : 'text-slate-500'}`}>
                        {day.isWeekend ? 'Weekend' : 'Weekday'}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {employees.map(emp => (
                  <tr key={emp.id} className="hover:bg-slate-50 transition-colors border-t border-slate-200">
                    <td className="p-4 sticky left-0 bg-white">
                      <div className="min-w-[200px]">
                        <p className="font-medium text-slate-800">{emp.name}</p>
                        <p className="text-sm text-slate-600">{emp.department}</p>
                      </div>
                    </td>
                    {attendanceData.map(day => {
                      const employeeDay = day.employees.find(e => e.id === emp.id);
                      return (
                        <td key={day.day} className="p-2 text-center">
                          <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm font-medium ${
                            getStatusColor(employeeDay?.status || '')
                          }`}>
                            {getStatusIcon(employeeDay?.status || '')}
                          </div>
                          {employeeDay?.status === 'present' && !day.isWeekend && (
                            <div className="text-xs text-slate-600 mt-1">
                              {employeeDay.checkIn}
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Summary View */}
      {viewMode === "summary" && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="p-4 text-left text-sm font-semibold text-slate-700">Employee</th>
                  <th className="p-4 text-left text-sm font-semibold text-slate-700">Department</th>
                  <th className="p-4 text-left text-sm font-semibold text-slate-700">Present</th>
                  <th className="p-4 text-left text-sm font-semibold text-slate-700">Absent</th>
                  <th className="p-4 text-left text-sm font-semibold text-slate-700">Leave</th>
                  <th className="p-4 text-left text-sm font-semibold text-slate-700">Late Days</th>
                  <th className="p-4 text-left text-sm font-semibold text-slate-700">Attendance %</th>
                  <th className="p-4 text-left text-sm font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(emp => {
                  const empData = attendanceData.flatMap(day => 
                    day.employees.filter(e => e.id === emp.id && !day.isWeekend)
                  );
                  
                  const presentCount = empData.filter(e => e.status === 'present').length;
                  const absentCount = empData.filter(e => e.status === 'absent').length;
                  const leaveCount = empData.filter(e => e.status === 'leave').length;
                  const totalWorkingDays = attendanceData.filter(d => !d.isWeekend).length;
                  const attendancePercentage = totalWorkingDays > 0 
                    ? Math.round((presentCount / totalWorkingDays) * 100) 
                    : 0;
                  
                  return (
                    <tr key={emp.id} className="hover:bg-slate-50 transition-colors border-t border-slate-200">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                            {emp.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">{emp.name}</p>
                            <p className="text-sm text-slate-600">EMP{emp.id.toString().padStart(3, '0')}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                          {emp.department}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-green-600">{presentCount}</span>
                          <span className="text-sm text-slate-600">days</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-red-600">{absentCount}</span>
                          <span className="text-sm text-slate-600">days</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-blue-600">{leaveCount}</span>
                          <span className="text-sm text-slate-600">days</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-xl font-bold text-amber-600">3</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1">
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${
                                  attendancePercentage >= 90 ? 'bg-green-500' :
                                  attendancePercentage >= 75 ? 'bg-amber-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${attendancePercentage}%` }}
                              ></div>
                            </div>
                          </div>
                          <span className={`text-lg font-bold ${
                            attendancePercentage >= 90 ? 'text-green-600' :
                            attendancePercentage >= 75 ? 'text-amber-600' : 'text-red-600'
                          }`}>
                            {attendancePercentage}%
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <button className="text-blue-500 hover:text-blue-600 font-medium text-sm">
                          View Details →
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-800 mb-3">Attendance Legend</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center">✓</div>
            <span className="text-sm text-slate-700">Present</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-red-100 text-red-700 flex items-center justify-center">✗</div>
            <span className="text-sm text-slate-700">Absent</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">L</div>
            <span className="text-sm text-slate-700">Leave</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center">W</div>
            <span className="text-sm text-slate-700">Weekend/Holiday</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">!</div>
            <span className="text-sm text-slate-700">Late Arrival</span>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="p-4 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <FiDownload className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-slate-800">Export Monthly Report</p>
              <p className="text-sm text-slate-600">PDF format</p>
            </div>
          </div>
        </button>
        
        <button className="p-4 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <FiDownload className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-slate-800">Export Excel Sheet</p>
              <p className="text-sm text-slate-600">CSV/XLSX format</p>
            </div>
          </div>
        </button>
        
        <button className="p-4 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
              <FiCalendar className="w-5 h-5 text-amber-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-slate-800">Generate Payroll Data</p>
              <p className="text-sm text-slate-600">Based on attendance</p>
            </div>
          </div>
        </button>
      </div>
    </AdminLayout>
  );
};

export default MonthlyAttendance;