import React, { useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import { FiUser, FiMail, FiPhone, FiCalendar, FiMapPin, FiBriefcase, FiUpload, FiArrowLeft } from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { Link } from "react-router-dom";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    personalEmail: "",
    phone: "",
    department: "",
    role: "",
    managerId: "",
    status: "Active",
    joinDate: "",
    dob: "",
    gender: "",
    employmentType: "Full-time",
    location: "",
    shift: "",
    emergencyName: "",
    emergencyPhone: "",
    emergencyRelation: "",
    address: "",
    qualifications: "",
    experience: "",
    skills: "",
    profileImage: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const totalSteps = 3;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors({ ...errors, profileImage: "File size must be less than 5MB" });
        return;
      }
      if (!file.type.startsWith('image/')) {
        setErrors({ ...errors, profileImage: "File must be an image" });
        return;
      }
      setFormData({ ...formData, profileImage: file });
      setErrors({ ...errors, profileImage: "" });
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    }
    
    if (step === 2) {
      if (!formData.department) newErrors.department = "Department is required";
      if (!formData.role) newErrors.role = "Role is required";
      if (!formData.joinDate) newErrors.joinDate = "Join date is required";
    }
    
    return newErrors;
  };

  const handleNext = () => {
    const stepErrors = validateStep(activeStep);
    if (Object.keys(stepErrors).length === 0) {
      setActiveStep(prev => Math.min(prev + 1, totalSteps));
    } else {
      setErrors(stepErrors);
    }
  };

  const handlePrev = () => {
    setActiveStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allErrors = validateStep(1);
    const step2Errors = validateStep(2);
    const finalErrors = { ...allErrors, ...step2Errors };
    
    if (Object.keys(finalErrors).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        console.log("Employee data to save:", formData);
        setIsSubmitting(false);
        alert("Employee added successfully!");
      }, 1500);
    } else {
      setErrors(finalErrors);
      setActiveStep(1);
    }
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/admin/employees"
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
        >
          <FiArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Add New Employee</h1>
          <p className="text-slate-600">
            Fill in core HR & employment details. All fields marked with * are required.
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-medium ${
                step === activeStep
                  ? "border-blue-500 bg-blue-500 text-white"
                  : step < activeStep
                  ? "border-green-500 bg-green-500 text-white"
                  : "border-slate-300 text-slate-400"
              }`}>
                {step < activeStep ? "✓" : step}
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${
                  step === activeStep ? "text-blue-600" : 
                  step < activeStep ? "text-green-600" : "text-slate-600"
                }`}>
                  {step === 1 ? "Personal Info" : step === 2 ? "Employment" : "Additional Details"}
                </p>
              </div>
              {step < 3 && (
                <div className={`h-0.5 w-16 mx-4 ${
                  step < activeStep ? "bg-green-500" : "bg-slate-300"
                }`}></div>
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {activeStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Profile Image */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-slate-800 mb-4">
                    Profile Image
                  </label>
                  <div className="flex items-center gap-6">
                    <div className="w-32 h-32 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden bg-slate-50">
                      {formData.profileImage ? (
                        <img
                          src={URL.createObjectURL(formData.profileImage)}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <FiUser className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                          <span className="text-sm text-slate-500">No image</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <label className="inline-flex items-center gap-2 px-4 py-3 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer">
                        <FiUpload className="w-5 h-5" />
                        Upload Photo
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                      <p className="text-sm text-slate-500 mt-2">
                        Recommended: Square image, 500x500px, max 5MB
                      </p>
                      {errors.profileImage && (
                        <p className="text-sm text-red-600 mt-1">{errors.profileImage}</p>
                      )}
                    </div>
                  </div>
                </div>

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
                    placeholder="Enter first name"
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
                    placeholder="Enter last name"
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
                    placeholder="employee@company.com"
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
                    placeholder="personal@email.com"
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
                    placeholder="+91 98765 43210"
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
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>

                {/* Address */}
                <div className="lg:col-span-2">
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
                    placeholder="Complete residential address"
                  />
                </div>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Employee ID */}
                <div>
                  <label className="block text-sm font-medium text-slate-800 mb-2">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="EMP001"
                  />
                  <p className="text-sm text-slate-500 mt-1">Auto-generated if left empty</p>
                </div>

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
                    <option value="">Select Department</option>
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
                    <option value="">Select Role</option>
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
                    <option value="">Select Manager</option>
                    <option value="1">Rahul Sharma (IT Manager)</option>
                    <option value="2">Simran Kaur (HR Director)</option>
                    <option value="3">Ankit Mehta (Finance Head)</option>
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
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>

                {/* Join Date */}
                <div>
                  <label className="block text-sm font-medium text-slate-800 mb-2">
                    <span className="flex items-center gap-2">
                      <FiCalendar className="w-4 h-4" />
                      Join Date *
                    </span>
                  </label>
                  <input
                    type="date"
                    name="joinDate"
                    value={formData.joinDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${
                      errors.joinDate ? "border-red-300" : "border-slate-300"
                    } rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all`}
                  />
                  {errors.joinDate && (
                    <p className="mt-1 text-sm text-red-600">{errors.joinDate}</p>
                  )}
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

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-slate-800 mb-2">
                    <span className="flex items-center gap-2">
                      <FiMapPin className="w-4 h-4" />
                      Work Location
                    </span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="e.g., Mumbai Office"
                  />
                </div>

                {/* Shift */}
                <div>
                  <label className="block text-sm font-medium text-slate-800 mb-2">
                    Shift
                  </label>
                  <input
                    type="text"
                    name="shift"
                    value={formData.shift}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="e.g., General (9 AM - 6 PM)"
                  />
                </div>
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Emergency Contact Name */}
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
                    placeholder="Contact person's name"
                  />
                </div>

                {/* Emergency Phone */}
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
                    placeholder="Emergency phone number"
                  />
                </div>

                {/* Emergency Relation */}
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
                    placeholder="e.g., Spouse, Parent, Sibling"
                  />
                </div>

                {/* Qualifications */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-slate-800 mb-2">
                    Qualifications
                  </label>
                  <textarea
                    name="qualifications"
                    rows="2"
                    value={formData.qualifications}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="Educational qualifications and certifications"
                  />
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-medium text-slate-800 mb-2">
                    Experience
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="e.g., 5 years"
                  />
                </div>

                {/* Skills */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-slate-800 mb-2">
                    Skills
                  </label>
                  <textarea
                    name="skills"
                    rows="2"
                    value={formData.skills}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="Comma separated skills e.g., JavaScript, React, Project Management"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between">
            <div>
              {activeStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
                >
                  Previous
                </button>
              )}
            </div>
            
            <div className="flex gap-3">
              {activeStep < totalSteps ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg shadow hover:shadow-md font-medium transition-all ${
                    isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white inline mr-2" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Creating Employee...
                    </>
                  ) : (
                    "Create Employee"
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Preview Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Employee Preview</h3>
        <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-50">
          <div className="w-20 h-20 rounded-full border-2 border-slate-300 flex items-center justify-center bg-white">
            {formData.profileImage ? (
              <img
                src={URL.createObjectURL(formData.profileImage)}
                alt="Preview"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <FiUser className="w-10 h-10 text-slate-400" />
            )}
          </div>
          <div>
            <h4 className="text-xl font-bold text-slate-800">
              {formData.firstName} {formData.lastName || "New Employee"}
            </h4>
            <p className="text-slate-600">
              {formData.role || "Role"} • {formData.department || "Department"}
            </p>
            <div className="flex gap-4 mt-2">
              <span className="text-sm text-slate-500">{formData.email || "email@company.com"}</span>
              <span className={`px-3 py-1 text-xs rounded-full ${
                formData.status === "Active" 
                  ? "bg-green-100 text-green-700" 
                  : "bg-slate-100 text-slate-700"
              }`}>
                {formData.status || "Status"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddEmployee;