import React, { useState, useEffect } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import { FiSave, FiArrowLeft, FiTrash2, FiUser, FiMail, FiPhone, FiCalendar, FiMapPin, FiBriefcase, FiUpload } from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { Link, useParams, useNavigate } from "react-router-dom";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const [formData, setFormData] = useState({
    employeeId: "EMP001",
    firstName: "Rahul",
    lastName: "Sharma",
    email: "rahul.sharma@example.com",
    personalEmail: "rahul.personal@example.com",
    phone: "+91 98765 43210",
    department: "IT",
    role: "Senior Software Engineer",
    managerId: "2",
    status: "Active",
    joinDate: "2024-01-15",
    dob: "1995-05-22",
    gender: "Male",
    employmentType: "Full-time",
    location: "Mumbai, India",
    shift: "General (9 AM - 6 PM)",
    emergencyName: "Rohit Sharma",
    emergencyPhone: "+91 98765 40000",
    emergencyRelation: "Brother",
    address: "123 Main Street, Andheri West, Mumbai 400053",
    qualifications: "B.Tech in Computer Science, AWS Certified",
    experience: "5 years",
    skills: "JavaScript, React, Node.js, AWS, MongoDB",
    profileImage: null,
  });

  const [errors, setErrors] = useState({});
  const [employeeStats, setEmployeeStats] = useState({
    attendance: 95,
    performance: 4.5,
    leavesUsed: 8,
    leavesRemaining: 12,
  });

  // Mock initial data fetch
  useEffect(() => {
    console.log("Fetching employee data for ID:", id);
    // In real app, fetch employee data by ID
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setHasChanges(true);
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, profileImage: "File size must be less than 5MB" });
        return;
      }
      if (!file.type.startsWith('image/')) {
        setErrors({ ...errors, profileImage: "File must be an image" });
        return;
      }
      setFormData({ ...formData, profileImage: file });
      setErrors({ ...errors, profileImage: "" });
      setHasChanges(true);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.role) newErrors.role = "Role is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        console.log("Updated employee data:", formData);
        setIsSubmitting(false);
        setHasChanges(false);
        alert("Employee updated successfully!");
      }, 1500);
    } else {
      setErrors(validationErrors);
    }
  };

  const handleDelete = () => {
    // Simulate delete API call
    setTimeout(() => {
      console.log("Deleting employee:", id);
      setShowDeleteModal(false);
      navigate("/admin/employees");
      alert("Employee deleted successfully!");
    }, 1000);
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/employees"
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
          >
            <FiArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Edit Employee</h1>
            <p className="text-slate-600">
              Update existing employee details. All changes are tracked and reversible.
            </p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 font-medium"
          >
            <FiTrash2 className="w-4 h-4" />
            Delete Employee
          </button>
        </div>
      </div>

      {/* Employee Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Attendance Rate</p>
              <h3 className="text-3xl font-bold text-slate-800 mt-2">{employeeStats.attendance}%</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <FiCalendar className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Performance</p>
              <h3 className="text-3xl font-bold text-slate-800 mt-2">{employeeStats.performance}/5.0</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
              <span className="text-2xl font-bold text-amber-600">★</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Leaves Used</p>
              <h3 className="text-3xl font-bold text-slate-800 mt-2">{employeeStats.leavesUsed}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Leaves Remaining</p>
              <h3 className="text-3xl font-bold text-slate-800 mt-2">{employeeStats.leavesRemaining}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-2 border-white shadow-md overflow-hidden">
                {formData.profileImage ? (
                  <img
                    src={URL.createObjectURL(formData.profileImage)}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xl font-bold">
                    {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
                  </div>
                )}
              </div>
              <label className="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600">
                <FiUpload className="w-3 h-3" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                {formData.firstName} {formData.lastName}
              </h2>
              <p className="text-slate-600">{formData.role} • {formData.department}</p>
              <p className="text-sm text-slate-500">Employee ID: {formData.employeeId}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-slate-800 mb-2">
                  <span className="flex items-center gap-2">
                    <FiUser className="w-4 h-4" />
                    First Name *
                  </span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${
                    errors.firstName ? "border-red-300" : "border-slate-300"
                  } rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all`}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-slate-800 mb-2">
                  <span className="flex items-center gap-2">
                    <FiUser className="w-4 h-4" />
                    Last Name *
                  </span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${
                    errors.lastName ? "border-red-300" : "border-slate-300"
                  } rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all`}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>

              {/* Work Email */}
              <div>
                <label className="block text-sm font-medium text-slate-800 mb-2">
                  <span className="flex items-center gap-2">
                    <FiMail className="w-4 h-4" />
                    Work Email *
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

              {/* Personal Email */}
              <div>
                <label className="block text-sm font-medium text-slate-800 mb-2">
                  <span className="flex items-center gap-2">
                    <FiMail className="w-4 h-4" />
                    Personal Email
                  </span>
                </label>
                <input
                  type="email"
                  name="personalEmail"
                  value={formData.personalEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-slate-800 mb-2">
                  <span className="flex items-center gap-2">
                    <FiPhone className="w-4 h-4" />
                    Phone Number *
                  </span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${
                    errors.phone ? "border-red-300" : "border-slate-300"
                  } rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all`}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-slate-800 mb-2">
                  <span className="flex items-center gap-2">
                    <FiCalendar className="w-4 h-4" />
                    Date of Birth
                  </span>
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-slate-800 mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-slate-800 mb-2">
                  <span className="flex items-center gap-2">
                    <HiOutlineOfficeBuilding className="w-4 h-4" />
                    Department *
                  </span>
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${
                    errors.department ? "border-red-300" : "border-slate-300"
                  } rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white`}
                >
                  <option value="IT">Information Technology</option>
                  <option value="HR">Human Resources</option>
                  <option value="Finance">Finance & Accounting</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Operations">Operations</option>
                </select>
                {errors.department && (
                  <p className="mt-1 text-sm text-red-600">{errors.department}</p>
                )}
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-slate-800 mb-2">
                  <span className="flex items-center gap-2">
                    <FiBriefcase className="w-4 h-4" />
                    Role *
                  </span>
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${
                    errors.role ? "border-red-300" : "border-slate-300"
                  } rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white`}
                >
                  <option value="Software Engineer">Software Engineer</option>
                  <option value="Senior Developer">Senior Developer</option>
                  <option value="Team Lead">Team Lead</option>
                  <option value="Manager">Manager</option>
                  <option value="HR Executive">HR Executive</option>
                  <option value="Accountant">Accountant</option>
                </select>
                {errors.role && (
                  <p className="mt-1 text-sm text-red-600">{errors.role}</p>
                )}
              </div>

              {/* Reporting Manager */}
              <div>
                <label className="block text-sm font-medium text-slate-800 mb-2">
                  Reporting Manager
                </label>
                <select
                  name="managerId"
                  value={formData.managerId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white"
                >
                  <option value="2">Simran Kaur (HR Director)</option>
                  <option value="3">Ankit Mehta (Finance Head)</option>
                  <option value="4">Priya Patel (Marketing Head)</option>
                </select>
              </div>

              {/* Employment Type */}
              <div>
                <label className="block text-sm font-medium text-slate-800 mb-2">
                  Employment Type
                </label>
                <select
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Intern">Intern</option>
                </select>
              </div>

              {/* Join Date */}
              <div>
                <label className="block text-sm font-medium text-slate-800 mb-2">
                  <span className="flex items-center gap-2">
                    <FiCalendar className="w-4 h-4" />
                    Join Date
                  </span>
                </label>
                <input
                  type="date"
                  name="joinDate"
                  value={formData.joinDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-slate-800 mb-2">
                  Status
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
            </div>

            {/* Full Width Fields */}
            <div className="lg:col-span-2 space-y-6">
              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-slate-800 mb-2">
                  <span className="flex items-center gap-2">
                    <FiMapPin className="w-4 h-4" />
                    Address
                  </span>
                </label>
                <textarea
                  name="address"
                  rows="2"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>

              {/* Emergency Contact */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-800 mb-2">
                    Emergency Contact Name
                  </label>
                  <input
                    type="text"
                    name="emergencyName"
                    value={formData.emergencyName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-800 mb-2">
                    Emergency Phone
                  </label>
                  <input
                    type="text"
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-800 mb-2">
                    Relationship
                  </label>
                  <input
                    type="text"
                    name="emergencyRelation"
                    value={formData.emergencyRelation}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
              </div>

              {/* Qualifications & Skills */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-800 mb-2">
                    Qualifications
                  </label>
                  <textarea
                    name="qualifications"
                    rows="3"
                    value={formData.qualifications}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-800 mb-2">
                    Skills
                  </label>
                  <textarea
                    name="skills"
                    rows="3"
                    value={formData.skills}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
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
                to="/admin/employees"
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
                    <svg className="animate-spin h-5 w-5 text-white inline mr-2" fill="none" viewBox="0 0 24 24">
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
                Delete Employee?
              </h3>
              <p className="text-slate-600 text-center mb-6">
                Are you sure you want to delete {formData.firstName} {formData.lastName}? This action cannot be undone and will permanently remove all employee data.
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
                  Delete Employee
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default EditEmployee;