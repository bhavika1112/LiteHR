import React, { useState } from "react";
import { FiCalendar, FiCheck, FiX, FiClock, FiUser, FiDownload, FiFilter } from "react-icons/fi";
import { useTheme, getThemeClasses } from "../../../contexts/ThemeContext";

const LeaveRequests = () => {
  const [filter, setFilter] = useState("all");
  const [selectedRequests, setSelectedRequests] = useState([]);
  const darkMode = useTheme();
  const themeClasses = getThemeClasses(darkMode);

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
  };

  const rejectRequest = (id) => {
    console.log(`Rejecting request ${id}`);
  };

  const bulkApprove = () => {
    console.log(`Bulk approving: ${selectedRequests}`);
  };

  const bulkReject = () => {
    console.log(`Bulk rejecting: ${selectedRequests}`);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div>
            <h1 className={`text-3xl font-bold ${themeClasses.text.primary}`}>
              Leave Requests
            </h1>
            <p className={themeClasses.text.secondary}>
              Review and manage employee leave requests.
            </p>
          </div>
          
          <div className="flex gap-3">
            <button className={`flex items-center gap-2 px-4 py-2.5 ${themeClasses.bg.secondary} border ${themeClasses.border.primary} ${themeClasses.text.primary} rounded-lg hover:${darkMode ? 'bg-gray-700' : 'bg-gray-300'} font-medium`}>
              <FiDownload className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className={`${themeClasses.bg.secondary} p-5 rounded-xl border ${themeClasses.border.primary}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${themeClasses.text.secondary}`}>Total Requests</p>
              <h3 className={`text-2xl font-bold ${themeClasses.text.primary} mt-1`}>{stats.total}</h3>
            </div>
            <FiCalendar className="w-8 h-8 text-gray-400" />
          </div>
        </div>
        
        <div className={`${themeClasses.bg.secondary} p-5 rounded-xl border ${themeClasses.border.primary}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-amber-300">Pending</p>
              <h3 className="text-2xl font-bold text-amber-300 mt-1">{stats.pending}</h3>
            </div>
            <FiClock className="w-8 h-8 text-amber-400" />
          </div>
        </div>
        
        <div className={`${themeClasses.bg.secondary} p-5 rounded-xl border ${themeClasses.border.primary}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-emerald-300">Approved</p>
              <h3 className="text-2xl font-bold text-emerald-300 mt-1">{stats.approved}</h3>
            </div>
            <FiCheck className="w-8 h-8 text-emerald-400" />
          </div>
        </div>
        
        <div className={`${themeClasses.bg.secondary} p-5 rounded-xl border ${themeClasses.border.primary}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-rose-300">Rejected</p>
              <h3 className="text-2xl font-bold text-rose-300 mt-1">{stats.rejected}</h3>
            </div>
            <FiX className="w-8 h-8 text-rose-400" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={`${themeClasses.bg.secondary} rounded-xl p-6 border ${themeClasses.border.primary} mb-6`}>
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Status Filter */}
          <div className="flex-1">
            <label className={`block text-sm font-medium ${themeClasses.text.primary} mb-2`}>
              Filter by Status
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === "all"
                    ? "bg-purple-600 text-white"
                    : `${themeClasses.bg.tertiary} ${themeClasses.text.secondary} hover:${themeClasses.text.primary} border ${themeClasses.border.primary}`
                }`}
              >
                All Requests ({stats.total})
              </button>
              <button
                onClick={() => setFilter("pending")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === "pending"
                    ? "bg-amber-500 text-white"
                    : `${themeClasses.bg.tertiary} ${themeClasses.text.secondary} hover:${themeClasses.text.primary} border ${themeClasses.border.primary}`
                }`}
              >
                Pending ({stats.pending})
              </button>
              <button
                onClick={() => setFilter("approved")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === "approved"
                    ? "bg-emerald-500 text-white"
                    : `${themeClasses.bg.tertiary} ${themeClasses.text.secondary} hover:${themeClasses.text.primary} border ${themeClasses.border.primary}`
                }`}
              >
                Approved ({stats.approved})
              </button>
              <button
                onClick={() => setFilter("rejected")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === "rejected"
                    ? "bg-rose-500 text-white"
                    : `${themeClasses.bg.tertiary} ${themeClasses.text.secondary} hover:${themeClasses.text.primary} border ${themeClasses.border.primary}`
                }`}
              >
                Rejected ({stats.rejected})
              </button>
            </div>
          </div>
          
          {/* Date Range */}
          <div className="flex gap-2">
            <div>
              <label className={`block text-sm font-medium ${themeClasses.text.primary} mb-2`}>
                From Date
              </label>
              <input
                type="date"
                className={`w-full px-4 py-2 ${themeClasses.input.bg} border ${themeClasses.input.border} ${themeClasses.input.text} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${themeClasses.text.primary} mb-2`}>
                To Date
              </label>
              <input
                type="date"
                className={`w-full px-4 py-2 ${themeClasses.input.bg} border ${themeClasses.input.border} ${themeClasses.input.text} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
              />
            </div>
          </div>
        </div>

        {/* Batch Actions */}
        {selectedRequests.length > 0 && (
          <div className="mt-4 p-4 bg-purple-500/10 rounded-lg border border-purple-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center">
                {selectedRequests.length}
              </div>
              <span className="text-purple-300 font-medium">
                {selectedRequests.length} request{selectedRequests.length > 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={bulkApprove}
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm hover:bg-emerald-600"
              >
                Approve All
              </button>
              <button
                onClick={bulkReject}
                className="px-4 py-2 bg-rose-500 text-white rounded-lg text-sm hover:bg-rose-600"
              >
                Reject All
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Leave Requests Table */}
      <div className={`${themeClasses.bg.secondary} rounded-xl p-1 border ${themeClasses.border.primary} mb-8`}>
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full">
            <thead className={themeClasses.bg.tertiary}>
              <tr>
                <th className={`p-4 border-b ${themeClasses.border.primary} text-left`}>
                  <input
                    type="checkbox"
                    checked={selectedRequests.length === filteredRequests.length && filteredRequests.length > 0}
                    onChange={selectAll}
                    className={`rounded border-${darkMode ? 'gray-600' : 'gray-400'} ${themeClasses.bg.secondary} text-purple-500 focus:ring-purple-500`}
                  />
                </th>
                <th className={`p-4 border-b ${themeClasses.border.primary} text-left text-sm font-semibold ${themeClasses.text.secondary}`}>
                  Employee
                </th>
                <th className={`p-4 border-b ${themeClasses.border.primary} text-left text-sm font-semibold ${themeClasses.text.secondary}`}>
                  Leave Type
                </th>
                <th className={`p-4 border-b ${themeClasses.border.primary} text-left text-sm font-semibold ${themeClasses.text.secondary}`}>
                  Duration
                </th>
                <th className={`p-4 border-b ${themeClasses.border.primary} text-left text-sm font-semibold ${themeClasses.text.secondary}`}>
                  Reason
                </th>
                <th className={`p-4 border-b ${themeClasses.border.primary} text-left text-sm font-semibold ${themeClasses.text.secondary}`}>
                  Applied On
                </th>
                <th className={`p-4 border-b ${themeClasses.border.primary} text-left text-sm font-semibold ${themeClasses.text.secondary}`}>
                  Status
                </th>
                <th className={`p-4 border-b ${themeClasses.border.primary} text-left text-sm font-semibold ${themeClasses.text.secondary}`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((req) => (
                <tr key={req.id} className={`hover:${themeClasses.bg.tertiary}/50 transition-colors`}>
                  <td className={`p-4 border-b ${themeClasses.border.primary}`}>
                    <input
                      type="checkbox"
                      checked={selectedRequests.includes(req.id)}
                      onChange={() => toggleSelectRequest(req.id)}
                      className={`rounded border-${darkMode ? 'gray-600' : 'gray-400'} ${themeClasses.bg.secondary} text-purple-500 focus:ring-purple-500`}
                    />
                  </td>
                  <td className={`p-4 border-b ${themeClasses.border.primary}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-purple-400 flex items-center justify-center text-white font-bold">
                        {req.avatar}
                      </div>
                      <div>
                        <p className={`font-medium ${themeClasses.text.primary}`}>{req.employee}</p>
                        <p className={`text-sm ${themeClasses.text.secondary}`}>{req.employeeId} • {req.department}</p>
                      </div>
                    </div>
                  </td>
                  <td className={`p-4 border-b ${themeClasses.border.primary}`}>
                    <span className={`px-3 py-1.5 rounded-full text-sm font-medium border ${
                      req.leaveType === "Earned Leave" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" :
                      req.leaveType === "Sick Leave" ? "bg-amber-500/20 text-amber-400 border-amber-500/30" :
                      "bg-purple-500/20 text-purple-400 border-purple-500/30"
                    }`}>
                      {req.leaveType}
                    </span>
                  </td>
                  <td className={`p-4 border-b ${themeClasses.border.primary}`}>
                    <div>
                      <p className={`font-medium ${themeClasses.text.primary}`}>{req.duration}</p>
                      <p className={`text-sm ${themeClasses.text.secondary}`}>{req.fromDate} to {req.toDate}</p>
                    </div>
                  </td>
                  <td className={`p-4 border-b ${themeClasses.border.primary}`}>
                    <p className={themeClasses.text.primary}>{req.reason}</p>
                  </td>
                  <td className={`p-4 border-b ${themeClasses.border.primary}`}>
                    <p className={themeClasses.text.primary}>{req.appliedOn}</p>
                  </td>
                  <td className={`p-4 border-b ${themeClasses.border.primary}`}>
                    <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium border ${
                      req.status === "pending" ? "bg-amber-500/20 text-amber-400 border-amber-500/30" :
                      req.status === "approved" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" :
                      "bg-rose-500/20 text-rose-400 border-rose-500/30"
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${
                        req.status === "pending" ? "bg-amber-400" :
                        req.status === "approved" ? "bg-emerald-400" : "bg-rose-400"
                      }`}></span>
                      {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                    </span>
                  </td>
                  <td className={`p-4 border-b ${themeClasses.border.primary}`}>
                    {req.status === "pending" ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => approveRequest(req.id)}
                          className="px-3 py-1.5 bg-emerald-500 text-white text-sm rounded-lg hover:bg-emerald-600"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => rejectRequest(req.id)}
                          className="px-3 py-1.5 bg-rose-500 text-white text-sm rounded-lg hover:bg-rose-600"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => req.status === "approved" ? rejectRequest(req.id) : approveRequest(req.id)}
                        className={`px-3 py-1.5 border ${themeClasses.border.primary} ${themeClasses.text.secondary} text-sm rounded-lg hover:${themeClasses.bg.tertiary}`}
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
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${themeClasses.bg.tertiary} flex items-center justify-center`}>
              <FiCalendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className={`text-lg font-medium ${themeClasses.text.primary} mb-2`}>No leave requests found</h3>
            <p className={themeClasses.text.secondary}>There are no leave requests matching your filters</p>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leave Balance Summary */}
        <div className={`${themeClasses.bg.secondary} rounded-xl p-6 border ${themeClasses.border.primary}`}>
          <h3 className={`text-lg font-semibold ${themeClasses.text.primary} mb-4`}>Leave Balance Summary</h3>
          <div className="space-y-4">
            {[
              { type: "Earned Leave", total: 20, used: 8, remaining: 12 },
              { type: "Sick Leave", total: 12, used: 4, remaining: 8 },
              { type: "Casual Leave", total: 15, used: 6, remaining: 9 },
            ].map((leave, index) => (
              <div key={index} className={`p-3 rounded-lg border ${themeClasses.border.primary}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className={`font-medium ${themeClasses.text.primary}`}>{leave.type}</span>
                  <span className={`font-bold ${themeClasses.text.primary}`}>{leave.remaining} days left</span>
                </div>
                <div className={`flex justify-between text-sm ${themeClasses.text.secondary} mb-1`}>
                  <span>Used: {leave.used}</span>
                  <span>Total: {leave.total}</span>
                </div>
                <div className={`h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'} rounded-full overflow-hidden`}>
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-purple-600 to-purple-400"
                    style={{ width: `${(leave.used/leave.total)*100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Leaves */}
        <div className={`${themeClasses.bg.secondary} rounded-xl p-6 border ${themeClasses.border.primary}`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className={`text-lg font-semibold ${themeClasses.text.primary}`}>Upcoming Approved Leaves</h3>
            <button className="text-purple-400 hover:text-purple-300 text-sm font-medium">
              View All →
            </button>
          </div>
          
          <div className="space-y-3">
            {leaveRequests
              .filter(req => req.status === "approved")
              .slice(0, 3)
              .map((req, index) => (
                <div key={index} className={`flex items-center justify-between p-3 rounded-lg hover:${themeClasses.bg.tertiary}/50 transition-colors`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 flex items-center justify-center text-white font-bold">
                      {req.avatar}
                    </div>
                    <div>
                      <p className={`font-medium ${themeClasses.text.primary}`}>{req.employee}</p>
                      <p className={`text-sm ${themeClasses.text.secondary}`}>{req.leaveType} • {req.duration}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">{req.fromDate}</p>
                    <p className="text-xs text-gray-400">to {req.toDate}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveRequests;