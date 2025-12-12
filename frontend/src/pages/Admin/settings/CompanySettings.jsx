import React, { useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import { 
  FiSave, 
  FiUpload, 
  FiCalendar, 
  FiClock, 
  FiMapPin, 
  FiPhone, 
  FiMail, 
  FiGlobe, 
  FiLock,
  FiCheck  // Added FiCheck import
} from "react-icons/fi";

const CompanySettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const [settings, setSettings] = useState({
    general: {
      companyName: "LiteHR Solutions",
      companyEmail: "info@litehr.com",
      phone: "+1 (555) 123-4567",
      address: "123 Tech Street, Silicon Valley, CA 94000",
      website: "www.litehr.com",
      foundedYear: "2023",
      logo: null,
    },
    workingHours: {
      startTime: "09:00",
      endTime: "18:00",
      breakDuration: "60",
      workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      overtimeRate: "1.5x",
      gracePeriod: "15",
    },
    holidays: [
      { id: 1, name: "New Year's Day", date: "2025-01-01", type: "national" },
      { id: 2, name: "Republic Day", date: "2025-01-26", type: "national" },
      { id: 3, name: "Holi", date: "2025-03-14", type: "national" },
      { id: 4, name: "Independence Day", date: "2025-08-15", type: "national" },
      { id: 5, name: "Diwali", date: "2025-10-23", type: "regional" },
      { id: 6, name: "Christmas", date: "2025-12-25", type: "national" },
    ],
    security: {
      passwordMinLength: 8,
      passwordRequireUppercase: true,
      passwordRequireNumbers: true,
      passwordRequireSpecial: false,
      sessionTimeout: 30,
      twoFactorAuth: false,
    },
  });

  const [newHoliday, setNewHoliday] = useState({
    name: "",
    date: "",
    type: "national"
  });

  const handleSave = () => {
    console.log("Saving settings:", settings);
    setIsEditing(false);
    // API call would go here
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset settings to original if needed
  };

  const handleChange = (category, field, value) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [field]: value
      }
    });
  };

  const handleHolidayChange = (id, field, value) => {
    setSettings({
      ...settings,
      holidays: settings.holidays.map(holiday =>
        holiday.id === id ? { ...holiday, [field]: value } : holiday
      )
    });
  };

  const addHoliday = () => {
    if (newHoliday.name && newHoliday.date) {
      setSettings({
        ...settings,
        holidays: [...settings.holidays, {
          id: settings.holidays.length + 1,
          ...newHoliday
        }]
      });
      setNewHoliday({ name: "", date: "", type: "national" });
    }
  };

  const removeHoliday = (id) => {
    setSettings({
      ...settings,
      holidays: settings.holidays.filter(holiday => holiday.id !== id)
    });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size must be less than 2MB");
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert("File must be an image");
        return;
      }
      setSettings({
        ...settings,
        general: {
          ...settings.general,
          logo: URL.createObjectURL(file)
        }
      });
    }
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Company Settings</h1>
          <p className="text-slate-600">
            Manage company information, working hours, holidays, and security settings.
          </p>
        </div>
        
        <div className="flex gap-3">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2.5 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium"
              >
                <FiSave className="w-4 h-4" />
                Save All Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
            >
              Edit Settings
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 bg-slate-100 p-1 rounded-lg w-fit">
          {["general", "hours", "holidays", "security"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-md text-sm font-medium capitalize transition-all ${
                activeTab === tab
                  ? "bg-white text-slate-800 shadow"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              {tab === "general" ? "Company Info" :
               tab === "hours" ? "Working Hours" :
               tab === "holidays" ? "Holidays" :
               "Security"}
            </button>
          ))}
        </div>
      </div>

      {/* General Settings */}
      {activeTab === "general" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-6">Company Information</h3>
            
            {/* Logo Upload */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-slate-800 mb-4">
                Company Logo
              </label>
              <div className="flex items-center gap-6">
                <div className="w-32 h-32 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden bg-slate-50">
                  {settings.general.logo ? (
                    <img
                      src={settings.general.logo}
                      alt="Company Logo"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="text-center">
                      <FiUpload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <span className="text-sm text-slate-500">Upload Logo</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <label className="inline-flex items-center gap-2 px-4 py-3 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <FiUpload className="w-5 h-5" />
                    {isEditing ? "Change Logo" : "View Logo"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                      disabled={!isEditing}
                    />
                  </label>
                  <p className="text-sm text-slate-500 mt-2">
                    Recommended: 500x500px, PNG or JPG, max 2MB
                  </p>
                </div>
              </div>
            </div>

            {/* Company Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(settings.general)
                .filter(([key]) => key !== 'logo')
                .map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-slate-800 mb-2 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleChange("general", key, e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-slate-50 rounded-lg border border-slate-200">
                        <span className="text-slate-800">{value}</span>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Working Hours */}
      {activeTab === "hours" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-6">Working Hours Configuration</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(settings.workingHours)
                .filter(([key]) => !Array.isArray(settings.workingHours[key]))
                .map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-slate-800 mb-2 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    {isEditing ? (
                      key.includes('Time') ? (
                        <input
                          type="time"
                          value={value}
                          onChange={(e) => handleChange("workingHours", key, e.target.value)}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                      ) : (
                        <input
                          type={key.includes('Rate') ? "text" : "number"}
                          value={value}
                          onChange={(e) => handleChange("workingHours", key, e.target.value)}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                      )
                    ) : (
                      <div className="px-4 py-3 bg-slate-50 rounded-lg border border-slate-200">
                        <span className="text-slate-800">
                          {key.includes('Time') ? value :
                           key.includes('Duration') ? `${value} minutes` :
                           key.includes('Period') ? `${value} minutes` :
                           value}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
            </div>

            {/* Working Days */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-slate-800 mb-2">
                Working Days
              </label>
              <div className="flex flex-wrap gap-3">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => {
                  const isSelected = settings.workingHours.workingDays.includes(day);
                  return (
                    <label key={day} className="flex items-center gap-2 cursor-pointer">
                      {isEditing ? (
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleChange("workingHours", "workingDays", [...settings.workingHours.workingDays, day]);
                            } else {
                              handleChange("workingHours", "workingDays", settings.workingHours.workingDays.filter(d => d !== day));
                            }
                          }}
                          className="rounded border-slate-300 text-blue-500 focus:ring-blue-200"
                          disabled={!isEditing}
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

          {/* Schedule Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">Schedule Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/50 p-4 rounded-lg">
                <p className="text-sm text-blue-700">Weekly Working Hours</p>
                <p className="text-2xl font-bold text-blue-800">40 hours</p>
              </div>
              <div className="bg-white/50 p-4 rounded-lg">
                <p className="text-sm text-blue-700">Daily Working Hours</p>
                <p className="text-2xl font-bold text-blue-800">8 hours</p>
              </div>
              <div className="bg-white/50 p-4 rounded-lg">
                <p className="text-sm text-blue-700">Working Days per Week</p>
                <p className="text-2xl font-bold text-blue-800">5 days</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Holidays */}
      {activeTab === "holidays" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-slate-800">Company Holidays</h3>
              <span className="text-sm text-slate-600">{settings.holidays.length} holidays configured</span>
            </div>

            {/* Add Holiday Form */}
            {isEditing && (
              <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <h4 className="text-sm font-semibold text-slate-800 mb-3">Add New Holiday</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-800 mb-2">
                      Holiday Name
                    </label>
                    <input
                      type="text"
                      value={newHoliday.name}
                      onChange={(e) => setNewHoliday({...newHoliday, name: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      placeholder="e.g., New Year's Day"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-800 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={newHoliday.date}
                      onChange={(e) => setNewHoliday({...newHoliday, date: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-800 mb-2">
                      Type
                    </label>
                    <select
                      value={newHoliday.type}
                      onChange={(e) => setNewHoliday({...newHoliday, type: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
                    >
                      <option value="national">National Holiday</option>
                      <option value="regional">Regional Holiday</option>
                      <option value="optional">Optional Holiday</option>
                    </select>
                  </div>
                </div>
                <div className="mt-3">
                  <button
                    onClick={addHoliday}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
                  >
                    Add Holiday
                  </button>
                </div>
              </div>
            )}

            {/* Holidays List */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="p-4 text-left text-sm font-semibold text-slate-700">Holiday</th>
                    <th className="p-4 text-left text-sm font-semibold text-slate-700">Date</th>
                    <th className="p-4 text-left text-sm font-semibold text-slate-700">Type</th>
                    <th className="p-4 text-left text-sm font-semibold text-slate-700">Day</th>
                    {isEditing && (
                      <th className="p-4 text-left text-sm font-semibold text-slate-700">Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {settings.holidays.map(holiday => {
                    const date = new Date(holiday.date);
                    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
                    
                    return (
                      <tr key={holiday.id} className="hover:bg-slate-50 border-t border-slate-200">
                        <td className="p-4">
                          {isEditing ? (
                            <input
                              type="text"
                              value={holiday.name}
                              onChange={(e) => handleHolidayChange(holiday.id, 'name', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            />
                          ) : (
                            <span className="font-medium text-slate-800">{holiday.name}</span>
                          )}
                        </td>
                        <td className="p-4">
                          {isEditing ? (
                            <input
                              type="date"
                              value={holiday.date}
                              onChange={(e) => handleHolidayChange(holiday.id, 'date', e.target.value)}
                              className="px-3 py-2 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            />
                          ) : (
                            <span className="text-slate-700">{holiday.date}</span>
                          )}
                        </td>
                        <td className="p-4">
                          {isEditing ? (
                            <select
                              value={holiday.type}
                              onChange={(e) => handleHolidayChange(holiday.id, 'type', e.target.value)}
                              className="px-3 py-2 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
                            >
                              <option value="national">National</option>
                              <option value="regional">Regional</option>
                              <option value="optional">Optional</option>
                            </select>
                          ) : (
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              holiday.type === 'national' ? 'bg-blue-100 text-blue-700' :
                              holiday.type === 'regional' ? 'bg-green-100 text-green-700' :
                              'bg-amber-100 text-amber-700'
                            }`}>
                              {holiday.type.charAt(0).toUpperCase() + holiday.type.slice(1)}
                            </span>
                          )}
                        </td>
                        <td className="p-4">
                          <span className="text-slate-700">{dayName}</span>
                        </td>
                        {isEditing && (
                          <td className="p-4">
                            <button
                              onClick={() => removeHoliday(holiday.id)}
                              className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
                            >
                              Remove
                            </button>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Holiday Summary */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border border-blue-200 bg-blue-50">
                <p className="text-sm text-blue-700">National Holidays</p>
                <p className="text-2xl font-bold text-blue-800">
                  {settings.holidays.filter(h => h.type === 'national').length}
                </p>
              </div>
              <div className="p-4 rounded-lg border border-green-200 bg-green-50">
                <p className="text-sm text-green-700">Regional Holidays</p>
                <p className="text-2xl font-bold text-green-800">
                  {settings.holidays.filter(h => h.type === 'regional').length}
                </p>
              </div>
              <div className="p-4 rounded-lg border border-amber-200 bg-amber-50">
                <p className="text-sm text-amber-700">Optional Holidays</p>
                <p className="text-2xl font-bold text-amber-800">
                  {settings.holidays.filter(h => h.type === 'optional').length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security */}
      {activeTab === "security" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-6">Security Settings</h3>
            
            <div className="space-y-6">
              {/* Password Policy */}
              <div>
                <h4 className="text-lg font-semibold text-slate-800 mb-4">Password Policy</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-800 mb-2">
                      Minimum Password Length
                    </label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="6"
                        max="32"
                        value={settings.security.passwordMinLength}
                        onChange={(e) => handleChange("security", "passwordMinLength", e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-slate-50 rounded-lg border border-slate-200">
                        <span className="text-slate-800">{settings.security.passwordMinLength} characters</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-800 mb-2">
                      Session Timeout
                    </label>
                    {isEditing ? (
                      <select
                        value={settings.security.sessionTimeout}
                        onChange={(e) => handleChange("security", "sessionTimeout", e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
                      >
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="120">2 hours</option>
                      </select>
                    ) : (
                      <div className="px-4 py-3 bg-slate-50 rounded-lg border border-slate-200">
                        <span className="text-slate-800">{settings.security.sessionTimeout} minutes</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Password Requirements */}
                <div className="mt-4 space-y-3">
                  {[
                    { key: 'passwordRequireUppercase', label: 'Require uppercase letters' },
                    { key: 'passwordRequireNumbers', label: 'Require numbers' },
                    { key: 'passwordRequireSpecial', label: 'Require special characters' },
                  ].map(requirement => (
                    <label key={requirement.key} className="flex items-center gap-3 cursor-pointer">
                      {isEditing ? (
                        <input
                          type="checkbox"
                          checked={settings.security[requirement.key]}
                          onChange={(e) => handleChange("security", requirement.key, e.target.checked)}
                          className="rounded border-slate-300 text-blue-500 focus:ring-blue-200"
                        />
                      ) : (
                        <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                          settings.security[requirement.key] ? 'bg-blue-500 border-blue-500' : 'bg-white border-slate-300'
                        }`}>
                          {settings.security[requirement.key] && <FiCheck className="w-3 h-3 text-white" />}
                        </div>
                      )}
                      <span className="text-slate-700">{requirement.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Two-Factor Authentication */}
              <div>
                <h4 className="text-lg font-semibold text-slate-800 mb-4">Two-Factor Authentication</h4>
                <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 bg-slate-50">
                  <div>
                    <p className="font-medium text-slate-800">Enable 2FA for Admin Accounts</p>
                    <p className="text-sm text-slate-600">Add an extra layer of security to admin accounts</p>
                  </div>
                  {isEditing ? (
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.security.twoFactorAuth}
                        onChange={(e) => handleChange("security", "twoFactorAuth", e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  ) : (
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      settings.security.twoFactorAuth
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-700"
                    }`}>
                      {settings.security.twoFactorAuth ? "Enabled" : "Disabled"}
                    </span>
                  )}
                </div>
              </div>

              {/* Admin Password Change */}
              <div>
                <h4 className="text-lg font-semibold text-slate-800 mb-4">Admin Password</h4>
                <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
                  <p className="text-sm text-slate-600 mb-3">
                    Change the administrator password. This will log out all active admin sessions.
                  </p>
                  <button
                    disabled={!isEditing}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      isEditing
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "bg-slate-300 text-slate-500 cursor-not-allowed"
                    }`}
                  >
                    <FiLock className="inline mr-2" />
                    Change Admin Password
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Security Guidelines */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-amber-800 mb-4">Security Guidelines</h3>
            <div className="space-y-2 text-amber-700">
              <p>• Passwords must be changed every 90 days</p>
              <p>• Failed login attempts will lock the account after 5 tries</p>
              <p>• All sensitive actions are logged and monitored</p>
              <p>• Regular security audits are conducted monthly</p>
              <p>• Employee access is reviewed quarterly</p>
            </div>
          </div>
        </div>
      )}

      {/* Save/Cancel Buttons */}
      {isEditing && (
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={handleCancel}
            className="px-6 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 font-medium"
          >
            Discard Changes
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium"
          >
            <FiSave className="w-5 h-5" />
            Save All Settings
          </button>
        </div>
      )}
    </AdminLayout>
  );
};

export default CompanySettings;