import React, { useState } from "react";
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
  FiCheck,
  FiShield,
  FiAlertCircle
} from "react-icons/fi";
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { useTheme ,useThemeClasses} from "../../../contexts/ThemeContext";

const CompanySettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const darkMode = useTheme() || false; // Default to false if undefined
  const theme = useThemeClasses();

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
      loginAttempts: 5,
      accountLockout: 30,
    },
  });

  // Data for visualizations
  const holidayTypeData = [
    { name: "National", value: 4, color: "#8B5CF6" },
    { name: "Regional", value: 1, color: "#10B981" },
    { name: "Optional", value: 1, color: "#F59E0B" }
  ];

  const monthlyHolidays = [
    { month: "Jan", holidays: 2 },
    { month: "Feb", holidays: 0 },
    { month: "Mar", holidays: 1 },
    { month: "Apr", holidays: 0 },
    { month: "May", holidays: 0 },
    { month: "Jun", holidays: 0 },
    { month: "Jul", holidays: 0 },
    { month: "Aug", holidays: 1 },
    { month: "Sep", holidays: 0 },
    { month: "Oct", holidays: 1 },
    { month: "Nov", holidays: 0 },
    { month: "Dec", holidays: 1 },
  ];

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

  // Helper functions for theme
  const getBgColor = () => darkMode ? "bg-gray-800" : "bg-white";
  const getBorderColor = () => darkMode ? "border-gray-700" : "border-gray-200";
  const getTextColor = () => darkMode ? "text-white" : "text-gray-800";
  const getSecondaryTextColor = () => darkMode ? "text-gray-400" : "text-gray-600";
  const getInputBg = () => darkMode ? "bg-gray-900" : "bg-gray-50";
  const getCardBg = () => darkMode ? "bg-gray-700/50" : "bg-gray-100";

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        <div>
          <h1 className={`text-3xl font-bold ${getTextColor()} mb-2`}>
            Company Settings
          </h1>
          <p className={getSecondaryTextColor()}>
            Manage company information, working hours, holidays, and security settings.
          </p>
        </div>
        
        <div className="flex gap-3">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className={`px-4 py-2.5 ${getInputBg()} border ${getBorderColor()} ${getSecondaryTextColor()} rounded-lg hover:border-rose-500 hover:text-rose-300 font-medium transition-colors`}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
              >
                <FiSave className="w-4 h-4" />
                Save All Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
            >
              Edit Settings
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className={`flex flex-wrap gap-2 ${getBgColor()} p-1 rounded-lg w-fit border ${getBorderColor()}`}>
          {["general", "hours", "holidays", "security"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-md text-sm font-medium capitalize transition-all ${
                activeTab === tab
                  ? "bg-purple-600 text-white"
                  : `${getSecondaryTextColor()} hover:text-purple-600 hover:${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`
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
          <div className={`${getBgColor()} rounded-xl p-6 border ${getBorderColor()} shadow-sm`}>
            <h3 className={`text-xl font-semibold ${getTextColor()} mb-6`}>Company Information</h3>
            
            {/* Logo Upload */}
            <div className="mb-8">
              <label className={`block text-sm font-medium ${getTextColor()} mb-4`}>
                Company Logo
              </label>
              <div className="flex items-center gap-6">
                <div className={`w-32 h-32 rounded-lg border-2 border-dashed ${getBorderColor()} flex items-center justify-center overflow-hidden ${getInputBg()}`}>
                  {settings.general.logo ? (
                    <img
                      src={settings.general.logo}
                      alt="Company Logo"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="text-center">
                      <FiUpload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                      <span className={`text-sm ${getSecondaryTextColor()}`}>Upload Logo</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <label className={`inline-flex items-center gap-2 px-4 py-3 rounded-lg cursor-pointer ${
                    isEditing 
                      ? `${getInputBg()} border ${getBorderColor()} ${getSecondaryTextColor()} hover:border-purple-500 hover:text-purple-600`
                      : `${getInputBg()}/50 border ${getBorderColor()} text-gray-500 cursor-not-allowed`
                  } transition-colors`}>
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
                  <p className="text-sm text-gray-500 mt-2">
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
                    <label className={`block text-sm font-medium ${getSecondaryTextColor()} mb-2 capitalize`}>
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleChange("general", key, e.target.value)}
                        className={`w-full px-4 py-3 ${getInputBg()} border ${getBorderColor()} rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 ${getTextColor()} placeholder-gray-400 transition-all`}
                      />
                    ) : (
                      <div className={`px-4 py-3 ${getInputBg()} rounded-lg border ${getBorderColor()}`}>
                        <span className={getTextColor()}>{value}</span>
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
          <div className={`${getBgColor()} rounded-xl p-6 border ${getBorderColor()} shadow-sm`}>
            <h3 className={`text-xl font-semibold ${getTextColor()} mb-6`}>Working Hours Configuration</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(settings.workingHours)
                .filter(([key]) => !Array.isArray(settings.workingHours[key]))
                .map(([key, value]) => (
                  <div key={key}>
                    <label className={`block text-sm font-medium ${getSecondaryTextColor()} mb-2 capitalize`}>
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    {isEditing ? (
                      key.includes('Time') ? (
                        <input
                          type="time"
                          value={value}
                          onChange={(e) => handleChange("workingHours", key, e.target.value)}
                          className={`w-full px-4 py-3 ${getInputBg()} border ${getBorderColor()} rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 ${getTextColor()} transition-all`}
                        />
                      ) : (
                        <input
                          type={key.includes('Rate') ? "text" : "number"}
                          value={value}
                          onChange={(e) => handleChange("workingHours", key, e.target.value)}
                          className={`w-full px-4 py-3 ${getInputBg()} border ${getBorderColor()} rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 ${getTextColor()} transition-all`}
                        />
                      )
                    ) : (
                      <div className={`px-4 py-3 ${getInputBg()} rounded-lg border ${getBorderColor()}`}>
                        <span className={getTextColor()}>
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
              <label className={`block text-sm font-medium ${getSecondaryTextColor()} mb-2`}>
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
                          className={`rounded ${getBorderColor()} ${getInputBg()} text-purple-500 focus:ring-purple-500/20`}
                          disabled={!isEditing}
                        />
                      ) : (
                        <div className={`w-5 h-5 border rounded flex items-center justify-center ${
                          isSelected ? 'bg-purple-600 border-purple-500/50' : `${getInputBg()} ${getBorderColor()}`
                        }`}>
                          {isSelected && <FiCheck className="w-3 h-3 text-white" />}
                        </div>
                      )}
                      <span className={`font-medium ${
                        isSelected ? getTextColor() : getSecondaryTextColor()
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
          <div className={`${darkMode ? 'bg-purple-900/30' : 'bg-purple-50'} border ${darkMode ? 'border-purple-500/30' : 'border-purple-200'} rounded-xl p-6`}>
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-purple-300' : 'text-purple-700'} mb-4`}>Schedule Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`${darkMode ? 'bg-gray-900/50' : 'bg-white/80'} backdrop-blur-sm p-4 rounded-xl border ${getBorderColor()}`}>
                <p className={`text-sm ${darkMode ? 'text-purple-300' : 'text-purple-600'}`}>Weekly Working Hours</p>
                <p className={`text-2xl font-bold ${getTextColor()}`}>40 hours</p>
              </div>
              <div className={`${darkMode ? 'bg-gray-900/50' : 'bg-white/80'} backdrop-blur-sm p-4 rounded-xl border ${getBorderColor()}`}>
                <p className={`text-sm ${darkMode ? 'text-purple-300' : 'text-purple-600'}`}>Daily Working Hours</p>
                <p className={`text-2xl font-bold ${getTextColor()}`}>8 hours</p>
              </div>
              <div className={`${darkMode ? 'bg-gray-900/50' : 'bg-white/80'} backdrop-blur-sm p-4 rounded-xl border ${getBorderColor()}`}>
                <p className={`text-sm ${darkMode ? 'text-purple-300' : 'text-purple-600'}`}>Working Days per Week</p>
                <p className={`text-2xl font-bold ${getTextColor()}`}>5 days</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Holidays - Enhanced with Charts */}
      {activeTab === "holidays" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Holiday Charts */}
            <div className="lg:col-span-2 space-y-6">
              <div className={`${getBgColor()} rounded-xl p-6 border ${getBorderColor()} shadow-sm`}>
                <div className="flex justify-between items-center mb-6">
                  <h3 className={`text-xl font-semibold ${getTextColor()}`}>Company Holidays</h3>
                  <span className={`text-sm ${getSecondaryTextColor()}`}>{settings.holidays.length} holidays configured</span>
                </div>

                {/* Add Holiday Form */}
                {isEditing && (
                  <div className={`mb-6 p-4 ${getInputBg()} rounded-xl border ${getBorderColor()}`}>
                    <h4 className={`text-sm font-semibold ${getTextColor()} mb-3`}>Add New Holiday</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className={`block text-sm font-medium ${getTextColor()} mb-2`}>
                          Holiday Name
                        </label>
                        <input
                          type="text"
                          value={newHoliday.name}
                          onChange={(e) => setNewHoliday({...newHoliday, name: e.target.value})}
                          className={`w-full px-4 py-2 ${getInputBg()} border ${getBorderColor()} rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 ${getTextColor()} placeholder-gray-400 transition-all`}
                          placeholder="e.g., New Year's Day"
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${getTextColor()} mb-2`}>
                          Date
                        </label>
                        <input
                          type="date"
                          value={newHoliday.date}
                          onChange={(e) => setNewHoliday({...newHoliday, date: e.target.value})}
                          className={`w-full px-4 py-2 ${getInputBg()} border ${getBorderColor()} rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 ${getTextColor()} transition-all`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${getTextColor()} mb-2`}>
                          Type
                        </label>
                        <select
                          value={newHoliday.type}
                          onChange={(e) => setNewHoliday({...newHoliday, type: e.target.value})}
                          className={`w-full px-4 py-2 ${getInputBg()} border ${getBorderColor()} rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 ${getTextColor()} transition-all`}
                        >
                          <option value="national" className={darkMode ? "bg-gray-800" : "bg-white"}>National Holiday</option>
                          <option value="regional" className={darkMode ? "bg-gray-800" : "bg-white"}>Regional Holiday</option>
                          <option value="optional" className={darkMode ? "bg-gray-800" : "bg-white"}>Optional Holiday</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-3">
                      <button
                        onClick={addHoliday}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition-colors"
                      >
                        Add Holiday
                      </button>
                    </div>
                  </div>
                )}

                {/* Holidays List */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className={darkMode ? "bg-gray-900/50" : "bg-gray-50"}>
                      <tr>
                        <th className={`p-4 text-left text-sm font-semibold ${getSecondaryTextColor()}`}>Holiday</th>
                        <th className={`p-4 text-left text-sm font-semibold ${getSecondaryTextColor()}`}>Date</th>
                        <th className={`p-4 text-left text-sm font-semibold ${getSecondaryTextColor()}`}>Type</th>
                        <th className={`p-4 text-left text-sm font-semibold ${getSecondaryTextColor()}`}>Day</th>
                        {isEditing && (
                          <th className={`p-4 text-left text-sm font-semibold ${getSecondaryTextColor()}`}>Actions</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {settings.holidays.map(holiday => {
                        const date = new Date(holiday.date);
                        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
                        
                        return (
                          <tr key={holiday.id} className={darkMode ? "hover:bg-gray-900/30 border-t border-gray-700/50" : "hover:bg-gray-50/50 border-t border-gray-200/50"}>
                            <td className="p-4">
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={holiday.name}
                                  onChange={(e) => handleHolidayChange(holiday.id, 'name', e.target.value)}
                                  className={`w-full px-3 py-2 ${getInputBg()} border ${getBorderColor()} rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 ${getTextColor()} transition-all`}
                                />
                              ) : (
                                <span className={`font-medium ${getTextColor()}`}>{holiday.name}</span>
                              )}
                            </td>
                            <td className="p-4">
                              {isEditing ? (
                                <input
                                  type="date"
                                  value={holiday.date}
                                  onChange={(e) => handleHolidayChange(holiday.id, 'date', e.target.value)}
                                  className={`px-3 py-2 ${getInputBg()} border ${getBorderColor()} rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 ${getTextColor()} transition-all`}
                                />
                              ) : (
                                <span className={getTextColor()}>{holiday.date}</span>
                              )}
                            </td>
                            <td className="p-4">
                              {isEditing ? (
                                <select
                                  value={holiday.type}
                                  onChange={(e) => handleHolidayChange(holiday.id, 'type', e.target.value)}
                                  className={`px-3 py-2 ${getInputBg()} border ${getBorderColor()} rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 ${getTextColor()} transition-all`}
                                >
                                  <option value="national" className={darkMode ? "bg-gray-800" : "bg-white"}>National</option>
                                  <option value="regional" className={darkMode ? "bg-gray-800" : "bg-white"}>Regional</option>
                                  <option value="optional" className={darkMode ? "bg-gray-800" : "bg-white"}>Optional</option>
                                </select>
                              ) : (
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  holiday.type === 'national' ? (darkMode ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-purple-100 text-purple-800 border border-purple-200') :
                                  holiday.type === 'regional' ? (darkMode ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-emerald-100 text-emerald-800 border border-emerald-200') :
                                  (darkMode ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-amber-100 text-amber-800 border border-amber-200')
                                }`}>
                                  {holiday.type.charAt(0).toUpperCase() + holiday.type.slice(1)}
                                </span>
                              )}
                            </td>
                            <td className="p-4">
                              <span className={getTextColor()}>{dayName}</span>
                            </td>
                            {isEditing && (
                              <td className="p-4">
                                <button
                                  onClick={() => removeHoliday(holiday.id)}
                                  className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-sm transition-colors"
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
              </div>
            </div>

            {/* Holiday Charts Sidebar */}
            <div className="space-y-6">
              {/* Holiday Type Distribution */}
              <div className={`${getBgColor()} rounded-xl p-6 border ${getBorderColor()} shadow-sm`}>
                <h4 className={`text-lg font-semibold ${getTextColor()} mb-4`}>Holiday Types</h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={holidayTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {holidayTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} holidays`, 'Count']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-2">
                  {holidayTypeData.map((type, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: type.color }}></div>
                        <span className={`text-sm ${getSecondaryTextColor()}`}>{type.name}</span>
                      </div>
                      <span className={`text-sm font-medium ${getTextColor()}`}>{type.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Monthly Distribution */}
              <div className={`${getBgColor()} rounded-xl p-6 border ${getBorderColor()} shadow-sm`}>
                <h4 className={`text-lg font-semibold ${getTextColor()} mb-4`}>Monthly Distribution</h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyHolidays}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#E5E7EB"} />
                      <XAxis dataKey="month" stroke={darkMode ? "#9CA3AF" : "#6B7280"} />
                      <YAxis stroke={darkMode ? "#9CA3AF" : "#6B7280"} />
                      <Tooltip />
                      <Bar dataKey="holidays" name="Holidays" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Holiday Summary */}
              <div className={`${darkMode ? 'bg-purple-900/30' : 'bg-purple-50'} border ${darkMode ? 'border-purple-500/30' : 'border-purple-200'} rounded-xl p-4`}>
                <h4 className={`text-sm font-semibold ${darkMode ? 'text-purple-300' : 'text-purple-700'} mb-3`}>Holiday Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className={`text-sm ${getSecondaryTextColor()}`}>Total Holidays</span>
                    <span className={`text-sm font-medium ${getTextColor()}`}>{settings.holidays.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${getSecondaryTextColor()}`}>National Holidays</span>
                    <span className={`text-sm font-medium ${getTextColor()}`}>{settings.holidays.filter(h => h.type === 'national').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${getSecondaryTextColor()}`}>Regional Holidays</span>
                    <span className={`text-sm font-medium ${getTextColor()}`}>{settings.holidays.filter(h => h.type === 'regional').length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security - Enhanced with Purple Theme */}
      {activeTab === "security" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Security Settings */}
            <div className="lg:col-span-2">
              <div className={`${getBgColor()} rounded-xl p-6 border ${getBorderColor()} shadow-sm`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-full ${darkMode ? 'bg-purple-500/20' : 'bg-purple-100'} flex items-center justify-center`}>
                    <FiShield className={`w-5 h-5 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                  </div>
                  <h3 className={`text-xl font-semibold ${getTextColor()}`}>Security Settings</h3>
                </div>
                
                <div className="space-y-6">
                  {/* Password Policy */}
                  <div>
                    <h4 className={`text-lg font-semibold ${getTextColor()} mb-4`}>Password Policy</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={`block text-sm font-medium ${getSecondaryTextColor()} mb-2`}>
                          Minimum Password Length
                        </label>
                        {isEditing ? (
                          <input
                            type="number"
                            min="6"
                            max="32"
                            value={settings.security.passwordMinLength}
                            onChange={(e) => handleChange("security", "passwordMinLength", e.target.value)}
                            className={`w-full px-4 py-3 ${getInputBg()} border ${getBorderColor()} rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 ${getTextColor()} transition-all`}
                          />
                        ) : (
                          <div className={`px-4 py-3 ${getInputBg()} rounded-lg border ${getBorderColor()}`}>
                            <span className={getTextColor()}>{settings.security.passwordMinLength} characters</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className={`block text-sm font-medium ${getSecondaryTextColor()} mb-2`}>
                          Session Timeout
                        </label>
                        {isEditing ? (
                          <select
                            value={settings.security.sessionTimeout}
                            onChange={(e) => handleChange("security", "sessionTimeout", e.target.value)}
                            className={`w-full px-4 py-3 ${getInputBg()} border ${getBorderColor()} rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 ${getTextColor()} transition-all`}
                          >
                            <option value="15" className={darkMode ? "bg-gray-800" : "bg-white"}>15 minutes</option>
                            <option value="30" className={darkMode ? "bg-gray-800" : "bg-white"}>30 minutes</option>
                            <option value="60" className={darkMode ? "bg-gray-800" : "bg-white"}>1 hour</option>
                            <option value="120" className={darkMode ? "bg-gray-800" : "bg-white"}>2 hours</option>
                          </select>
                        ) : (
                          <div className={`px-4 py-3 ${getInputBg()} rounded-lg border ${getBorderColor()}`}>
                            <span className={getTextColor()}>{settings.security.sessionTimeout} minutes</span>
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
                              className={`rounded ${getBorderColor()} ${getInputBg()} text-purple-500 focus:ring-purple-500/20`}
                            />
                          ) : (
                            <div className={`w-5 h-5 border rounded flex items-center justify-center ${
                              settings.security[requirement.key] ? 'bg-purple-600 border-purple-500/50' : `${getInputBg()} ${getBorderColor()}`
                            }`}>
                              {settings.security[requirement.key] && <FiCheck className="w-3 h-3 text-white" />}
                            </div>
                          )}
                          <span className={getTextColor()}>{requirement.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Two-Factor Authentication */}
                  <div>
                    <h4 className={`text-lg font-semibold ${getTextColor()} mb-4`}>Two-Factor Authentication</h4>
                    <div className={`flex items-center justify-between p-4 rounded-xl border ${getBorderColor()} ${getCardBg()}`}>
                      <div>
                        <p className={`font-medium ${getTextColor()}`}>Enable 2FA for Admin Accounts</p>
                        <p className={`text-sm ${getSecondaryTextColor()}`}>Add an extra layer of security to admin accounts</p>
                      </div>
                      {isEditing ? (
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.security.twoFactorAuth}
                            onChange={(e) => handleChange("security", "twoFactorAuth", e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      ) : (
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          settings.security.twoFactorAuth
                            ? (darkMode ? "bg-purple-500/20 text-purple-300 border border-purple-500/30" : "bg-purple-100 text-purple-800 border border-purple-200")
                            : `${getInputBg()} ${getSecondaryTextColor()} border ${getBorderColor()}`
                        }`}>
                          {settings.security.twoFactorAuth ? "Enabled" : "Disabled"}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Login Security */}
                  <div>
                    <h4 className={`text-lg font-semibold ${getTextColor()} mb-4`}>Login Security</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={`block text-sm font-medium ${getSecondaryTextColor()} mb-2`}>
                          Failed Login Attempts
                        </label>
                        {isEditing ? (
                          <input
                            type="number"
                            min="3"
                            max="10"
                            value={settings.security.loginAttempts}
                            onChange={(e) => handleChange("security", "loginAttempts", e.target.value)}
                            className={`w-full px-4 py-3 ${getInputBg()} border ${getBorderColor()} rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 ${getTextColor()} transition-all`}
                          />
                        ) : (
                          <div className={`px-4 py-3 ${getInputBg()} rounded-lg border ${getBorderColor()}`}>
                            <span className={getTextColor()}>{settings.security.loginAttempts} attempts</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${getSecondaryTextColor()} mb-2`}>
                          Account Lockout Duration
                        </label>
                        {isEditing ? (
                          <input
                            type="number"
                            min="5"
                            max="60"
                            value={settings.security.accountLockout}
                            onChange={(e) => handleChange("security", "accountLockout", e.target.value)}
                            className={`w-full px-4 py-3 ${getInputBg()} border ${getBorderColor()} rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 ${getTextColor()} transition-all`}
                          />
                        ) : (
                          <div className={`px-4 py-3 ${getInputBg()} rounded-lg border ${getBorderColor()}`}>
                            <span className={getTextColor()}>{settings.security.accountLockout} minutes</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Admin Password Change */}
                  <div>
                    <h4 className={`text-lg font-semibold ${getTextColor()} mb-4`}>Admin Password</h4>
                    <div className={`p-4 rounded-xl border ${getBorderColor()} ${getCardBg()}`}>
                      <p className={`text-sm ${getSecondaryTextColor()} mb-3`}>
                        Change the administrator password. This will log out all active admin sessions.
                      </p>
                      <button
                        disabled={!isEditing}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          isEditing
                            ? "bg-purple-600 hover:bg-purple-700 text-white"
                            : `${getInputBg()} text-gray-500 cursor-not-allowed`
                        }`}
                      >
                        <FiLock className="inline mr-2" />
                        Change Admin Password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Sidebar */}
            <div className="space-y-6">
              {/* Security Status */}
              <div className={`${darkMode ? 'bg-purple-900/30' : 'bg-purple-50'} border ${darkMode ? 'border-purple-500/30' : 'border-purple-200'} rounded-xl p-6`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-full ${darkMode ? 'bg-purple-500/20' : 'bg-purple-100'} flex items-center justify-center`}>
                    <FiShield className={`w-5 h-5 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                  </div>
                  <h4 className={`text-lg font-semibold ${darkMode ? 'text-purple-300' : 'text-purple-700'}`}>Security Status</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${getTextColor()}`}>Password Strength</span>
                    <span className="text-sm font-medium text-emerald-400">Strong</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${getTextColor()}`}>2FA Status</span>
                    <span className={`text-sm font-medium ${settings.security.twoFactorAuth ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {settings.security.twoFactorAuth ? 'Enabled' : 'Recommended'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${getTextColor()}`}>Last Security Audit</span>
                    <span className="text-sm font-medium text-emerald-400">Passed</span>
                  </div>
                </div>
              </div>

              {/* Security Guidelines */}
              <div className={`${getBgColor()} rounded-xl p-6 border ${getBorderColor()} shadow-sm`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-full ${darkMode ? 'bg-amber-500/20' : 'bg-amber-100'} flex items-center justify-center`}>
                    <FiAlertCircle className={`w-5 h-5 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`} />
                  </div>
                  <h4 className={`text-lg font-semibold ${getTextColor()}`}>Security Guidelines</h4>
                </div>
                <div className={`space-y-2 ${getTextColor()}`}>
                  <p className="text-sm">• Passwords must be changed every 90 days</p>
                  <p className="text-sm">• Failed login attempts will lock the account after 5 tries</p>
                  <p className="text-sm">• All sensitive actions are logged and monitored</p>
                  <p className="text-sm">• Regular security audits are conducted monthly</p>
                  <p className="text-sm">• Employee access is reviewed quarterly</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className={`${getBgColor()} rounded-xl p-6 border ${getBorderColor()} shadow-sm`}>
                <h4 className={`text-lg font-semibold ${getTextColor()} mb-4`}>Quick Actions</h4>
                <div className="space-y-3">
                  <button className={`w-full px-4 py-3 ${getInputBg()} border ${getBorderColor()} rounded-lg ${getSecondaryTextColor()} hover:border-purple-500 hover:text-purple-600 transition-colors text-left`}>
                    Generate Security Report
                  </button>
                  <button className={`w-full px-4 py-3 ${getInputBg()} border ${getBorderColor()} rounded-lg ${getSecondaryTextColor()} hover:border-purple-500 hover:text-purple-600 transition-colors text-left`}>
                    View Access Logs
                  </button>
                  <button className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                    Run Security Audit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Save/Cancel Buttons */}
      {isEditing && (
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={handleCancel}
            className={`px-6 py-3 ${getInputBg()} border ${getBorderColor()} ${getSecondaryTextColor()} rounded-lg hover:border-rose-500 hover:text-rose-300 font-medium transition-colors`}
          >
            Discard Changes
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
          >
            <FiSave className="w-5 h-5" />
            Save All Settings
          </button>
        </div>
      )}
    </div>
  );
};

export default CompanySettings;