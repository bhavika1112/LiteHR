import React, { useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import { Link } from "react-router-dom";
import { FiUsers, FiEdit2, FiPlus, FiTrendingUp, FiActivity } from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";

const DepartmentList = () => {
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  const [search, setSearch] = useState("");

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
    blue: { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200" },
    green: { bg: "bg-green-100", text: "text-green-700", border: "border-green-200" },
    pink: { bg: "bg-pink-100", text: "text-pink-700", border: "border-pink-200" },
    yellow: { bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-200" },
    indigo: { bg: "bg-indigo-100", text: "text-indigo-700", border: "border-indigo-200" },
    purple: { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-200" },
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Departments</h1>
          <p className="text-slate-600">
            Manage organizational departments, teams, and performance metrics.
          </p>
        </div>
        <Link
          to="/admin/departments/add"
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-5 py-2.5 rounded-lg shadow hover:shadow-md transition-all duration-300 font-medium"
        >
          <FiPlus className="w-5 h-5" />
          Add New Department
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Departments</p>
              <h3 className="text-3xl font-bold text-slate-800 mt-2">{departments.length}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <HiOutlineOfficeBuilding className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Employees</p>
              <h3 className="text-3xl font-bold text-slate-800 mt-2">
                {departments.reduce((sum, dept) => sum + dept.employees, 0)}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <FiUsers className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Avg Attendance</p>
              <h3 className="text-3xl font-bold text-slate-800 mt-2">
                {Math.round(departments.reduce((sum, dept) => sum + dept.attendance, 0) / departments.length)}%
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
              <FiActivity className="w-6 h-6 text-amber-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Active Projects</p>
              <h3 className="text-3xl font-bold text-slate-800 mt-2">
                {departments.reduce((sum, dept) => sum + dept.projects, 0)}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
              <FiTrendingUp className="w-6 h-6 text-indigo-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search departments by name or head..."
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  viewMode === "grid" ? "bg-white text-slate-800 shadow" : "text-slate-600 hover:text-slate-800"
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  viewMode === "list" ? "bg-white text-slate-800 shadow" : "text-slate-600 hover:text-slate-800"
                }`}
              >
                List
              </button>
            </div>
            
            <select className="px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white">
              <option>Sort by Name</option>
              <option>Sort by Employees</option>
              <option>Sort by Attendance</option>
              <option>Sort by Budget</option>
            </select>
          </div>
        </div>
      </div>

      {viewMode === "grid" ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepartments.map((dept) => {
            const color = colorBadge[dept.colorTag];
            return (
              <div
                key={dept.id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 text-xs rounded-full ${color.bg} ${color.text} ${color.border}`}>
                      {dept.name.split(" ")[0]}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-600">{dept.growth}</span>
                      <FiTrendingUp className="w-4 h-4 text-green-500" />
                    </div>
                  </div>

                  <h2 className="text-xl font-semibold text-slate-800 mb-2">{dept.name}</h2>
                  <p className="text-sm text-slate-600 mb-4">
                    <span className="font-medium">Head:</span> {dept.head}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="text-center p-3 rounded-lg border border-slate-200">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <FiUsers className="w-4 h-4 text-slate-400" />
                        <span className="text-lg font-bold text-slate-800">{dept.employees}</span>
                      </div>
                      <p className="text-xs text-slate-600">Employees</p>
                    </div>
                    <div className="text-center p-3 rounded-lg border border-slate-200">
                      <span className="text-lg font-bold text-slate-800">{dept.attendance}%</span>
                      <p className="text-xs text-slate-600">Attendance</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm text-slate-600 mb-1">
                        <span>Productivity</span>
                        <span>{dept.productivity}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
                          style={{ width: `${dept.productivity}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm text-slate-600 mb-1">
                        <span>Budget</span>
                        <span className="font-medium">{dept.budget}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center">
                  <Link
                    to={`/admin/departments/${dept.id}`}
                    className="text-blue-500 hover:text-blue-600 font-medium text-sm"
                  >
                    View Details →
                  </Link>
                  <div className="flex gap-2">
                    <Link
                      to={`/admin/departments/edit/${dept.id}`}
                      className="p-2 rounded-lg hover:bg-slate-200 text-slate-600"
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
        /* LIST VIEW */
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-slate-700">Department</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-700">Head</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-700">Employees</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-700">Attendance</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-700">Productivity</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-700">Budget</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDepartments.map((dept) => {
                const color = colorBadge[dept.colorTag];
                return (
                  <tr key={dept.id} className="hover:bg-slate-50 transition-colors border-t border-slate-200">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <span className={`w-3 h-3 rounded-full ${color.bg}`}></span>
                        <div>
                          <p className="font-medium text-slate-800">{dept.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-slate-600">{dept.growth}</span>
                            <FiTrendingUp className="w-3 h-3 text-green-500" />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-slate-800">{dept.head}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <FiUsers className="w-4 h-4 text-slate-400" />
                        <span className="font-medium">{dept.employees}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{dept.attendance}%</span>
                        <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500"
                            style={{ width: `${dept.attendance}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-medium">{dept.productivity}%</span>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-slate-800">{dept.budget}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Link
                          to={`/admin/departments/${dept.id}`}
                          className="px-3 py-1.5 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600"
                        >
                          View
                        </Link>
                        <Link
                          to={`/admin/departments/edit/${dept.id}`}
                          className="px-3 py-1.5 border border-slate-300 text-slate-700 text-sm rounded-lg hover:bg-slate-50"
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
      )}

      {/* Empty State */}
      {filteredDepartments.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
            <HiOutlineOfficeBuilding className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-800 mb-2">No departments found</h3>
          <p className="text-slate-600 mb-6">Try adjusting your search criteria</p>
          <button
            onClick={() => setSearch("")}
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            Clear search
          </button>
        </div>
      )}
    </AdminLayout>
  );
};

export default DepartmentList;