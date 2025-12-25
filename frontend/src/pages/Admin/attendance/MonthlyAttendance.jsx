import React, { useState } from "react";
import { FiCalendar, FiChevronLeft, FiChevronRight, FiDownload, FiFilter, FiTrendingUp, FiTrendingDown, FiClock, FiUsers, FiPieChart } from "react-icons/fi";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useTheme, getThemeClasses } from "../../../contexts/ThemeContext";

const MonthlyAttendance = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedEmployee, setSelectedEmployee] = useState("all");
  const [viewMode, setViewMode] = useState("calendar");
  const darkMode = useTheme();
  const themeClasses = getThemeClasses(darkMode);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const employees = [
    { id: 1, name: "Rahul Sharma", department: "IT" },
    { id: 2, name: "Simran Kaur", department: "HR" },
    { id: 3, name: "Aman Verma", department: "Finance" },
    { id: 4, name: "Priya Patel", department: "IT" },
    { id: 5, name: "Ankit Mehta", department: "Marketing" },
    { id: 6, name: "Sneha Verma", department: "Operations" },
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

  // Chart Data
  const attendanceDistribution = [
    { name: "Present", value: 65, color: "#10B981" },
    { name: "Absent", value: 8, color: "#EF4444" },
    { name: "Late", value: 12, color: "#F59E0B" },
    { name: "Leave", value: 10, color: "#3B82F6" },
    { name: "Weekend", value: 5, color: "#8B5CF6" },
  ];

  const departmentPerformance = [
    { department: "IT", attendance: 95, late: 3, absent: 2 },
    { department: "HR", attendance: 98, late: 1, absent: 1 },
    { department: "Finance", attendance: 92, late: 4, absent: 4 },
    { department: "Marketing", attendance: 90, late: 5, absent: 5 },
    { department: "Operations", attendance: 88, late: 6, absent: 6 },
  ];

  const weeklyTrendData = [
    { week: "Week 1", present: 85, absent: 8, late: 7 },
    { week: "Week 2", present: 88, absent: 6, late: 6 },
    { week: "Week 3", present: 92, absent: 4, late: 4 },
    { week: "Week 4", present: 90, absent: 5, late: 5 },
  ];

  const dailyPatternData = [
    { time: "9 AM", arrivals: 45 },
    { time: "10 AM", arrivals: 85 },
    { time: "11 AM", arrivals: 92 },
    { time: "12 PM", arrivals: 88 },
    { time: "1 PM", arrivals: 82 },
    { time: "2 PM", arrivals: 90 },
    { time: "3 PM", arrivals: 88 },
    { time: "4 PM", arrivals: 85 },
    { time: "5 PM", arrivals: 78 },
  ];

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'present': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'absent': return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      case 'leave': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'weekend': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
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
      lateArrivals: Math.floor(Math.random() * 20) + 5,
      averageHours: "7.8",
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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`${themeClasses.bg.primary} p-3 border ${themeClasses.border.primary} rounded-lg shadow-lg`}>
          <p className={themeClasses.text.primary}>{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div>
            <h1 className={`text-3xl font-bold ${themeClasses.text.primary}`}>
              Monthly Attendance Analytics
            </h1>
            <p className={themeClasses.text.secondary}>
              Comprehensive monthly attendance analysis with visual insights.
            </p>
          </div>
          
          <div className="flex gap-3">
            <button className={`flex items-center gap-2 px-4 py-2.5 ${themeClasses.bg.secondary} border ${themeClasses.border.primary} ${themeClasses.text.primary} rounded-lg hover:${darkMode ? 'bg-gray-700' : 'bg-gray-300'} font-medium`}>
              <FiDownload className="w-4 h-4" />
              Export Excel
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Attendance Distribution Pie Chart */}
        <div className={`${themeClasses.bg.secondary} rounded-xl p-6 border ${themeClasses.border.primary}`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className={`text-lg font-semibold ${themeClasses.text.primary}`}>Attendance Distribution</h3>
              <p className={themeClasses.text.secondary}>Current month breakdown</p>
            </div>
            <FiPieChart className="w-6 h-6 text-purple-400" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attendanceDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {attendanceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Performance Bar Chart */}
        <div className={`${themeClasses.bg.secondary} rounded-xl p-6 border ${themeClasses.border.primary}`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className={`text-lg font-semibold ${themeClasses.text.primary}`}>Department Performance</h3>
              <p className={themeClasses.text.secondary}>Attendance rate by department</p>
            </div>
            <FiTrendingUp className="w-6 h-6 text-purple-400" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                <XAxis dataKey="department" stroke={darkMode ? "#9CA3AF" : "#4b5563"} />
                <YAxis stroke={darkMode ? "#9CA3AF" : "#4b5563"} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="attendance" name="Attendance %" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="late" name="Late Arrivals %" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Second Row Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Weekly Trends */}
        <div className={`${themeClasses.bg.secondary} rounded-xl p-6 border ${themeClasses.border.primary}`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className={`text-lg font-semibold ${themeClasses.text.primary}`}>Weekly Trends</h3>
              <p className={themeClasses.text.secondary}>Attendance patterns by week</p>
            </div>
            <FiTrendingUp className="w-6 h-6 text-purple-400" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                <XAxis dataKey="week" stroke={darkMode ? "#9CA3AF" : "#4b5563"} />
                <YAxis stroke={darkMode ? "#9CA3AF" : "#4b5563"} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area type="monotone" dataKey="present" name="Present %" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                <Area type="monotone" dataKey="absent" name="Absent %" stroke="#EF4444" fill="#EF4444" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Arrival Pattern */}
        <div className={`${themeClasses.bg.secondary} rounded-xl p-6 border ${themeClasses.border.primary}`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className={`text-lg font-semibold ${themeClasses.text.primary}`}>Daily Arrival Pattern</h3>
              <p className={themeClasses.text.secondary}>Employee check-in times</p>
            </div>
            <FiClock className="w-6 h-6 text-purple-400" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyPatternData}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                <XAxis dataKey="time" stroke={darkMode ? "#9CA3AF" : "#4b5563"} />
                <YAxis stroke={darkMode ? "#9CA3AF" : "#4b5563"} />
                <Tooltip />
                <Bar dataKey="arrivals" name="Arrivals %" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Month Navigation */}
      <div className={`${themeClasses.bg.secondary} rounded-xl border ${themeClasses.border.primary} p-6 mb-8`}>
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          {/* Month Selector */}
          <div className="flex items-center gap-4">
            <button
              onClick={prevMonth}
              className={`p-2 rounded-lg hover:${darkMode ? 'bg-gray-700' : 'bg-gray-300'} transition-colors`}
            >
              <FiChevronLeft className="w-5 h-5 text-white" />
            </button>
            
            <div className="text-center">
              <h2 className={`text-2xl font-bold ${themeClasses.text.primary}`}>
                {currentMonthName} {currentYear}
              </h2>
              <p className={themeClasses.text.primary}>Attendance Overview</p>
            </div>
            
            <button
              onClick={nextMonth}
              className={`p-2 rounded-lg hover:${darkMode ? 'bg-gray-700' : 'bg-gray-300'} transition-colors`}
            >
              <FiChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Filters */}
          <div className="flex gap-4">
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className={`px-4 py-2.5 ${themeClasses.input.bg} border ${themeClasses.input.border} ${themeClasses.input.text} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
            >
              <option value="all" className={darkMode ? 'bg-gray-900' : 'bg-white'}>All Employees</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id} className={darkMode ? 'bg-gray-900' : 'bg-white'}>{emp.name}</option>
              ))}
            </select>

            <div className={`${themeClasses.bg.tertiary} p-1 rounded-lg border ${themeClasses.border.primary}`}>
              <button
                onClick={() => setViewMode("calendar")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  viewMode === "calendar"
                    ? "bg-purple-600 text-white"
                    : `${themeClasses.text.secondary} hover:${themeClasses.text.primary}`
                }`}
              >
                Calendar View
              </button>
              <button
                onClick={() => setViewMode("summary")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  viewMode === "summary"
                    ? "bg-purple-600 text-white"
                    : `${themeClasses.text.secondary} hover:${themeClasses.text.primary}`
                }`}
              >
                Summary View
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-6">
          <div className={`${themeClasses.bg.tertiary} p-4 rounded-lg border ${themeClasses.border.primary}`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <FiCalendar className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className={`text-sm ${themeClasses.text.secondary}`}>Working Days</p>
                <p className={`text-xl font-bold ${themeClasses.text.primary}`}>{stats.workingDays}</p>
              </div>
            </div>
          </div>
          <div className="bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <FiTrendingUp className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-emerald-300">Present Days</p>
                <p className="text-xl font-bold text-emerald-300">{stats.presentDays}</p>
              </div>
            </div>
          </div>
          <div className="bg-rose-500/10 p-4 rounded-lg border border-rose-500/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-rose-500/20 flex items-center justify-center">
                <FiTrendingDown className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <p className="text-sm text-rose-300">Absent Days</p>
                <p className="text-xl font-bold text-rose-300">{stats.absentDays}</p>
              </div>
            </div>
          </div>
          <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <FiUsers className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-purple-300">Leave Days</p>
                <p className="text-xl font-bold text-purple-300">{stats.leaveDays}</p>
              </div>
            </div>
          </div>
          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <FiClock className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-amber-300">Late Arrivals</p>
                <p className="text-xl font-bold text-amber-300">{stats.lateArrivals}</p>
              </div>
            </div>
          </div>
          <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                <FiClock className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-sm text-cyan-300">Avg Hours</p>
                <p className="text-xl font-bold text-cyan-300">{stats.averageHours}h</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Table */}
      {viewMode === "calendar" && (
        <div className={`${themeClasses.bg.secondary} rounded-xl p-1 border ${themeClasses.border.primary} mb-8`}>
          <div className="overflow-x-auto rounded-lg">
            <table className="w-full">
              <thead className={themeClasses.bg.tertiary}>
                <tr>
                  <th className={`p-4 text-left text-sm font-semibold ${themeClasses.text.secondary} border-b ${themeClasses.border.primary}`}>Employee</th>
                  {attendanceData.map((day) => (
                    <th key={day.day} className={`p-4 text-center border-b ${themeClasses.border.primary}`}>
                      <div className={`text-sm font-medium ${day.isWeekend ? 'text-gray-500' : themeClasses.text.secondary}`}>
                        {day.day}
                      </div>
                      <div className={`text-xs ${day.isWeekend ? 'text-gray-500' : themeClasses.text.muted}`}>
                        {day.isWeekend ? 'Weekend' : 'Weekday'}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {employees.map(emp => (
                  <tr key={emp.id} className={`hover:${themeClasses.bg.tertiary}/50 transition-colors border-b ${themeClasses.border.primary}`}>
                    <td className={`p-4 sticky left-0 ${themeClasses.bg.tertiary}`}>
                      <div className="min-w-[200px]">
                        <p className={`font-medium ${themeClasses.text.primary}`}>{emp.name}</p>
                        <p className={`text-sm ${themeClasses.text.secondary}`}>{emp.department}</p>
                      </div>
                    </td>
                    {attendanceData.map(day => {
                      const employeeDay = day.employees.find(e => e.id === emp.id);
                      return (
                        <td key={day.day} className="p-2 text-center">
                          <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm font-medium border ${
                            getStatusColor(employeeDay?.status || '')
                          }`}>
                            {getStatusIcon(employeeDay?.status || '')}
                          </div>
                          {employeeDay?.status === 'present' && !day.isWeekend && (
                            <div className="text-xs text-gray-400 mt-1">
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
        <div className={`${themeClasses.bg.secondary} rounded-xl p-1 border ${themeClasses.border.primary} mb-8`}>
          <div className="overflow-x-auto rounded-lg">
            <table className="w-full">
              <thead className={themeClasses.bg.tertiary}>
                <tr>
                  <th className={`p-4 text-left text-sm font-semibold ${themeClasses.text.secondary}`}>Employee</th>
                  <th className={`p-4 text-left text-sm font-semibold ${themeClasses.text.secondary}`}>Department</th>
                  <th className={`p-4 text-left text-sm font-semibold ${themeClasses.text.secondary}`}>Present</th>
                  <th className={`p-4 text-left text-sm font-semibold ${themeClasses.text.secondary}`}>Absent</th>
                  <th className={`p-4 text-left text-sm font-semibold ${themeClasses.text.secondary}`}>Leave</th>
                  <th className={`p-4 text-left text-sm font-semibold ${themeClasses.text.secondary}`}>Late Days</th>
                  <th className={`p-4 text-left text-sm font-semibold ${themeClasses.text.secondary}`}>Attendance %</th>
                  <th className={`p-4 text-left text-sm font-semibold ${themeClasses.text.secondary}`}>Actions</th>
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
                    <tr key={emp.id} className={`hover:${themeClasses.bg.tertiary}/50 transition-colors border-b ${themeClasses.border.primary}`}>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-purple-400 flex items-center justify-center text-white font-bold">
                            {emp.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className={`font-medium ${themeClasses.text.primary}`}>{emp.name}</p>
                            <p className={`text-sm ${themeClasses.text.secondary}`}>EMP{emp.id.toString().padStart(3, '0')}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 ${themeClasses.bg.tertiary} ${themeClasses.text.secondary} rounded-full text-sm border ${themeClasses.border.primary}`}>
                          {emp.department}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-emerald-400">{presentCount}</span>
                          <span className={`text-sm ${themeClasses.text.secondary}`}>days</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-rose-400">{absentCount}</span>
                          <span className={`text-sm ${themeClasses.text.secondary}`}>days</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-purple-400">{leaveCount}</span>
                          <span className={`text-sm ${themeClasses.text.secondary}`}>days</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-xl font-bold text-amber-400">3</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1">
                            <div className={`h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'} rounded-full overflow-hidden`}>
                              <div 
                                className={`h-full rounded-full ${
                                  attendancePercentage >= 90 ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' :
                                  attendancePercentage >= 75 ? 'bg-gradient-to-r from-amber-500 to-amber-400' : 'bg-gradient-to-r from-rose-500 to-rose-400'
                                }`}
                                style={{ width: `${attendancePercentage}%` }}
                              ></div>
                            </div>
                          </div>
                          <span className={`text-lg font-bold ${
                            attendancePercentage >= 90 ? 'text-emerald-400' :
                            attendancePercentage >= 75 ? 'text-amber-400' : 'text-rose-400'
                          }`}>
                            {attendancePercentage}%
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <button className="text-purple-400 hover:text-purple-300 font-medium text-sm hover:underline">
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
      <div className={`${themeClasses.bg.secondary} rounded-xl p-6 border ${themeClasses.border.primary} mb-8`}>
        <h3 className={`text-sm font-semibold ${themeClasses.text.primary} mb-4`}>Attendance Legend</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">✓</div>
            <span className={`text-sm ${themeClasses.text.primary}`}>Present</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center">✗</div>
            <span className={`text-sm ${themeClasses.text.primary}`}>Absent</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">L</div>
            <span className={`text-sm ${themeClasses.text.primary}`}>Leave</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-500/20 text-gray-400 border border-gray-500/30 flex items-center justify-center">W</div>
            <span className={`text-sm ${themeClasses.text.primary}`}>Weekend/Holiday</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">!</div>
            <span className={`text-sm ${themeClasses.text.primary}`}>Late Arrival</span>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className={`p-4 rounded-lg border ${themeClasses.border.primary} ${themeClasses.bg.tertiary} hover:${darkMode ? 'bg-gray-800' : 'bg-gray-200'} transition-colors text-left`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
              <FiDownload className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className={`font-medium ${themeClasses.text.primary}`}>Export Monthly Report</p>
              <p className={themeClasses.text.secondary}>PDF format</p>
            </div>
          </div>
        </button>
        
        <button className={`p-4 rounded-lg border ${themeClasses.border.primary} ${themeClasses.bg.tertiary} hover:${darkMode ? 'bg-gray-800' : 'bg-gray-200'} transition-colors text-left`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
              <FiDownload className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className={`font-medium ${themeClasses.text.primary}`}>Export Excel Sheet</p>
              <p className={themeClasses.text.secondary}>CSV/XLSX format</p>
            </div>
          </div>
        </button>
        
        <button className={`p-4 rounded-lg border ${themeClasses.border.primary} ${themeClasses.bg.tertiary} hover:${darkMode ? 'bg-gray-800' : 'bg-gray-200'} transition-colors text-left`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
              <FiCalendar className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className={`font-medium ${themeClasses.text.primary}`}>Generate Payroll Data</p>
              <p className={themeClasses.text.secondary}>Based on attendance</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default MonthlyAttendance;