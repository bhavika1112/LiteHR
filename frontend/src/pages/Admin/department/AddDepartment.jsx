import React, { useState } from "react";
import { FiSave, FiArrowLeft, FiUsers, FiMail, FiUser, FiCalendar, FiDollarSign, FiMapPin, FiBriefcase } from "react-icons/fi";
import { HiOutlineOfficeBuilding, HiOutlineUserGroup } from "react-icons/hi";
import { MdOutlineDescription, MdOutlineNoteAlt } from "react-icons/md";
import { Link } from "react-router-dom";
import { useTheme, getThemeClasses } from "../../../contexts/ThemeContext";

const AddDepartment = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    email: "",
    departmentHead: "",
    status: "Active",
    colorTag: "blue",
    notes: "",
    budget: "",
    location: "",
    establishedDate: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const darkMode = useTheme();
  const themeClasses = getThemeClasses(darkMode);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
        console.log("Department data to save:", formData);
        setIsSubmitting(false);
      }, 1500);
    } else {
      setErrors(validationErrors);
    }
  };

  const colorOptions = [
    { key: "blue", color: "bg-gradient-to-br from-blue-500 to-cyan-500", border: darkMode ? "border-blue-500/30" : "border-blue-500/40", text: "text-blue-400", bg: darkMode ? "bg-blue-500/20" : "bg-blue-500/20", icon: "💙" },
    { key: "green", color: "bg-gradient-to-br from-emerald-500 to-green-500", border: darkMode ? "border-emerald-500/30" : "border-emerald-500/40", text: "text-emerald-400", bg: darkMode ? "bg-emerald-500/20" : "bg-emerald-500/20", icon: "💚" },
    { key: "pink", color: "bg-gradient-to-br from-pink-500 to-rose-500", border: darkMode ? "border-pink-500/30" : "border-pink-500/40", text: "text-pink-400", bg: darkMode ? "bg-pink-500/20" : "bg-pink-500/20", icon: "💖" },
    { key: "yellow", color: "bg-gradient-to-br from-amber-500 to-yellow-500", border: darkMode ? "border-amber-500/30" : "border-amber-500/40", text: "text-amber-400", bg: darkMode ? "bg-amber-500/20" : "bg-amber-500/20", icon: "💛" },
    { key: "indigo", color: "bg-gradient-to-br from-indigo-500 to-purple-500", border: darkMode ? "border-indigo-500/30" : "border-indigo-500/40", text: "text-indigo-400", bg: darkMode ? "bg-indigo-500/20" : "bg-indigo-500/20", icon: "💜" },
    { key: "purple", color: "bg-gradient-to-br from-purple-500 to-fuchsia-500", border: darkMode ? "border-purple-500/30" : "border-purple-500/40", text: "text-purple-400", bg: darkMode ? "bg-purple-500/20" : "bg-purple-500/20", icon: "🟣" },
  ];

  const departmentHeads = [
    { id: 1, name: "Rahul Sharma", role: "Senior Manager", avatar: "RS", color: "from-blue-500 to-cyan-500" },
    { id: 2, name: "Simran Kaur", role: "HR Director", avatar: "SK", color: "from-pink-500 to-rose-500" },
    { id: 3, name: "Ankit Mehta", role: "Finance Lead", avatar: "AM", color: "from-emerald-500 to-green-500" },
    { id: 4, name: "Priya Patel", role: "Marketing Head", avatar: "PP", color: "from-amber-500 to-orange-500" },
  ];

  return (
    <div className="w-full">
      {/* Enhanced Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <Link
            to="/admin/departments"
            className={`p-3 rounded-lg ${themeClasses.bg.secondary} hover:${darkMode ? "bg-gray-700" : "bg-gray-300"} ${themeClasses.text.muted} hover:${themeClasses.text.primary} border ${themeClasses.border.primary} hover:border-purple-500 transition-colors`}
          >
            <FiArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className={`text-3xl font-bold ${themeClasses.text.primary} mb-2`}>
              <HiOutlineOfficeBuilding className="inline mr-3 text-purple-400" />
              Create New Department
            </h1>
            <p className={themeClasses.text.muted}>
              Add a new department with head, policies, color tag, and status.
            </p>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className={`rounded-xl border ${themeClasses.border.primary} ${themeClasses.bg.secondary} shadow-sm overflow-hidden mb-8`}>
        <div className={`p-6 border-b ${themeClasses.border.primary} ${darkMode ? "bg-gray-900/50" : "bg-gray-100/50"}`}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
              <HiOutlineOfficeBuilding className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className={`text-xl font-bold ${themeClasses.text.primary}`}>Department Information</h2>
              <p className={`text-sm ${themeClasses.text.muted}`}>Fill in the details below</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Department Name */}
              <div>
                <label className={`block text-sm font-medium ${themeClasses.text.primary} mb-3`}>
                  <span className="flex items-center gap-2">
                    <HiOutlineOfficeBuilding className="w-4 h-4 text-purple-400" />
                    Department Name *
                  </span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g., Information Technology, Human Resources"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3.5 ${themeClasses.input.bg} border ${
                    errors.name ? "border-red-500 ring-2 ring-red-500/20" : themeClasses.input.border
                  } rounded-lg ${themeClasses.input.text} placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all`}
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Department Email */}
              <div>
                <label className={`block text-sm font-medium ${themeClasses.text.primary} mb-3`}>
                  <span className="flex items-center gap-2">
                    <FiMail className="w-4 h-4 text-purple-400" />
                    Department Email *
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="e.g., it@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3.5 ${themeClasses.input.bg} border ${
                    errors.email ? "border-red-500 ring-2 ring-red-500/20" : themeClasses.input.border
                  } rounded-lg ${themeClasses.input.text} placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all`}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Department Head */}
              <div>
                <label className={`block text-sm font-medium ${themeClasses.text.primary} mb-3`}>
                  <span className="flex items-center gap-2">
                    <HiOutlineUserGroup className="w-4 h-4 text-purple-400" />
                    Department Head *
                  </span>
                </label>
                <div className={`relative rounded-lg border ${
                  errors.departmentHead ? "border-red-500 ring-2 ring-red-500/20" : themeClasses.input.border
                } overflow-hidden`}>
                  <select
                    name="departmentHead"
                    value={formData.departmentHead}
                    onChange={handleChange}
                    className={`w-full px-4 py-3.5 ${themeClasses.input.bg} ${themeClasses.input.text} appearance-none focus:outline-none focus:ring-0`}
                  >
                    <option value="" className={`${themeClasses.input.bg} ${themeClasses.text.muted}`}>Select Department Head</option>
                    {departmentHeads.map(head => (
                      <option key={head.id} value={head.id} className={`${themeClasses.input.bg} ${themeClasses.input.text}`}>
                        {head.name} - {head.role}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.departmentHead && (
                  <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                    {errors.departmentHead}
                  </p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className={`block text-sm font-medium ${themeClasses.text.primary} mb-3`}>
                  <span className="flex items-center gap-2">
                    <FiMapPin className="w-4 h-4 text-purple-400" />
                    Location
                  </span>
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g., Floor 3, Building A"
                  value={formData.location}
                  onChange={handleChange}
                  className={`w-full px-4 py-3.5 ${themeClasses.input.bg} border ${themeClasses.input.border} rounded-lg ${themeClasses.input.text} placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all`}
                />
              </div>

              {/* Budget */}
              <div>
                <label className={`block text-sm font-medium ${themeClasses.text.primary} mb-3`}>
                  <span className="flex items-center gap-2">
                    <FiDollarSign className="w-4 h-4 text-purple-400" />
                    Annual Budget
                  </span>
                </label>
                <input
                  type="text"
                  name="budget"
                  placeholder="e.g., $1,200,000"
                  value={formData.budget}
                  onChange={handleChange}
                  className={`w-full px-4 py-3.5 ${themeClasses.input.bg} border ${themeClasses.input.border} rounded-lg ${themeClasses.input.text} placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all`}
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
                <div className="grid grid-cols-2 gap-3">
                  <label className="relative cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="Active"
                      checked={formData.status === "Active"}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`relative p-4 rounded-lg border ${
                      formData.status === "Active" 
                        ? "border-emerald-500 bg-emerald-500/10" 
                        : `${themeClasses.border.primary} ${themeClasses.bg.secondary} hover:border-emerald-500`
                    } transition-all`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${formData.status === "Active" ? "bg-emerald-500" : darkMode ? "bg-gray-600" : "bg-gray-400"} ring-2 ${formData.status === "Active" ? "ring-emerald-500/30" : darkMode ? "ring-gray-600" : "ring-gray-400"}`}></div>
                        <span className={`font-medium ${formData.status === "Active" ? "text-emerald-400" : themeClasses.text.muted}`}>Active</span>
                      </div>
                      {formData.status === "Active" && (
                        <div className="absolute top-2 right-2">
                          <span className="text-xs px-2 py-1 bg-emerald-500/30 text-emerald-300 rounded-full">✓ Selected</span>
                        </div>
                      )}
                    </div>
                  </label>
                  
                  <label className="relative cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="Inactive"
                      checked={formData.status === "Inactive"}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`relative p-4 rounded-lg border ${
                      formData.status === "Inactive" 
                        ? "border-gray-500 bg-gray-500/10" 
                        : `${themeClasses.border.primary} ${themeClasses.bg.secondary} hover:border-gray-500`
                    } transition-all`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${formData.status === "Inactive" ? "bg-gray-400" : darkMode ? "bg-gray-600" : "bg-gray-400"} ring-2 ${formData.status === "Inactive" ? "ring-gray-500/30" : darkMode ? "ring-gray-600" : "ring-gray-400"}`}></div>
                        <span className={`font-medium ${formData.status === "Inactive" ? "text-gray-400" : themeClasses.text.muted}`}>Inactive</span>
                      </div>
                      {formData.status === "Inactive" && (
                        <div className="absolute top-2 right-2">
                          <span className="text-xs px-2 py-1 bg-gray-500/30 text-gray-300 rounded-full">✓ Selected</span>
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              </div>

              {/* Established Date */}
              <div>
                <label className={`block text-sm font-medium ${themeClasses.text.primary} mb-3`}>
                  <span className="flex items-center gap-2">
                    <FiCalendar className="w-4 h-4 text-purple-400" />
                    Established Date
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="establishedDate"
                    value={formData.establishedDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-3.5 ${themeClasses.input.bg} border ${themeClasses.input.border} rounded-lg ${themeClasses.input.text} focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all appearance-none`}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <FiCalendar className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Color Tag */}
              <div>
                <label className={`block text-sm font-medium ${themeClasses.text.primary} mb-3`}>
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                    Department Color
                  </span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {colorOptions.map((c) => (
                    <label
                      key={c.key}
                      className={`relative cursor-pointer`}
                    >
                      <input
                        type="radio"
                        name="colorTag"
                        value={c.key}
                        checked={formData.colorTag === c.key}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`p-4 rounded-lg border ${
                        formData.colorTag === c.key
                          ? `${c.border} ${c.bg}`
                          : `${themeClasses.border.primary} ${themeClasses.bg.secondary} hover:border-gray-600`
                      } transition-all`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full ${c.color} flex items-center justify-center text-white text-sm`}>
                              {c.icon}
                            </div>
                            <span className={`text-sm font-medium ${formData.colorTag === c.key ? c.text : themeClasses.text.primary} capitalize`}>
                              {c.key}
                            </span>
                          </div>
                          {formData.colorTag === c.key && (
                            <span className="text-lg">✓</span>
                          )}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Full Width Fields */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <div>
                <label className={`block text-sm font-medium ${themeClasses.text.primary} mb-3`}>
                  <span className="flex items-center gap-2">
                    <MdOutlineDescription className="w-4 h-4 text-purple-400" />
                    Description *
                  </span>
                </label>
                <textarea
                  name="description"
                  rows="4"
                  placeholder="Describe the department's purpose, responsibilities, and goals..."
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full px-4 py-3.5 ${themeClasses.input.bg} border ${
                    errors.description ? "border-red-500 ring-2 ring-red-500/20" : themeClasses.input.border
                  } rounded-lg ${themeClasses.input.text} placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all`}
                />
                {errors.description && (
                  <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                    {errors.description}
                  </p>
                )}
                <p className={`mt-2 text-sm ${themeClasses.text.muted} flex items-center gap-1`}>
                  <span className={`w-1 h-1 rounded-full ${darkMode ? "bg-gray-600" : "bg-gray-500"}`}></span>
                  Provide a clear description of what this department does.
                </p>
              </div>

              {/* Internal Notes */}
              <div>
                <label className={`block text-sm font-medium ${themeClasses.text.primary} mb-3`}>
                  <span className="flex items-center gap-2">
                    <MdOutlineNoteAlt className="w-4 h-4 text-purple-400" />
                    Internal Notes (Optional)
                  </span>
                </label>
                <textarea
                  name="notes"
                  rows="3"
                  placeholder="Internal notes, policies, shift rules, meeting schedules, etc."
                  value={formData.notes}
                  onChange={handleChange}
                  className={`w-full px-4 py-3.5 ${themeClasses.input.bg} border ${themeClasses.input.border} rounded-lg ${themeClasses.input.text} placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all`}
                />
                <p className={`mt-2 text-sm ${themeClasses.text.muted} flex items-center gap-1`}>
                  <span className={`w-1 h-1 rounded-full ${darkMode ? "bg-gray-600" : "bg-gray-500"}`}></span>
                  These notes are only visible to administrators.
                </p>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className={`mt-8 pt-6 border-t ${themeClasses.border.primary} flex justify-end gap-4`}>
            <Link
              to="/admin/departments"
              className={`px-6 py-3 ${themeClasses.bg.secondary} border ${themeClasses.border.primary} ${themeClasses.text.muted} hover:${themeClasses.text.primary} hover:border-gray-600 rounded-lg font-medium transition-colors`}
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium flex items-center gap-2 transition-colors ${isSubmitting ? "opacity-75 cursor-not-allowed" : ""}`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating...
                </>
              ) : (
                <>
                  <FiSave className="w-5 h-5" />
                  Create Department
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Enhanced Preview Card */}
      <div className={`rounded-xl border ${themeClasses.border.primary} ${themeClasses.bg.secondary} p-6`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <FiBriefcase className="w-6 h-6 text-white" />
          </div>
          <h3 className={`text-xl font-bold ${themeClasses.text.primary}`}>Department Preview</h3>
        </div>
        
        <div className={`rounded-lg p-6 border ${themeClasses.border.primary} ${darkMode ? "bg-gray-900/50" : "bg-gray-100/50"}`}>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              {formData.colorTag && (
                <div className={`w-12 h-12 rounded-xl ${colorOptions.find(c => c.key === formData.colorTag)?.color} flex items-center justify-center text-white text-lg font-bold`}>
                  {formData.name?.charAt(0) || "D"}
                </div>
              )}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className={`text-2xl font-bold ${themeClasses.text.primary}`}>
                    {formData.name || "New Department"}
                  </h4>
                  <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                    formData.status === "Active" 
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
                      : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                  }`}>
                    {formData.status || "Status"}
                  </span>
                </div>
                <p className={`text-sm ${themeClasses.text.muted} flex items-center gap-1`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${darkMode ? "bg-gray-600" : "bg-gray-500"}`}></span>
                  Created on {formData.establishedDate || "Today"}
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {formData.location && (
                <span className="px-3 py-1.5 text-sm rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/30 flex items-center gap-1">
                  <FiMapPin className="w-3 h-3" />
                  {formData.location}
                </span>
              )}
              {formData.budget && (
                <span className="px-3 py-1.5 text-sm rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                  <FiDollarSign className="w-3 h-3" />
                  {formData.budget}
                </span>
              )}
            </div>
          </div>
          
          <p className={`${themeClasses.text.primary} mb-6 leading-relaxed`}>
            {formData.description || "Department description will appear here..."}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-900/50" : "bg-gray-100/50"} border ${themeClasses.border.primary}`}>
              <p className={`text-sm ${themeClasses.text.muted} mb-1`}>Email</p>
              <p className={`font-medium ${themeClasses.text.primary} flex items-center gap-2`}>
                <FiMail className="w-4 h-4 text-emerald-400" />
                {formData.email || "email@company.com"}
              </p>
            </div>
            
            <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-900/50" : "bg-gray-100/50"} border ${themeClasses.border.primary}`}>
              <p className={`text-sm ${themeClasses.text.muted} mb-1`}>Budget</p>
              <p className={`font-medium ${themeClasses.text.primary} flex items-center gap-2`}>
                <FiDollarSign className="w-4 h-4 text-amber-400" />
                {formData.budget || "$0"}
              </p>
            </div>
            
            <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-900/50" : "bg-gray-100/50"} border ${themeClasses.border.primary}`}>
              <p className={`text-sm ${themeClasses.text.muted} mb-1`}>Department Head</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                  {formData.departmentHead ? departmentHeads.find(h => h.id == formData.departmentHead)?.avatar : "?"}
                </div>
                <div>
                  <p className={`font-medium ${themeClasses.text.primary} text-sm`}>
                    {formData.departmentHead ? departmentHeads.find(h => h.id == formData.departmentHead)?.name : "Not assigned"}
                  </p>
                  <p className={`text-xs ${themeClasses.text.muted}`}>
                    {formData.departmentHead ? departmentHeads.find(h => h.id == formData.departmentHead)?.role : "Select a head"}
                  </p>
                </div>
              </div>
            </div>
            
            <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-900/50" : "bg-gray-100/50"} border ${themeClasses.border.primary}`}>
              <p className={`text-sm ${themeClasses.text.muted} mb-1`}>Color Theme</p>
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full ${colorOptions.find(c => c.key === formData.colorTag)?.color}`}></div>
                <p className={`font-medium ${themeClasses.text.primary} capitalize`}>
                  {formData.colorTag || "blue"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDepartment;