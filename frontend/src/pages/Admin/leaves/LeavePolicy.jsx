import React, { useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import { FiSave, FiEdit2, FiCheck, FiX, FiCalendar, FiInfo } from "react-icons/fi";

const LeavePolicy = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    earnedLeave: {
      totalDays: 20,
      accrualRate: "1.67 days/month",
      maxAccumulation: 60,
      noticePeriod: "7 days",
      documentation: "Not required",
    },
    sickLeave: {
      totalDays: 12,
      maxPerIncident: 3,
      documentation: "Medical certificate required",
      noticePeriod: "Immediate",
    },
    casualLeave: {
      totalDays: 15,
      maxConsecutive: 3,
      noticePeriod: "1 day",
      documentation: "Not required for 1 day",
    },
    maternityLeave: {
      totalDays: 180,
      paidDays: 84,
      eligibility: "1 year of service",
      documentation: "Medical certificate required",
    },
    paternityLeave: {
      totalDays: 7,
      paidDays: 7,
      eligibility: "6 months of service",
      documentation: "Birth certificate required",
    },
    bereavementLeave: {
      totalDays: 5,
      paidDays: 3,
      relationships: ["Spouse", "Parents", "Children", "Siblings"],
      documentation: "Death certificate required",
    },
  });

  const [workingHours, setWorkingHours] = useState({
    startTime: "09:00",
    endTime: "18:00",
    breakTime: "60",
    workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    overtimeRate: "1.5x",
  });

  const handleSave = () => {
    console.log("Saving leave policy:", formData);
    setIsEditing(false);
    // API call would go here
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original if needed
  };

  const handleChange = (leaveType, field, value) => {
    setFormData({
      ...formData,
      [leaveType]: {
        ...formData[leaveType],
        [field]: value
      }
    });
  };

  const handleWorkingHoursChange = (field, value) => {
    setWorkingHours({
      ...workingHours,
      [field]: value
    });
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Leave Policy</h1>
          <p className="text-slate-600">
            Define and manage company leave policies and working hours.
          </p>
        </div>
        
        <div className="flex gap-3">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2.5 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 font-medium"
              >
                <FiX className="w-4 h-4" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium"
              >
                <FiSave className="w-4 h-4" />
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
            >
              <FiEdit2 className="w-4 h-4" />
              Edit Policy
            </button>
          )}
        </div>
      </div>

      {/* Information Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-3">
          <FiInfo className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Leave Policy Guidelines</h3>
            <p className="text-blue-700">
              These policies apply to all permanent employees. Probationary employees are eligible for casual and sick leave only.
              All leave requests must be submitted through the HR system with proper documentation where required.
            </p>
          </div>
        </div>
      </div>

      {/* Working Hours */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-slate-800">Working Hours & Days</h3>
          <span className="text-sm text-slate-600">Standard company schedule</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-800 mb-2">
              Start Time
            </label>
            {isEditing ? (
              <input
                type="time"
                value={workingHours.startTime}
                onChange={(e) => handleWorkingHoursChange("startTime", e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            ) : (
              <div className="px-4 py-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-lg font-medium text-slate-800">{workingHours.startTime}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-800 mb-2">
              End Time
            </label>
            {isEditing ? (
              <input
                type="time"
                value={workingHours.endTime}
                onChange={(e) => handleWorkingHoursChange("endTime", e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            ) : (
              <div className="px-4 py-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-lg font-medium text-slate-800">{workingHours.endTime}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-800 mb-2">
              Break Time (minutes)
            </label>
            {isEditing ? (
              <input
                type="number"
                value={workingHours.breakTime}
                onChange={(e) => handleWorkingHoursChange("breakTime", e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            ) : (
              <div className="px-4 py-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-lg font-medium text-slate-800">{workingHours.breakTime} mins</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-800 mb-2">
              Overtime Rate
            </label>
            {isEditing ? (
              <input
                type="text"
                value={workingHours.overtimeRate}
                onChange={(e) => handleWorkingHoursChange("overtimeRate", e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="e.g., 1.5x"
              />
            ) : (
              <div className="px-4 py-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-lg font-medium text-slate-800">{workingHours.overtimeRate}</span>
              </div>
            )}
          </div>
        </div>

        {/* Working Days */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-slate-800 mb-2">
            Working Days
          </label>
          <div className="flex flex-wrap gap-3">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => {
              const isSelected = workingHours.workingDays.includes(day);
              return (
                <label key={day} className="flex items-center gap-2 cursor-pointer">
                  {isEditing ? (
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleWorkingHoursChange("workingDays", [...workingHours.workingDays, day]);
                        } else {
                          handleWorkingHoursChange("workingDays", workingHours.workingDays.filter(d => d !== day));
                        }
                      }}
                      className="rounded border-slate-300 text-blue-500 focus:ring-blue-200"
                    />
                  ) : (
                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                      isSelected ? 'bg-blue-500 border-blue-500' : 'bg-white border-slate-300'
                    }`}>
                      {isSelected && <FiCheck className="w-3 h-3 text-white" />}
                    </div>
                  )}
                  <span className={`font-medium ${
                    isSelected ? 'text-slate-800' : 'text-slate-500'
                  }`}>
                    {day}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      </div>

      {/* Leave Types */}
      <div className="space-y-6">
        {/* Earned Leave */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <FiCalendar className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-800">Earned Leave / Privilege Leave</h3>
              <p className="text-slate-600">Annual paid leave accrued monthly</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(formData.earnedLeave).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-slate-800 mb-2 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleChange("earnedLeave", key, e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                ) : (
                  <div className="px-4 py-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-lg font-medium text-slate-800">{value}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sick Leave */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
              <FiCalendar className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-800">Sick Leave</h3>
              <p className="text-slate-600">Medical leave with documentation requirements</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(formData.sickLeave).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-slate-800 mb-2 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleChange("sickLeave", key, e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                ) : (
                  <div className="px-4 py-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-lg font-medium text-slate-800">{value}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Casual Leave */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <FiCalendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-800">Casual Leave</h3>
              <p className="text-slate-600">Short notice personal leave</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(formData.casualLeave).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-slate-800 mb-2 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleChange("casualLeave", key, e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                ) : (
                  <div className="px-4 py-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-lg font-medium text-slate-800">{value}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Special Leaves Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Maternity Leave */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center">
                <FiCalendar className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Maternity Leave</h3>
              </div>
            </div>

            <div className="space-y-4">
              {Object.entries(formData.maternityLeave).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-slate-800 mb-1 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleChange("maternityLeave", key, e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm"
                    />
                  ) : (
                    <div className="px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-sm font-medium text-slate-800">{value}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Paternity Leave */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <FiCalendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Paternity Leave</h3>
              </div>
            </div>

            <div className="space-y-4">
              {Object.entries(formData.paternityLeave).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-slate-800 mb-1 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleChange("paternityLeave", key, e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm"
                    />
                  ) : (
                    <div className="px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-sm font-medium text-slate-800">{value}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bereavement Leave */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                <FiCalendar className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Bereavement Leave</h3>
              </div>
            </div>

            <div className="space-y-4">
              {Object.entries(formData.bereavementLeave).map(([key, value]) => {
                if (key === 'relationships') {
                  return (
                    <div key={key}>
                      <label className="block text-sm font-medium text-slate-800 mb-1 capitalize">
                        {key}
                      </label>
                      {isEditing ? (
                        <textarea
                          value={value.join(', ')}
                          onChange={(e) => handleChange("bereavementLeave", key, e.target.value.split(', '))}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm"
                          rows="2"
                        />
                      ) : (
                        <div className="px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
                          <span className="text-sm font-medium text-slate-800">{value.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <div key={key}>
                    <label className="block text-sm font-medium text-slate-800 mb-1 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleChange("bereavementLeave", key, e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm"
                      />
                    ) : (
                      <div className="px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
                        <span className="text-sm font-medium text-slate-800">{value}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Policy Notes */}
      <div className="mt-8 bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Policy Notes & Guidelines</h3>
        <div className="space-y-3 text-slate-700">
          <p>• All leave requests must be submitted at least {formData.earnedLeave.noticePeriod} in advance (except for sick/emergency leave)</p>
          <p>• Unused leave can be carried forward up to {formData.earnedLeave.maxAccumulation} days (for earned leave only)</p>
          <p>• Medical certificate is mandatory for sick leave beyond {formData.sickLeave.maxPerIncident} consecutive days</p>
          <p>• Leave balance is updated on the 1st of every month</p>
          <p>• All policies are subject to management discretion and business requirements</p>
        </div>
      </div>

      {/* Save/Cancel Buttons */}
      {isEditing && (
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={handleCancel}
            className="px-6 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium"
          >
            <FiSave className="w-5 h-5" />
            Save All Changes
          </button>
        </div>
      )}
    </AdminLayout>
  );
};

export default LeavePolicy;