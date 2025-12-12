import React, { useState, useEffect } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import { FiSave, FiArrowLeft, FiTrash2, FiUsers, FiMail, FiUser, FiCalendar } from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { Link, useParams, useNavigate } from "react-router-dom";

const EditDepartment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "Information Technology",
    email: "it@company.com",
    description: "Handles all technical operations, software development, infrastructure management, and IT support across the organization.",
    departmentHead: "1",
    status: "Active",
    colorTag: "blue",
    notes: "Ensure all developers complete timesheets daily.\nWeekly team sync every Monday 10 AM.\nMonthly tech review on last Friday.\nMaintain documentation in Confluence.",
    budget: "$1,200,000",
    location: "Floor 3, Tech Wing",
    establishedDate: "2024-01-10",
  });

  const [errors, setErrors] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  // Mock initial data fetch
  useEffect(() => {
    // In real app, fetch department data by ID
    console.log("Fetching department data for ID:", id);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setHasChanges(true);
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Department name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.departmentHead) newErrors.departmentHead = "Department head is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        console.log("Updated department data:", formData);
        setIsSubmitting(false);
        setHasChanges(false);
        // Show success message
        alert("Department updated successfully!");
      }, 1500);
    } else {
      setErrors(validationErrors);
    }
  };

  const handleDelete = () => {
    // Simulate delete API call
    setTimeout(() => {
      console.log("Deleting department:", id);
      setShowDeleteModal(false);
      navigate("/admin/departments");
      alert("Department deleted successfully!");
    }, 1000);
  };

  const colorOptions = [
    { key: "blue", color: "bg-blue-500", label: "Blue" },
    { key: "green", color: "bg-green-500", label: "Green" },
    { key: "pink", color: "bg-pink-500", label: "Pink" },
    { key: "yellow", color: "bg-yellow-500", label: "Yellow" },
    { key: "indigo", color: "bg-indigo-500", label: "Indigo" },
    { key: "purple", color: "bg-purple-500", label: "Purple" },
  ];

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/departments"
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
          >
            <FiArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Edit Department</h1>
            <p className="text-slate-600">
              Update department details, policies, leadership, and settings.
            </p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 font-medium"
          >
            <FiTrash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-lg ${
              colorOptions.find(c => c.key === formData.colorTag)?.color
            } flex items-center justify-center`}>
              <HiOutlineOfficeBuilding className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Edit Department: {formData.name}</h2>
              <p className="text-sm text-slate-600">Department ID: DEP-{id}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Department Name */}
              <div>
                <label className="block text-sm font-medium text-slate-800 mb-2">
                  <span className="flex items-center gap-2">
                    <HiOutlineOfficeBuilding className="w-4 h-4" />
                    Department Name
                  </span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${
                    errors.name ? "border-red-300" : "border-slate-300"
                  } rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Department Email */}
              <div>
                <label className="block text-sm font-medium text-slate-800 mb-2">
                  <span className="flex items-center gap-2">
                    <FiMail className="w-4 h-4" />
                    Department Email
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${
                    errors.email ? "border-red-300" : "border-slate-300"
                  } rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Department Head */}
              <div>
                <label className="block text-sm font-medium text-slate-800 mb-2">
                  <span className="flex items-center gap-2">
                    <FiUser className="w-4 h-4" />
                    Department Head
                  </span>
                </label>
                <select
                  name="departmentHead"
                  value={formData.departmentHead}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${
                    errors.departmentHead ? "border-red-300" : "border-slate-300"
                  } rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white`}
                >
                  <option value="1">Rahul Sharma - Senior Manager</option>
                  <option value="2">Simran Kaur - HR Director</option>
                  <option value="3">Ankit Mehta - Finance Lead</option>
                  <option value="4">Priya Patel - Marketing Head</option>
                </select>
                {errors.departmentHead && (
                  <p className="mt-1 text-sm text-red-600">{errors.departmentHead}</p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-slate-800 mb-2">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Location
                  </span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-slate-800 mb-2">
                  <span className="flex items-center gap-2">
                    <FiCalendar className="w-4 h-4" />
                    Status
                  </span>
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="Active"
                      checked={formData.status === "Active"}
                      onChange={handleChange}
                      className="text-blue-500 focus:ring-blue-200"
                    />
                    <span className="px-4 py-2 rounded-lg border border-green-200 bg-green-50 text-green-700 font-medium">
                      Active
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="Inactive"
                      checked={formData.status === "Inactive"}
                      onChange={handleChange}
                      className="text-blue-500 focus:ring-blue-200"
                    />
                    <span className="px-4 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-medium">
                      Inactive
                    </span>
                  </label>
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-medium text-slate-800 mb-2">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Annual Budget
                  </span>
                </label>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>

              {/* Established Date */}
              <div>
                <label className="block text-sm font-medium text-slate-800 mb-2">
                  <span className="flex items-center gap-2">
                    <FiCalendar className="w-4 h-4" />
                    Established Date
                  </span>
                </label>
                <input
                  type="date"
                  name="establishedDate"
                  value={formData.establishedDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>

              {/* Color Tag */}
              <div>
                <label className="block text-sm font-medium text-slate-800 mb-3">
                  Department Color
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {colorOptions.map((c) => (
                    <label
                      key={c.key}
                      className={`flex items-center justify-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                        formData.colorTag === c.key
                          ? "border-blue-500 bg-blue-50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="colorTag"
                        value={c.key}
                        checked={formData.colorTag === c.key}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <span className={`w-6 h-6 rounded-full ${c.color}`}></span>
                      <span className="text-sm font-medium text-slate-800">{c.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Full Width Fields */}
            <div className="lg:col-span-2">
              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-slate-800 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${
                    errors.description ? "border-red-300" : "border-slate-300"
                  } rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all`}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>

              {/* Internal Notes */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-slate-800 mb-2">
                  Internal Notes
                </label>
                <textarea
                  name="notes"
                  rows="3"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between items-center">
            <div>
              {hasChanges && (
                <span className="text-sm text-amber-600 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.23 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  You have unsaved changes
                </span>
              )}
            </div>
            
            <div className="flex gap-3">
              <Link
                to="/admin/departments"
                className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting || !hasChanges}
                className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg shadow hover:shadow-md font-medium transition-all ${
                  isSubmitting || !hasChanges ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <FiSave className="w-5 h-5" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full">
            <div className="p-6">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                <FiTrash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 text-center mb-2">
                Delete Department?
              </h3>
              <p className="text-slate-600 text-center mb-6">
                Are you sure you want to delete the "{formData.name}" department? This action cannot be undone and will remove all associated data.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium"
                >
                  Delete Department
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Department Stats Preview */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Department Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Employees</p>
                <h4 className="text-2xl font-bold text-slate-800 mt-2">24</h4>
              </div>
              <FiUsers className="w-8 h-8 text-slate-400" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Active Projects</p>
                <h4 className="text-2xl font-bold text-slate-800 mt-2">8</h4>
              </div>
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Attendance Rate</p>
                <h4 className="text-2xl font-bold text-slate-800 mt-2">95%</h4>
              </div>
              <FiCalendar className="w-8 h-8 text-slate-400" />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditDepartment;