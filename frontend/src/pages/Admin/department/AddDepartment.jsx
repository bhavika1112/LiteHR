import React, { useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import { FiSave, FiArrowLeft, FiUsers, FiMail, FiUser, FiCalendar } from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { Link } from "react-router-dom";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
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
        console.log("Department data to save:", formData);
        setIsSubmitting(false);
        // Reset form or redirect
      }, 1500);
    } else {
      setErrors(validationErrors);
    }
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
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/admin/departments"
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
        >
          <FiArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Create New Department</h1>
          <p className="text-slate-600">
            Add a new department with head, policies, color tag, and status.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
              <HiOutlineOfficeBuilding className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Department Information</h2>
              <p className="text-sm text-slate-600">Fill in the details below</p>
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
                  placeholder="e.g., Information Technology, Human Resources"
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
                  placeholder="e.g., it@company.com"
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
                  <option value="">Select Department Head</option>
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
                  placeholder="e.g., Floor 3, Building A"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
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
                  placeholder="e.g., $1,200,000"
                  value={formData.budget}
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
                  placeholder="Describe the department's purpose, responsibilities, and goals..."
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${
                    errors.description ? "border-red-300" : "border-slate-300"
                  } rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all`}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
                <p className="mt-1 text-sm text-slate-500">
                  Provide a clear description of what this department does.
                </p>
              </div>

              {/* Internal Notes */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-slate-800 mb-2">
                  Internal Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  rows="3"
                  placeholder="Internal notes, policies, shift rules, meeting schedules, etc."
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
                <p className="mt-1 text-sm text-slate-500">
                  These notes are only visible to administrators.
                </p>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end gap-3">
            <Link
              to="/admin/departments"
              className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg shadow hover:shadow-md font-medium transition-all ${
                isSubmitting ? "opacity-75 cursor-not-allowed" : ""
              }`}
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

      {/* Preview Card */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Preview</h3>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  colorOptions.find(c => c.key === formData.colorTag)?.color.replace("500", "100")
                } ${
                  colorOptions.find(c => c.key === formData.colorTag)?.color.replace("500", "700")
                }`}
              >
                {formData.name || "Department Name"}
              </span>
              <span className={`px-3 py-1 text-xs rounded-full ${
                formData.status === "Active" 
                  ? "bg-green-100 text-green-700" 
                  : "bg-slate-100 text-slate-700"
              }`}>
                {formData.status || "Status"}
              </span>
            </div>
          </div>
          
          <h4 className="text-xl font-semibold text-slate-800 mb-2">
            {formData.name || "New Department"}
          </h4>
          
          <p className="text-slate-600 mb-4">
            {formData.description || "Description will appear here"}
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-500">Email</p>
              <p className="font-medium text-slate-800">{formData.email || "email@company.com"}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Budget</p>
              <p className="font-medium text-slate-800">{formData.budget || "$0"}</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddDepartment;