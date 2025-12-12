import React, { useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import { Link } from "react-router-dom";
import { FiSearch, FiUsers, FiEdit2, FiUser, FiFilter, FiDownload } from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";

const EmployeeList = () => {
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name-asc");
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const employees = [
    {
      id: 1,
      employeeId: "EMP001",
      name: "Rahul Sharma",
      email: "rahul.sharma@example.com",
      department: "IT",
      role: "Software Engineer",
      status: "Active",
      joinDate: "2024-01-15",
      avatar: "RS",
      performance: 4.5,
    },
    {
      id: 2,
      employeeId: "EMP002",
      name: "Simran Kaur",
      email: "simran.kaur@example.com",
      department: "HR",
      role: "HR Manager",
      status: "Active",
      joinDate: "2023-11-10",
      avatar: "SK",
      performance: 4.8,
    },
    {
      id: 3,
      employeeId: "EMP003",
      name: "Aman Verma",
      email: "aman.verma@example.com",
      department: "Finance",
      role: "Accountant",
      status: "Inactive",
      joinDate: "2022-07-05",
      avatar: "AV",
      performance: 3.9,
    },
    {
      id: 4,
      employeeId: "EMP004",
      name: "Priya Patel",
      email: "priya.patel@example.com",
      department: "IT",
      role: "Frontend Developer",
      status: "Active",
      joinDate: "2024-02-20",
      avatar: "PP",
      performance: 4.2,
    },
  ];

  const filtered = employees
    .filter((emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase().trim()) ||
      emp.employeeId.toLowerCase().includes(search.toLowerCase().trim())
    )
    .filter((emp) =>
      departmentFilter === "All" ? true : emp.department === departmentFilter
    )
    .filter((emp) =>
      statusFilter === "All" ? true : emp.status === statusFilter
    )
    .filter((emp) => (roleFilter === "All" ? true : emp.role === roleFilter))
    .sort((a, b) => {
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      if (sortBy === "joinDate-desc")
        return new Date(b.joinDate) - new Date(a.joinDate);
      if (sortBy === "joinDate-asc")
        return new Date(a.joinDate) - new Date(b.joinDate);
      return 0;
    });

  const uniqueDepartments = ["All", ...new Set(employees.map((e) => e.department))];
  const uniqueRoles = ["All", ...new Set(employees.map((e) => e.role))];

  const toggleSelectEmployee = (id) => {
    setSelectedEmployees(prev =>
      prev.includes(id)
        ? prev.filter(empId => empId !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedEmployees.length === filtered.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(filtered.map(emp => emp.id));
    }
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Employee Management</h1>
          <p className="text-slate-600">
            Search, filter, and manage all employees in the organization.
          </p>
        </div>
        <Link
          to="/admin/employees/add"
          className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-5 py-2.5 rounded-lg shadow hover:shadow-md transition-all duration-300 font-medium flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Employee
        </Link>
      </div>

      {/* FILTER / ACTION BAR */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name or employee ID..."
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <select
                className="appearance-none pl-10 pr-8 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                <option value="All">All Departments</option>
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
              </select>
              <HiOutlineOfficeBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            </div>

            <select
              className="px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <select
              className="px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="All">All Roles</option>
              <option value="Software Engineer">Software Engineer</option>
              <option value="HR Manager">HR Manager</option>
              <option value="Accountant">Accountant</option>
            </select>

            <button className="flex items-center gap-2 px-4 py-3 border border-slate-300 rounded-lg hover:bg-slate-50">
              <FiFilter />
              More Filters
            </button>
          </div>
        </div>

        {/* Batch Actions */}
        {selectedEmployees.length > 0 && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                {selectedEmployees.length}
              </div>
              <span className="text-blue-700 font-medium">
                {selectedEmployees.length} employee{selectedEmployees.length > 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm hover:bg-slate-50">
                Bulk Edit
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600">
                Deactivate
              </button>
            </div>
          </div>
        )}
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-4 border-b border-slate-200 text-left">
                  <input
                    type="checkbox"
                    checked={selectedEmployees.length === filtered.length && filtered.length > 0}
                    onChange={selectAll}
                    className="rounded border-slate-300 text-blue-500 focus:ring-blue-200"
                  />
                </th>
                <th className="p-4 border-b border-slate-200 text-left text-sm font-semibold text-slate-700">
                  Employee
                </th>
                <th className="p-4 border-b border-slate-200 text-left text-sm font-semibold text-slate-700">
                  Department
                </th>
                <th className="p-4 border-b border-slate-200 text-left text-sm font-semibold text-slate-700">
                  Role
                </th>
                <th className="p-4 border-b border-slate-200 text-left text-sm font-semibold text-slate-700">
                  Join Date
                </th>
                <th className="p-4 border-b border-slate-200 text-left text-sm font-semibold text-slate-700">
                  Status
                </th>
                <th className="p-4 border-b border-slate-200 text-left text-sm font-semibold text-slate-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="p-4 border-b border-slate-200">
                    <input
                      type="checkbox"
                      checked={selectedEmployees.includes(emp.id)}
                      onChange={() => toggleSelectEmployee(emp.id)}
                      className="rounded border-slate-300 text-blue-500 focus:ring-blue-200"
                    />
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                        {emp.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{emp.name}</p>
                        <p className="text-sm text-slate-600">{emp.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                            {emp.employeeId}
                          </span>
                          <div className="flex items-center">
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
                            <span className="text-xs text-slate-500 ml-1">{emp.performance}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${
                      emp.department === "IT" ? "bg-blue-100 text-blue-700" :
                      emp.department === "HR" ? "bg-pink-100 text-pink-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {emp.department}
                    </span>
                  </td>
                  <td className="p-4 border-b border-slate-200 text-slate-800">
                    {emp.role}
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    <div>
                      <p className="text-slate-800">{emp.joinDate}</p>
                      <p className="text-xs text-slate-500">2 years ago</p>
                    </div>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium ${
                      emp.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-600"
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${emp.status === "Active" ? 'bg-green-500' : 'bg-slate-400'}`}></span>
                      {emp.status}
                    </span>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    <div className="flex gap-2">
                      <Link
                        to={`/admin/employees/${emp.id}`}
                        className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-800 transition-colors"
                        title="View"
                      >
                        <FiUser className="w-4 h-4" />
                      </Link>
                      <Link
                        to={`/admin/employees/edit/${emp.id}`}
                        className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-800 transition-colors"
                        title="Edit"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </Link>
                      <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-800 transition-colors">
                        <FiDownload className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center">
                    <div className="max-w-md mx-auto">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                        <FiUsers className="w-8 h-8 text-slate-400" />
                      </div>
                      <h3 className="text-lg font-medium text-slate-800 mb-2">No employees found</h3>
                      <p className="text-slate-600 mb-4">Try adjusting your search or filter criteria</p>
                      <button
                        onClick={() => {
                          setSearch("");
                          setDepartmentFilter("All");
                          setStatusFilter("All");
                          setRoleFilter("All");
                        }}
                        className="text-blue-500 hover:text-blue-600 font-medium"
                      >
                        Clear all filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <div className="text-sm text-slate-600">
            Showing <span className="font-medium">1-{filtered.length}</span> of{" "}
            <span className="font-medium">{employees.length}</span> employees
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              1
            </button>
            <button className="px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">
              2
            </button>
            <button className="px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">
              3
            </button>
            <button className="px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EmployeeList;