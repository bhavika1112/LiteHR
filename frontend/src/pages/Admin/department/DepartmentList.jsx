import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiUsers, FiEdit2, FiPlus, FiTrendingUp, FiActivity, FiSearch } from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { useTheme, getThemeClasses } from "../../../contexts/ThemeContext";

const DepartmentList = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [search, setSearch] = useState("");
  const darkMode = useTheme();
  const themeClasses = getThemeClasses(darkMode);

  const departments = [
    {
      id: 1,
      name: "Information Technology",
      head: "Rahul Sharma",
      employees: 24,
      colorTag: "blue",
      attendance: 95,
      productivity: 88,
      budget: "₹1.2L",
      projects: 8,
      growth: "+12%",
    },
    {
      id: 2,
      name: "Human Resources",
      head: "Simran Kaur",
      employees: 8,
      colorTag: "pink",
      attendance: 98,
      productivity: 92,
      budget: "₹4.50L",
      projects: 3,
      growth: "+5%",
    },
    {
      id: 3,
      name: "Finance & Accounting",
      head: "Ankit Mehta",
      employees: 12,
      colorTag: "yellow",
      attendance: 92,
      productivity: 85,
      budget: "₹8.50L",
      projects: 5,
      growth: "+8%",
    },
    {
      id: 4,
      name: "Marketing",
      head: "Priya Patel",
      employees: 15,
      colorTag: "green",
      attendance: 90,
      productivity: 87,
      budget: "₹7.50L",
      projects: 7,
      growth: "+15%",
    },
    {
      id: 5,
      name: "Operations",
      head: "Aman Verma",
      employees: 18,
      colorTag: "indigo",
      attendance: 94,
      productivity: 89,
      budget: "₹9.50L",
      projects: 6,
      growth: "+9%",
    },
    {
      id: 6,
      name: "Research & Development",
      head: "Ananya Mehta",
      employees: 10,
      colorTag: "purple",
      attendance: 91,
      productivity: 90,
      budget: "₹15.3L",
      projects: 4,
      growth: "+18%",
    },
  ];

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(search.toLowerCase()) ||
    dept.head.toLowerCase().includes(search.toLowerCase())
  );

  const colorBadge = {
    blue: { 
      gradient: "from-blue-500 to-cyan-500",
      light: darkMode ? "bg-blue-500/10" : "bg-blue-500/20",
      text: "text-white",
      border: darkMode ? "border-blue-500/30" : "border-blue-500/40"
    },
    green: { 
      gradient: "from-emerald-500 to-green-500",
      light: darkMode ? "bg-emerald-500/10" : "bg-emerald-500/20",
      text: "text-white",
      border: darkMode ? "border-emerald-500/30" : "border-emerald-500/40"
    },
    pink: { 
      gradient: "from-pink-500 to-rose-500",
      light: darkMode ? "bg-pink-500/10" : "bg-pink-500/20",
      text: "text-white",
      border: darkMode ? "border-pink-500/30" : "border-pink-500/40"
    },
    yellow: { 
      gradient: "from-amber-500 to-orange-500",
      light: darkMode ? "bg-amber-500/10" : "bg-amber-500/20",
      text: "text-white",
      border: darkMode ? "border-amber-500/30" : "border-amber-500/40"
    },
    indigo: { 
      gradient: "from-indigo-500 to-purple-500",
      light: darkMode ? "bg-indigo-500/10" : "bg-indigo-500/20",
      text: "text-white",
      border: darkMode ? "border-indigo-500/30" : "border-indigo-500/40"
    },
    purple: { 
      gradient: "from-purple-500 to-violet-500",
      light: darkMode ? "bg-purple-500/10" : "bg-purple-500/20",
      text: "text-white",
      border: darkMode ? "border-purple-500/30" : "border-purple-500/40"
    },
  };

  return (
    <div className="w-full">
      {/* Enhanced Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className={`text-3xl font-bold ${themeClasses.text.primary} mb-2`}>
              Departments
            </h1>
            <p className={themeClasses.text.muted}>
              Manage organizational departments, teams, and performance metrics.
            </p>
          </div>
          <Link
            to="/admin/departments/add"
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3.5 rounded-lg font-medium transition-colors mt-4 lg:mt-0"
          >
            <FiPlus className="w-5 h-5" />
            Add New Department
          </Link>
        </div>
      </div>

      {/* Enhanced Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className={`rounded-xl p-5 border ${themeClasses.border.primary} ${themeClasses.bg.secondary}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${themeClasses.text.muted}`}>Total Departments</p>
              <h3 className={`text-2xl font-bold ${themeClasses.text.primary} mt-1`}>{departments.length}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
              <HiOutlineOfficeBuilding className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className={`rounded-xl p-5 border ${themeClasses.border.primary} ${themeClasses.bg.secondary}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${themeClasses.text.muted}`}>Total Employees</p>
              <h3 className={`text-2xl font-bold ${themeClasses.text.primary} mt-1`}>
                {departments.reduce((sum, dept) => sum + dept.employees, 0)}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center">
              <FiUsers className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className={`rounded-xl p-5 border ${themeClasses.border.primary} ${themeClasses.bg.secondary}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${themeClasses.text.muted}`}>Avg Attendance</p>
              <h3 className={`text-2xl font-bold ${themeClasses.text.primary} mt-1`}>
                {Math.round(departments.reduce((sum, dept) => sum + dept.attendance, 0) / departments.length)}%
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
              <FiActivity className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className={`rounded-xl p-5 border ${themeClasses.border.primary} ${themeClasses.bg.secondary}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${themeClasses.text.muted}`}>Active Projects</p>
              <h3 className={`text-2xl font-bold ${themeClasses.text.primary} mt-1`}>
                {departments.reduce((sum, dept) => sum + dept.projects, 0)}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <FiTrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Search and Controls */}
      <div className={`rounded-xl p-6 border ${themeClasses.border.primary} ${themeClasses.bg.secondary} mb-6`}>
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1">
            <label className={`block text-sm font-medium ${themeClasses.text.primary} mb-2`}>
              Search Departments
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name or department head..."
                className={`w-full pl-12 pr-4 py-2.5 ${themeClasses.input.bg} border ${themeClasses.input.border} ${themeClasses.input.text} rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 placeholder-gray-500`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex items-end gap-4">
            <div>
              <label className={`block text-sm font-medium ${themeClasses.text.primary} mb-2`}>
                View Mode
              </label>
              <div className={`flex gap-2 ${themeClasses.bg.tertiary} p-1 rounded-lg border ${themeClasses.border.primary}`}>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    viewMode === "grid" 
                      ? "bg-purple-600 text-white" 
                      : `${themeClasses.text.muted} hover:${themeClasses.text.primary} ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"}`
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    viewMode === "list" 
                      ? "bg-purple-600 text-white" 
                      : `${themeClasses.text.muted} hover:${themeClasses.text.primary} ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"}`
                  }`}
                >
                  List
                </button>
              </div>
            </div>
            
            {/* Sort Dropdown */}
            <div>
              <label className={`block text-sm font-medium ${themeClasses.text.primary} mb-2`}>
                Sort By
              </label>
              <select className={`w-full px-4 py-2.5 ${themeClasses.input.bg} border ${themeClasses.input.border} ${themeClasses.input.text} rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20`}>
                <option className={`${themeClasses.input.bg} ${themeClasses.input.text}`}>Name (A-Z)</option>
                <option className={`${themeClasses.input.bg} ${themeClasses.input.text}`}>Employees (High-Low)</option>
                <option className={`${themeClasses.input.bg} ${themeClasses.input.text}`}>Attendance (High-Low)</option>
                <option className={`${themeClasses.input.bg} ${themeClasses.input.text}`}>Budget (High-Low)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {viewMode === "grid" ? (
        /* Enhanced GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredDepartments.map((dept) => {
            const color = colorBadge[dept.colorTag];
            return (
              <div key={dept.id} className={`rounded-xl border ${themeClasses.border.primary} ${themeClasses.bg.secondary} overflow-hidden hover:border-gray-600 transition-colors`}>
                {/* Department Header */}
                <div className={`p-6 ${color.light} border-b ${themeClasses.border.primary}`}>
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-4 py-1.5 text-sm rounded-full ${color.light} ${color.text} ${color.border} font-medium`}>
                      {dept.name.split(" ")[0]}
                    </span>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/30">
                      <FiTrendingUp className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm font-medium text-emerald-400">{dept.growth}</span>
                    </div>
                  </div>

                  <h2 className={`text-xl font-bold ${themeClasses.text.primary} mb-3`}>{dept.name}</h2>
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-300"} flex items-center justify-center`}>
                      <FiUsers className="w-4 h-4 text-gray-400" />
                    </div>
                    <span className={`text-sm ${themeClasses.text.muted}`}>
                      <span className={`font-medium ${themeClasses.text.primary}`}>Head:</span> {dept.head}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className={`p-4 rounded-lg border ${themeClasses.border.primary} ${darkMode ? "bg-gray-900/30" : "bg-gray-100/50"} hover:${darkMode ? "bg-gray-900/50" : "bg-gray-200/50"} transition-colors`}>
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                          <FiUsers className="w-4 h-4 text-blue-400" />
                        </div>
                        <span className={`text-xl font-bold ${themeClasses.text.primary}`}>{dept.employees}</span>
                      </div>
                      <p className={`text-xs ${themeClasses.text.muted} text-center`}>Employees</p>
                    </div>
                    <div className={`p-4 rounded-lg border ${themeClasses.border.primary} ${darkMode ? "bg-gray-900/30" : "bg-gray-100/50"} hover:${darkMode ? "bg-gray-900/50" : "bg-gray-200/50"} transition-colors`}>
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <span className={`text-xl font-bold ${themeClasses.text.primary}`}>{dept.attendance}%</span>
                      </div>
                      <p className={`text-xs ${themeClasses.text.muted} text-center`}>Attendance</p>
                    </div>
                  </div>

                  {/* Progress Bars */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className={themeClasses.text.primary}>Productivity</span>
                        <span className="font-medium text-emerald-400">{dept.productivity}%</span>
                      </div>
                      <div className={`h-2 ${darkMode ? "bg-gray-700" : "bg-gray-300"} rounded-full overflow-hidden`}>
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-500"
                          style={{ width: `${dept.productivity}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className={`p-3 rounded-lg border ${themeClasses.border.primary} ${darkMode ? "bg-gray-900/30" : "bg-gray-100/50"}`}>
                      <div className="flex justify-between items-center">
                        <span className={`text-sm ${themeClasses.text.primary}`}>Budget</span>
                        <span className={`font-bold ${themeClasses.text.primary} text-lg`}>{dept.budget}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className={`px-6 py-4 border-t ${themeClasses.border.primary} ${darkMode ? "bg-gray-900/50" : "bg-gray-100/50"} flex justify-between items-center`}>
                  <Link
                    to={`/admin/departments/${dept.id}`}
                    className="text-purple-400 hover:text-purple-300 font-medium text-sm hover:underline flex items-center gap-2"
                  >
                    View Details →
                  </Link>
                  <div className="flex gap-2">
                    <Link
                      to={`/admin/departments/edit/${dept.id}`}
                      className={`p-2 rounded-lg hover:${darkMode ? "bg-gray-700" : "bg-gray-300"} ${themeClasses.text.muted} hover:${themeClasses.text.primary} transition-colors border ${themeClasses.border.primary}`}
                      title="Edit"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Enhanced LIST VIEW */
        <div className={`rounded-xl border ${themeClasses.border.primary} ${themeClasses.bg.secondary} overflow-hidden mb-8`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={darkMode ? "bg-gray-900/50" : "bg-gray-100/50"}>
                <tr>
                  <th className={`p-4 border-b ${themeClasses.border.primary} text-left text-sm font-semibold ${themeClasses.text.muted}`}>
                    Department
                  </th>
                  <th className={`p-4 border-b ${themeClasses.border.primary} text-left text-sm font-semibold ${themeClasses.text.muted}`}>
                    Head
                  </th>
                  <th className={`p-4 border-b ${themeClasses.border.primary} text-left text-sm font-semibold ${themeClasses.text.muted}`}>
                    Employees
                  </th>
                  <th className={`p-4 border-b ${themeClasses.border.primary} text-left text-sm font-semibold ${themeClasses.text.muted}`}>
                    Attendance
                  </th>
                  <th className={`p-4 border-b ${themeClasses.border.primary} text-left text-sm font-semibold ${themeClasses.text.muted}`}>
                    Productivity
                  </th>
                  <th className={`p-4 border-b ${themeClasses.border.primary} text-left text-sm font-semibold ${themeClasses.text.muted}`}>
                    Budget
                  </th>
                  <th className={`p-4 border-b ${themeClasses.border.primary} text-left text-sm font-semibold ${themeClasses.text.muted}`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredDepartments.map((dept) => {
                  const color = colorBadge[dept.colorTag];
                  return (
                    <tr key={dept.id} className={darkMode ? "hover:bg-gray-900/50" : "hover:bg-gray-100/50"} transition-colors>
                      <td className={`p-4 border-b ${themeClasses.border.primary}`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${color.gradient} flex items-center justify-center text-white font-bold`}>
                            {dept.name.charAt(0)}
                          </div>
                          <div>
                            <p className={`font-medium ${themeClasses.text.primary}`}>{dept.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-emerald-400">{dept.growth}</span>
                              <FiTrendingUp className="w-3 h-3 text-emerald-400" />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className={`p-4 border-b ${themeClasses.border.primary}`}>
                        <p className={themeClasses.text.primary}>{dept.head}</p>
                      </td>
                      <td className={`p-4 border-b ${themeClasses.border.primary}`}>
                        <div className="flex items-center gap-2">
                          <FiUsers className="w-4 h-4 text-blue-400" />
                          <span className={`font-medium ${themeClasses.text.primary}`}>{dept.employees}</span>
                        </div>
                      </td>
                      <td className={`p-4 border-b ${themeClasses.border.primary}`}>
                        <div className="flex items-center gap-3">
                          <span className={`font-medium ${themeClasses.text.primary}`}>{dept.attendance}%</span>
                          <div className={`w-16 h-2 ${darkMode ? "bg-gray-700" : "bg-gray-300"} rounded-full overflow-hidden`}>
                            <div
                              className="h-full bg-gradient-to-r from-emerald-500 to-green-500"
                              style={{ width: `${dept.attendance}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className={`p-4 border-b ${themeClasses.border.primary}`}>
                        <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium ${
                          dept.productivity > 90 
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : dept.productivity > 80
                            ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                            : "bg-red-500/20 text-red-400 border border-red-500/30"
                        }`}>
                          {dept.productivity}%
                        </span>
                      </td>
                      <td className={`p-4 border-b ${themeClasses.border.primary}`}>
                        <span className={`font-bold ${themeClasses.text.primary}`}>{dept.budget}</span>
                      </td>
                      <td className={`p-4 border-b ${themeClasses.border.primary}`}>
                        <div className="flex gap-2">
                          <Link
                            to={`/admin/departments/${dept.id}`}
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition-colors"
                          >
                            View
                          </Link>
                          <Link
                            to={`/admin/departments/edit/${dept.id}`}
                            className={`px-4 py-2 border ${themeClasses.border.primary} ${themeClasses.text.muted} text-sm rounded-lg hover:${darkMode ? "bg-gray-700" : "bg-gray-300"} hover:${themeClasses.text.primary} transition-colors`}
                          >
                            Edit
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Enhanced Empty State */}
      {filteredDepartments.length === 0 && (
        <div className={`rounded-xl p-8 border ${themeClasses.border.primary} ${themeClasses.bg.secondary} text-center`}>
          <div className={`w-20 h-20 mx-auto mb-6 rounded-full ${darkMode ? "bg-gray-900" : "bg-gray-200"} flex items-center justify-center border ${themeClasses.border.primary}`}>
            <HiOutlineOfficeBuilding className="w-10 h-10 text-gray-500" />
          </div>
          <h3 className={`text-xl font-bold ${themeClasses.text.primary} mb-3`}>No departments found</h3>
          <p className={themeClasses.text.muted}>Try adjusting your search criteria</p>
          <button
            onClick={() => setSearch("")}
            className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors mt-6"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
};

export default DepartmentList;