import { ThemeProvider } from "./contexts/ThemeContext";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

/* Public */
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./components/NotFound";

/* Layout */
import AdminLayout from "./layouts/AdminLayout";

/* Dashboard */
import AdminHome from "./pages/Admin/AdminHome";

/* Employees */
import EmployeeList from "./pages/Admin/employee/EmployeeList";
import AddEmployee from "./pages/Admin/employee/AddEmployee";
import EditEmployee from "./pages/Admin/employee/EditEmployee";
import EmployeeProfile from "./pages/Admin/employee/EmployeeProfile";
import ReportingHierarchy from "./pages/Admin/employee/ReportingHierarchy";

/* Departments */
import DepartmentList from "./pages/Admin/department/DepartmentList";
import AddDepartment from "./pages/Admin/department/AddDepartment";
import EditDepartment from "./pages/Admin/department/EditDepartment";
import DepartmentDetails from "./pages/Admin/department/DepartmentDetails";

/* Attendance */
import DailyAttendance from "./pages/Admin/attendance/AttendanceManagement";
import MonthlyAttendance from "./pages/Admin/attendance/MonthlyAttendance";
import AttendanceReports from "./pages/Admin/attendance/AttendanceReports";

/* Leaves */
import LeaveRequests from "./pages/Admin/leaves/LeaveRequests";
import LeavePolicy from "./pages/Admin/leaves/LeavePolicy";

/* Roles */
import RoleList from "./pages/Admin/roles/RoleList";
import AddRole from "./pages/Admin/roles/AddRole";
import EditRole from "./pages/Admin/roles/EditRole";

/* Recruitment */
import JobList from "./pages/Admin/recruitment/JobList";
import AddJob from "./pages/Admin/recruitment/AddJob";
import ApplicationsList from "./pages/Admin/recruitment/ApplicationsList";
import ApplicationDetails from "./pages/Admin/recruitment/ApplicationDetails";
import CvSummarizer from "./pages/Admin/recruitment/CVSummarizer";

/* Vault */
import VaultList from "./pages/Admin/vault/VaultList";
import UploadDocument from "./pages/Admin/vault/UploadDocument";

/* Analytics */
import AdminAnalytics from "./pages/Admin/analytics/AdminAnalytics";

/* Notifications */
import Notifications from "./pages/Admin/notifications/Notifications";

/* Settings */
import CompanySettings from "./pages/Admin/settings/CompanySettings";

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await axios.get("/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch {
        localStorage.removeItem("token");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  /* Auth Guard */
  const AdminRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" />;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        Loading LiteHR...
      </div>
    );
  }

  return (
      <ThemeProvider>
    <Routes>
      {/* Public */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route
        path="/login"
        element={user ? <Navigate to="/admin/dashboard" /> : <Login setUser={setUser} />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/admin/dashboard" /> : <Register setUser={setUser} />}
      />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* ================= ADMIN (SINGLE SOURCE OF TRUTH) ================= */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        {/* Dashboard */}
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<AdminHome />} />

        {/* Employees */}
        <Route path="employees" element={<EmployeeList />} />
        <Route path="employees/add" element={<AddEmployee />} />
        <Route path="employees/edit/:id" element={<EditEmployee />} />
        <Route path="employees/:id" element={<EmployeeProfile />} />
        <Route path="employees/hierarchy" element={<ReportingHierarchy />} />

        {/* Departments */}
        <Route path="departments" element={<DepartmentList />} />
        <Route path="departments/add" element={<AddDepartment />} />
        <Route path="departments/edit/:id" element={<EditDepartment />} />
        <Route path="departments/:id" element={<DepartmentDetails />} />

        {/* Roles */}
        <Route path="roles" element={<RoleList />} />
        <Route path="roles/add" element={<AddRole />} />
        <Route path="roles/edit/:id" element={<EditRole />} />

        {/* Attendance */}
        <Route path="attendance/daily" element={<DailyAttendance />} />
        <Route path="attendance/monthly" element={<MonthlyAttendance />} />
        <Route path="attendance/reports" element={<AttendanceReports />} />

        {/* Leaves */}
        <Route path="leaves/requests" element={<LeaveRequests />} />
        <Route path="leaves/policy" element={<LeavePolicy />} />

        {/* Recruitment */}
        <Route path="recruitment/jobs" element={<JobList />} />
        <Route path="recruitment/add-job" element={<AddJob />} />
        <Route path="recruitment/applications" element={<ApplicationsList />} />
        <Route path="recruitment/applications/:id" element={<ApplicationDetails />} />
        <Route path="recruitment/cv-summarizer" element={<CvSummarizer />} />

        {/* Vault */}
        <Route path="vault" element={<VaultList />} />
        <Route path="vault/upload" element={<UploadDocument />} />

        {/* Analytics */}
        <Route path="analytics" element={<AdminAnalytics />} />

        {/* Notifications */}
        <Route path="notifications" element={<Notifications />} />

        {/* Settings */}
        <Route path="settings" element={<CompanySettings />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
      </ThemeProvider>
  );
}

export default App;
