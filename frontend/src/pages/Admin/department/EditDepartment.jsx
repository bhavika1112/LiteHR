import React, { useState, useEffect } from "react";
import { FiSave, FiArrowLeft, FiTrash2, FiUsers, FiMail, FiUser, FiCalendar } from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTheme, getThemeClasses } from "../../../contexts/ThemeContext";

const EditDepartment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const darkMode = useTheme();
  const themeClasses = getThemeClasses(darkMode);

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

  useEffect(() => {
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
      setTimeout(() => {
        console.log("Updated department data:", formData);
        setIsSubmitting(false);
        setHasChanges(false);
        alert("Department updated successfully!");
      }, 1500);
    } else {
      setErrors(validationErrors);
    }
  };

  const handleDelete = () => {
    setTimeout(() => {
      console.log("Deleting department:", id);
      setShowDeleteModal(false);
      navigate("/admin/departments");
      alert("Department deleted successfully!");
    }, 1000);
  };

  const colorOptions = [
    { key: "blue", gradient: "from-blue-500 to-cyan-500", light: darkMode ? "bg-blue-500/20" : "bg-blue-500/20", text: "text-blue-400", border: darkMode ? "border-blue-500/30" : "border-blue-500/40" },
    { key: "green", gradient: "from-emerald-500 to-green-500", light: darkMode ? "bg-emerald-500/20" : "bg-emerald-500/20", text: "text-emerald-400", border: darkMode ? "border-emerald-500/30" : "border-emerald-500/40" },
    { key: "pink", gradient: "from-pink-500 to-rose-500", light: darkMode ? "bg-pink-500/20" : "bg-pink-500/20", text: "text-pink-400", border: darkMode ? "border-pink-500/30" : "border-pink-500/40" },
    { key: "yellow", gradient: "from-amber-500 to-orange-500", light: darkMode ? "bg-amber-500/20" : "bg-amber-500/20", text: "text-amber-400", border: darkMode ? "border-amber-500/30" : "border-amber-500/40" },
    { key: "indigo", gradient: "from-indigo-500 to-purple-500", light: darkMode ? "bg-indigo-500/20" : "bg-indigo-500/20", text: "text-indigo-400", border: darkMode ? "border-indigo-500/30" : "border-indigo-500/40" },
    { key: "purple", gradient: "from-purple-500 to-violet-500", light: darkMode ? "bg-purple-500/20" : "bg-purple-500/20", text: "text-purple-400", border: darkMode ? "border-purple-500/30" : "border-purple-500/40" },
  ];

  return (
    <div className="w-full">
      {/* Enhanced Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex items-center gap-4">
            <Link
              to="/admin/departments"
              className={`p-3 rounded-lg ${themeClasses.bg.secondary} hover:${darkMode ? "bg-gray-700" : "bg-gray-300"} ${themeClasses.text.muted} hover:${themeClasses.text.primary} border ${themeClasses.border.primary} hover:border-purple-500 transition-colors`}
            >
              <FiArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className={`text-3xl font-bold ${themeClasses.text.primary}`}>
                Edit Department
              </h1>
              <p className={themeClasses.text.muted}>
                Update department details, policies, leadership, and settings.
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setShowDeleteModal(true)}
            className={`flex items-center gap-2 px-5 py-3 ${themeClasses.bg.secondary} hover:${darkMode ? "bg-gray-700" : "bg-gray-300"} border border-red-500/30 text-red-400 hover:text-red-300 rounded-lg font-medium transition-colors mt-4 lg:mt-0`}
          >
            <FiTrash2 className="w-5 h-5" />
            Delete Department
          </button>
        </div>
      </div>

      {/* Enhanced Form Container */}
      <div className={`rounded-xl p-6 border ${themeClasses.border.primary} ${themeClasses.bg.secondary} shadow-sm mb-6`}>
        <div className={`p-6 border-b ${themeClasses.border.primary} ${darkMode ? "bg-gray-900/50" : "bg-gray-100/50"}`}>
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${
              colorOptions.find(c => c.key === formData.colorTag)?.gradient
            } flex items-center justify-center`}>
              <HiOutlineOfficeBuilding className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className={`text-xl font-bold ${themeClasses.text.primary}`}>Edit Department: {formData.name}</h2>
              <p className={`text-sm ${themeClasses.text.muted}`}>Department ID: DEP-{id}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Department Name */}
              <div>
                <label className={`block text-sm font-medium ${themeClasses.text.primary} mb-3`}>
                  <span className="flex items-center gap-2">
                    <HiOutlineOfficeBuilding className="w-4 h-4 text-purple-400" />
                    Department Name
                  </span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 ${themeClasses.input.bg} border ${
                    errors.name ? "border-red-500" : themeClasses.input.border
                  } rounded-lg ${themeClasses.input.text} focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all`}
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.23 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Department Email */}
              <div>
                <label className={`block text-sm font-medium ${themeClasses.text.primary} mb-3`}>
                  <span className="flex items-center gap-2">
                    <FiMail className="w-4 h-4 text-purple-400" />
                    Department Email
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 ${themeClasses.input.bg} border ${
                    errors.email ? "border-red-500" : themeClasses.input.border
                  } rounded-lg ${themeClasses.input.text} focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all`}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.23 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Department Head */}
              <div>
                <label className={`block text-sm font-medium ${themeClasses.text.primary} mb-3`}>
                  <span className="flex items-center gap-2">
                    <FiUser className="w-4 h-4 text-purple-400" />
                    Department Head
                  </span>
                </label>
                <select
                  name="departmentHead"
                  value={formData.departmentHead}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 ${themeClasses.input.bg} border ${
                    errors.departmentHead ? "border-red-500" : themeClasses.input.border
                  } rounded-lg ${themeClasses.input.text} focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all`}
                >
                  <option value="1" className={`${themeClasses.input.bg} ${themeClasses.input.text}`}>Rahul Sharma - Senior Manager</option>
                  <option value="2" className={`${themeClasses.input.bg} ${themeClasses.input.text}`}>Simran Kaur - HR Director</option>
                  <option value="3" className={`${themeClasses.input.bg} ${themeClasses.input.text}`}>Ankit Mehta - Finance Lead</option>
                  <option value="4" className={`${themeClasses.input.bg} ${themeClasses.input.text}`}>Priya Patel - Marketing Head</option>
                </select>
                {errors.departmentHead && (
                  <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.23 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    {errors.departmentHead}
                  </p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className={`block text-sm font-medium ${themeClasses.text.primary} mb-3`}>
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  className={`w-full px-4 py-3 ${themeClasses.input.bg} border ${themeClasses.input.border} rounded-lg ${themeClasses.input.text} focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all`}
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Status */}
              <div>
                <label className={`block text-sm font-medium ${themeClasses.text.primary} mb-3`}>
                  <span className="flex items-center gap-2">
                    <FiCalendar className="w-4 h-4 text-purple-400" />
                    Status
                  </span>
                </label>
                <div className="flex gap-4">
                  <label className="flex-1 cursor-pointer group/status">
                    <input
                      type="radio"
                      name="status"
                      value="Active"
                      checked={formData.status === "Active"}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`relative p-4 rounded-lg border text-center transition-all ${
                      formData.status === "Active" 
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-400" 
                        : `${themeClasses.border.primary} ${themeClasses.text.muted} group-hover/status:border-emerald-500 ${themeClasses.bg.secondary}`
                    }`}>
                      Active
                    </div>
                  </label>
                  <label className="flex-1 cursor-pointer group/status">
                    <input
                      type="radio"
                      name="status"
                      value="Inactive"
                      checked={formData.status === "Inactive"}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`relative p-4 rounded-lg border text-center transition-all ${
                      formData.status === "Inactive" 
                        ? "border-gray-500 bg-gray-500/10 text-gray-400" 
                        : `${themeClasses.border.primary} ${themeClasses.text.muted} group-hover/status:border-gray-500 ${themeClasses.bg.secondary}`
                    }`}>
                      Inactive
                    </div>
                  </label>
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className={`block text-sm font-medium ${themeClasses.text.primary} mb-3`}>
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  className={`w-full px-4 py-3 ${themeClasses.input.bg} border ${themeClasses.input.border} rounded-lg ${themeClasses.input.text} focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all`}
                />
              </div>

              {/* Established Date */}
              <div>
                <label className={`block text-sm font-medium ${themeClasses.text.primary} mb-3`}>
                  <span className="flex items-center gap-2">
                    <FiCalendar className="w-4 h-4 text-purple-400" />
                    Established Date
                  </span>
                </label>
                <input
                  type="date"
                  name="establishedDate"
                  value={formData.establishedDate}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 ${themeClasses.input.bg} border ${themeClasses.input.border} rounded-lg ${themeClasses.input.text} focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all`}
                />
              </div>

              {/* Color Tag */}
              <div>
                <label className={`block text-sm font-medium ${themeClasses.text.primary} mb-3`}>
                  Department Color
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {colorOptions.map((c) => (
                    <label
                      key={c.key}
                      className={`relative flex items-center justify-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${
                        formData.colorTag === c.key
                          ? "border-purple-500 bg-purple-500/10"
                          : `${themeClasses.border.primary} hover:border-gray-600 ${themeClasses.bg.secondary}`
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
                      <span className={`w-6 h-6 rounded-full bg-gradient-to-r ${c.gradient} ring-2 ring-white/20`}></span>
                      <span className={`text-sm font-medium ${themeClasses.text.primary} capitalize`}>{c.key}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Full Width Fields */}
            <div className="lg:col-span-2">
              {/* Description */}
              <div>
                <label className={`block text-sm font-medium ${themeClasses.text.primary} mb-3`}>
                  Description
                </label>
                <textarea
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 ${themeClasses.input.bg} border ${
                    errors.description ? "border-red-500" : themeClasses.input.border
                  } rounded-lg ${themeClasses.input.text} focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all`}
                />
                {errors.description && (
                  <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.23 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Internal Notes */}
              <div className="mt-6">
                <label className={`block text-sm font-medium ${themeClasses.text.primary} mb-3`}>
                  Internal Notes
                </label>
                <textarea
                  name="notes"
                  rows="3"
                  value={formData.notes}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 ${themeClasses.input.bg} border ${themeClasses.input.border} rounded-lg ${themeClasses.input.text} focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all`}
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className={`mt-8 pt-6 border-t ${themeClasses.border.primary} flex justify-between items-center`}>
            <div>
              {hasChanges && (
                <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                  <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.23 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span className="text-sm text-amber-400">You have unsaved changes</span>
                </div>
              )}
            </div>
            
            <div className="flex gap-4">
              <Link
                to="/admin/departments"
                className={`px-6 py-3 ${themeClasses.bg.secondary} border ${themeClasses.border.primary} ${themeClasses.text.muted} hover:${themeClasses.text.primary} hover:border-gray-600 rounded-lg font-medium transition-colors`}
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting || !hasChanges}
                className={`px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium flex items-center gap-2 transition-colors ${isSubmitting || !hasChanges ? "opacity-75 cursor-not-allowed" : ""}`}
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

      {/* Enhanced Department Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className={`rounded-xl p-5 border ${themeClasses.border.primary} ${themeClasses.bg.secondary}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${themeClasses.text.muted}`}>Total Employees</p>
              <h3 className={`text-2xl font-bold ${themeClasses.text.primary} mt-1`}>24</h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
              <FiUsers className="w-6 h-6" />
            </div>
          </div>
        </div>
        
        <div className={`rounded-xl p-5 border ${themeClasses.border.primary} ${themeClasses.bg.secondary}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${themeClasses.text.muted}`}>Active Projects</p>
              <h3 className={`text-2xl font-bold ${themeClasses.text.primary} mt-1`}>8</h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className={`rounded-xl p-5 border ${themeClasses.border.primary} ${themeClasses.bg.secondary}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${themeClasses.text.muted}`}>Attendance Rate</p>
              <h3 className={`text-2xl font-bold ${themeClasses.text.primary} mt-1`}>95%</h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
              <FiCalendar className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className={`rounded-xl border ${themeClasses.border.primary} ${themeClasses.bg.secondary} shadow-xl overflow-hidden max-w-md w-full`}>
            <div className="p-8">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30">
                <FiTrash2 className="w-8 h-8 text-red-400" />
              </div>
              <h3 className={`text-xl font-bold ${themeClasses.text.primary} text-center mb-3`}>
                Delete Department?
              </h3>
              <p className={`${themeClasses.text.muted} text-center mb-8`}>
                Are you sure you want to delete the "<span className={`${themeClasses.text.primary} font-medium`}>{formData.name}</span>" department? This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className={`flex-1 px-4 py-3.5 ${darkMode ? "bg-gray-700" : "bg-gray-300"} hover:${darkMode ? "bg-gray-600" : "bg-gray-400"} ${themeClasses.text.primary} rounded-lg font-medium transition-colors`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditDepartment;