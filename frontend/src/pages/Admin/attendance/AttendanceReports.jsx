import React, { useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import { FiDownload, FiFilter, FiCalendar, FiTrendingUp, FiTrendingDown, FiUsers, FiClock } from "react-icons/fi";

const AttendanceReports = () => {
  const [reportType, setReportType] = useState("daily");
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [departmentFilter, setDepartmentFilter] = useState("all");

  const departments = [
    { id: "all", name: "All Departments" },
    { id: "it", name: "IT" },
    { id: "hr", name: "HR" },
    { id: "finance", name: "Finance" },
    { id: "marketing", name: "Marketing" },
  ];

  const reportStats = {
    totalEmployees: 24,
    averageAttendance: 92.5,
    totalLateArrivals: 18,
    totalAbsences: 12,
    totalLeaves: 8,
    totalOvertime: 45,
  };

  const trendData = [
    { month: "Jan", attendance: 89, late: 5, absent: 4 },
    { month: "Feb", attendance: 91, late: 3, absent: 3 },
    { month: "Mar", attendance: 90, late: 4, absent: 4 },
    { month: "Apr", attendance: 92, late: 2, absent: 2 },
    { month: "May", attendance: 93, late: 1, absent: 2 },
    { month: "Jun", attendance: 94, late: 1, absent: 1 },
  ];

  const departmentStats = [
    { name: "IT", employees: 8, attendance: 95, late: 2, absent: 1 },
    { name: "HR", employees: 4, attendance: 98, late: 0, absent: 0 },
    { name: "Finance", employees: 6, attendance: 90, late: 3, absent: 2 },
    { name: "Marketing", employees: 6, attendance: 92, late: 1, absent: 1 },
  ];

  const generateReport = () => {
    console.log("Generating report:", {
      reportType,
      dateRange,
      departmentFilter
    });
    // In real app, this would fetch data from API
  };

  const exportReport = (format) => {
    console.log(`Exporting report as ${format}`);
    // In real app, this would generate/download file
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Attendance Reports</h1>
          <p className="text-slate-600">
            Generate and download detailed attendance reports and analytics.
          </p>
        </div>
      </div>

      {/* Report Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Report Type */}
          <div>
            <label className="block text-sm font-medium text-slate-800 mb-2">
              Report Type
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
            >
              <option value="daily">Daily Report</option>
              <option value="weekly">Weekly Summary</option>
              <option value="monthly">Monthly Report</option>
              <option value="quarterly">Quarterly Analysis</option>
              <option value="yearly">Yearly Overview</option>
            </select>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-slate-800 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-800 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Department Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-800 mb-2">
              Department
            </label>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
            >
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>{dept.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={generateReport}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
          >
            <FiFilter className="w-5 h-5" />
            Generate Report
          </button>
          
          <div className="flex gap-2">
            <button
              onClick={() => exportReport("pdf")}
              className="flex items-center gap-2 px-4 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
            >
              <FiDownload className="w-4 h-4" />
              PDF
            </button>
            <button
              onClick={() => exportReport("excel")}
              className="flex items-center gap-2 px-4 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
            >
              <FiDownload className="w-4 h-4" />
              Excel
            </button>
            <button
              onClick={() => exportReport("csv")}
              className="flex items-center gap-2 px-4 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
            >
              <FiDownload className="w-4 h-4" />
              CSV
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Employees</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{reportStats.totalEmployees}</h3>
            </div>
            <FiUsers className="w-8 h-8 text-slate-400" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-green-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">Avg Attendance</p>
              <div className="flex items-baseline gap-1">
                <h3 className="text-2xl font-bold text-green-600 mt-1">{reportStats.averageAttendance}%</h3>
                <FiTrendingUp className="w-4 h-4 text-green-500" />
              </div>
            </div>
            <FiCalendar className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-amber-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-amber-600">Late Arrivals</p>
              <div className="flex items-baseline gap-1">
                <h3 className="text-2xl font-bold text-amber-600 mt-1">{reportStats.totalLateArrivals}</h3>
                <FiTrendingDown className="w-4 h-4 text-amber-500" />
              </div>
            </div>
            <FiClock className="w-8 h-8 text-amber-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-red-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600">Total Absences</p>
              <h3 className="text-2xl font-bold text-red-600 mt-1">{reportStats.totalAbsences}</h3>
            </div>
            <FiCalendar className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-blue-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600">Leave Days</p>
              <h3 className="text-2xl font-bold text-blue-600 mt-1">{reportStats.totalLeaves}</h3>
            </div>
            <FiCalendar className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-indigo-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-indigo-600">Overtime Hours</p>
              <div className="flex items-baseline gap-1">
                <h3 className="text-2xl font-bold text-indigo-600 mt-1">{reportStats.totalOvertime}h</h3>
                <FiTrendingUp className="w-4 h-4 text-indigo-500" />
              </div>
            </div>
            <FiClock className="w-8 h-8 text-indigo-500" />
          </div>
        </div>
      </div>

      {/* Department Performance */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-slate-800 mb-6">Department Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-slate-700">Department</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-700">Employees</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-700">Attendance Rate</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-700">Late Arrivals</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-700">Absences</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-700">Performance</th>
              </tr>
            </thead>
            <tbody>
              {departmentStats.map((dept, index) => (
                <tr key={index} className="hover:bg-slate-50 transition-colors border-t border-slate-200">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                        {dept.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{dept.name} Department</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-slate-800">{dept.employees}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              dept.attendance >= 95 ? 'bg-green-500' :
                              dept.attendance >= 90 ? 'bg-amber-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${dept.attendance}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="font-bold text-slate-800">{dept.attendance}%</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-amber-600">{dept.late}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-red-600">{dept.absent}</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                      dept.attendance >= 95 ? 'bg-green-100 text-green-700' :
                      dept.attendance >= 90 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {dept.attendance >= 95 ? 'Excellent' :
                       dept.attendance >= 90 ? 'Good' : 'Needs Improvement'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Attendance Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-slate-800">Monthly Attendance Trend</h3>
            <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
              View Details →
            </button>
          </div>
          
          <div className="space-y-4">
            {trendData.map((month, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-16 text-sm text-slate-600">{month.month}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-green-500 h-3 rounded-full"
                        style={{ width: `${month.attendance}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-slate-800">{month.attendance}%</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>{month.late} late arrivals</span>
                    <span>{month.absent} absences</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-slate-800">Top Performers</h3>
            <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
              See All →
            </button>
          </div>
          
          <div className="space-y-4">
            {[
              { name: "Simran Kaur", department: "HR", attendance: 100, perfectMonths: 6 },
              { name: "Rahul Sharma", department: "IT", attendance: 98, perfectMonths: 5 },
              { name: "Priya Patel", department: "IT", attendance: 97, perfectMonths: 4 },
              { name: "Ankit Mehta", department: "Marketing", attendance: 96, perfectMonths: 3 },
            ].map((emp, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                    {emp.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{emp.name}</p>
                    <p className="text-sm text-slate-600">{emp.department}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">{emp.attendance}%</p>
                  <p className="text-xs text-slate-500">{emp.perfectMonths} perfect months</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Reports */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Quick Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => setReportType("daily")}
            className="p-4 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <FiCalendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-slate-800">Daily Report</p>
                <p className="text-sm text-slate-600">Today's attendance</p>
              </div>
            </div>
          </button>
          
          <button
            onClick={() => setReportType("weekly")}
            className="p-4 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <FiCalendar className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-slate-800">Weekly Summary</p>
                <p className="text-sm text-slate-600">Last 7 days</p>
              </div>
            </div>
          </button>
          
          <button
            onClick={() => setReportType("monthly")}
            className="p-4 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <FiCalendar className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="font-medium text-slate-800">Monthly Report</p>
                <p className="text-sm text-slate-600">Current month</p>
              </div>
            </div>
          </button>
          
          <button
            onClick={() => exportReport("excel")}
            className="p-4 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <FiDownload className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="font-medium text-slate-800">Export All</p>
                <p className="text-sm text-slate-600">Complete data</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AttendanceReports;