import React, { useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import { FiCalendar, FiCheck, FiX, FiClock, FiUser, FiDownload, FiFilter } from "react-icons/fi";

const LeaveRequests = () => {
  const [filter, setFilter] = useState("all"); // all, pending, approved, rejected
  const [selectedRequests, setSelectedRequests] = useState([]);

  const leaveRequests = [
    {
      id: 1,
      employee: "Rahul Sharma",
      employeeId: "EMP001",
      department: "IT",
      leaveType: "Earned Leave",
      fromDate: "2024-12-15",
      toDate: "2024-12-18",
      duration: "4 days",
      reason: "Family function",
      status: "pending",
      appliedOn: "2024-12-10",
      avatar: "RS",
    },
    {
      id: 2,
      employee: "Simran Kaur",
      employeeId: "EMP002",
      department: "HR",
      leaveType: "Sick Leave",
      fromDate: "2024-12-12",
      toDate: "2024-12-13",
      duration: "2 days",
      reason: "Medical appointment",
      status: "approved",
      appliedOn: "2024-12-09",
      avatar: "SK",
    },
    {
      id: 3,
      employee: "Aman Verma",
      employeeId: "EMP003",
      department: "Finance",
      leaveType: "Casual Leave",
      fromDate: "2024-12-20",
      toDate: "2024-12-20",
      duration: "1 day",
      reason: "Personal work",
      status: "pending",
      appliedOn: "2024-12-11",
      avatar: "AV",
    },
    {
      id: 4,
      employee: "Priya Patel",
      employeeId: "EMP004",
      department: "IT",
      leaveType: "Earned Leave",
      fromDate: "2024-12-25",
      toDate: "2024-12-31",
      duration: "7 days",
      reason: "Vacation",
      status: "rejected",
      appliedOn: "2024-12-05",
      avatar: "PP",
    },
    {
      id: 5,
      employee: "Ankit Mehta",
      employeeId: "EMP005",
      department: "Marketing",
      leaveType: "Sick Leave",
      fromDate: "2024-12-11",
      toDate: "2024-12-11",
      duration: "1 day",
      reason: "Fever",
      status: "approved",
      appliedOn: "2024-12-10",
      avatar: "AM",
    },
  ];

  const filteredRequests = leaveRequests.filter(req => {
    if (filter === "all") return true;
    return req.status === filter;
  });

  const stats = {
    total: leaveRequests.length,
    pending: leaveRequests.filter(req => req.status === "pending").length,
    approved: leaveRequests.filter(req => req.status === "approved").length,
    rejected: leaveRequests.filter(req => req.status === "rejected").length,
  };

  const toggleSelectRequest = (id) => {
    setSelectedRequests(prev =>
      prev.includes(id)
        ? prev.filter(reqId => reqId !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedRequests.length === filteredRequests.length) {
      setSelectedRequests([]);
    } else {
      setSelectedRequests(filteredRequests.map(req => req.id));
    }
  };

  const approveRequest = (id) => {
    console.log(`Approving request ${id}`);
    // API call would go here
  };

  const rejectRequest = (id) => {
    console.log(`Rejecting request ${id}`);
    // API call would go here
  };

  const bulkApprove = () => {
    console.log(`Bulk approving: ${selectedRequests}`);
    // API call would go here
  };

  const bulkReject = () => {
    console.log(`Bulk rejecting: ${selectedRequests}`);
    // API call would go here
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Leave Requests</h1>
          <p className="text-slate-600">
            Review and manage employee leave requests.
          </p>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium">
            <FiDownload className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Requests</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{stats.total}</h3>
            </div>
            <FiCalendar className="w-8 h-8 text-slate-400" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-5 border border-amber-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-amber-600">Pending</p>
              <h3 className="text-2xl font-bold text-amber-600 mt-1">{stats.pending}</h3>
            </div>
            <FiClock className="w-8 h-8 text-amber-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-5 border border-green-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">Approved</p>
              <h3 className="text-2xl font-bold text-green-600 mt-1">{stats.approved}</h3>
            </div>
            <FiCheck className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-5 border border-red-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600">Rejected</p>
              <h3 className="text-2xl font-bold text-red-600 mt-1">{stats.rejected}</h3>
            </div>
            <FiX className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Status Filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-800 mb-2">
              Filter by Status
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === "all"
                    ? "bg-blue-500 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                All Requests ({stats.total})
              </button>
              <button
                onClick={() => setFilter("pending")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === "pending"
                    ? "bg-amber-500 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Pending ({stats.pending})
              </button>
              <button
                onClick={() => setFilter("approved")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === "approved"
                    ? "bg-green-500 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Approved ({stats.approved})
              </button>
              <button
                onClick={() => setFilter("rejected")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === "rejected"
                    ? "bg-red-500 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Rejected ({stats.rejected})
              </button>
            </div>
          </div>
          
          {/* Date Range */}
          <div className="flex gap-2">
            <div>
              <label className="block text-sm font-medium text-slate-800 mb-2">
                From Date
              </label>
              <input
                type="date"
                className="px-4 py-2 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-800 mb-2">
                To Date
              </label>
              <input
                type="date"
                className="px-4 py-2 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>
        </div>

        {/* Batch Actions */}
        {selectedRequests.length > 0 && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                {selectedRequests.length}
              </div>
              <span className="text-blue-700 font-medium">
                {selectedRequests.length} request{selectedRequests.length > 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={bulkApprove}
                className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600"
              >
                Approve All
              </button>
              <button
                onClick={bulkReject}
                className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
              >
                Reject All
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Leave Requests Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-4 border-b border-slate-200 text-left">
                  <input
                    type="checkbox"
                    checked={selectedRequests.length === filteredRequests.length && filteredRequests.length > 0}
                    onChange={selectAll}
                    className="rounded border-slate-300 text-blue-500 focus:ring-blue-200"
                  />
                </th>
                <th className="p-4 border-b border-slate-200 text-left text-sm font-semibold text-slate-700">
                  Employee
                </th>
                <th className="p-4 border-b border-slate-200 text-left text-sm font-semibold text-slate-700">
                  Leave Type
                </th>
                <th className="p-4 border-b border-slate-200 text-left text-sm font-semibold text-slate-700">
                  Duration
                </th>
                <th className="p-4 border-b border-slate-200 text-left text-sm font-semibold text-slate-700">
                  Reason
                </th>
                <th className="p-4 border-b border-slate-200 text-left text-sm font-semibold text-slate-700">
                  Applied On
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
              {filteredRequests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 border-b border-slate-200">
                    <input
                      type="checkbox"
                      checked={selectedRequests.includes(req.id)}
                      onChange={() => toggleSelectRequest(req.id)}
                      className="rounded border-slate-300 text-blue-500 focus:ring-blue-200"
                    />
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                        {req.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{req.employee}</p>
                        <p className="text-sm text-slate-600">{req.employeeId} • {req.department}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                      req.leaveType === "Earned Leave" ? "bg-green-100 text-green-700" :
                      req.leaveType === "Sick Leave" ? "bg-amber-100 text-amber-700" :
                      "bg-blue-100 text-blue-700"
                    }`}>
                      {req.leaveType}
                    </span>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    <div>
                      <p className="font-medium text-slate-800">{req.duration}</p>
                      <p className="text-sm text-slate-500">{req.fromDate} to {req.toDate}</p>
                    </div>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    <p className="text-slate-700">{req.reason}</p>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    <p className="text-slate-700">{req.appliedOn}</p>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium ${
                      req.status === "pending" ? "bg-amber-100 text-amber-700" :
                      req.status === "approved" ? "bg-green-100 text-green-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${
                        req.status === "pending" ? "bg-amber-500" :
                        req.status === "approved" ? "bg-green-500" : "bg-red-500"
                      }`}></span>
                      {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    {req.status === "pending" ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => approveRequest(req.id)}
                          className="px-3 py-1.5 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => rejectRequest(req.id)}
                          className="px-3 py-1.5 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => req.status === "approved" ? rejectRequest(req.id) : approveRequest(req.id)}
                        className="px-3 py-1.5 border border-slate-300 text-slate-700 text-sm rounded-lg hover:bg-slate-50"
                      >
                        {req.status === "approved" ? "Mark as Rejected" : "Mark as Approved"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredRequests.length === 0 && (
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
              <FiCalendar className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-800 mb-2">No leave requests found</h3>
            <p className="text-slate-600">There are no leave requests matching your filters</p>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leave Balance Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Leave Balance Summary</h3>
          <div className="space-y-4">
            {[
              { type: "Earned Leave", total: 20, used: 8, remaining: 12, color: "bg-green-100 text-green-700" },
              { type: "Sick Leave", total: 12, used: 4, remaining: 8, color: "bg-amber-100 text-amber-700" },
              { type: "Casual Leave", total: 15, used: 6, remaining: 9, color: "bg-blue-100 text-blue-700" },
            ].map((leave, index) => (
              <div key={index} className="p-3 rounded-lg border border-slate-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-slate-800">{leave.type}</span>
                  <span className="font-bold text-slate-800">{leave.remaining} days left</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600 mb-1">
                  <span>Used: {leave.used}</span>
                  <span>Total: {leave.total}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${leave.color.split(' ')[0]}`}
                    style={{ width: `${(leave.used/leave.total)*100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Leaves */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Upcoming Approved Leaves</h3>
            <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
              View All →
            </button>
          </div>
          
          <div className="space-y-3">
            {leaveRequests
              .filter(req => req.status === "approved")
              .slice(0, 3)
              .map((req, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                      {req.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{req.employee}</p>
                      <p className="text-sm text-slate-600">{req.leaveType} • {req.duration}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-800">{req.fromDate}</p>
                    <p className="text-xs text-slate-500">to {req.toDate}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default LeaveRequests;