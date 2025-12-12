import {
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect, useState } from "react";
import axios from "axios";
import NotFound from "./components/NotFound";
import ResetPassword from "./pages/ResetPassword";
import AdminHome from "./pages/Admin/AdminHome";

// Employee Routes
import EmployeeList from "./pages/Admin/employee/EmployeeList";
import AddEmployee from "./pages/Admin/employee/AddEmployee";
import EditEmployee from "./pages/Admin/employee/EditEmployee";
import EmployeeProfile from "./pages/Admin/employee/EmployeeProfile";

// Department Routes
import DepartmentList from "./pages/Admin/department/DepartmentList";
import AddDepartment from "./pages/Admin/department/AddDepartment";
import EditDepartment from "./pages/Admin/department/EditDepartment";
import DepartmentDetails from "./pages/Admin/department/DepartmentDetails";

// Attendance Routes
import DailyAttendance from "./pages/Admin/attendance/AttendanceManagement";
import MonthlyAttendance from "./pages/Admin/attendance/MonthlyAttendance";
import AttendanceReports from "./pages/Admin/attendance/AttendanceReports";

// Leave Routes
import LeaveRequests from "./pages/Admin/leaves/LeaveRequests";
import LeavePolicy from "./pages/Admin/leaves/LeavePolicy";

// Settings Routes
import CompanySettings from "./pages/Admin/settings/CompanySettings";

function App() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await axios.get("/api/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data);
        } catch (err) {
          setError("Failed to fetch user data");
          localStorage.removeItem("token");
        }
      }
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  // Redirect to login if trying to access admin without authentication
  const AdminRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-slate-300 border-t-blue-500 rounded-full animate-spin"></div>
          <div className="text-lg text-white">Loading LiteHR...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      {!location.pathname.startsWith("/admin") && (
        <Navbar user={user} setUser={setUser} />
      )}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home user={user} error={error} />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/admin/dashboard" /> : <Login setUser={setUser} />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/admin/dashboard" /> : <Register setUser={setUser} />}
        />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Admin Dashboard */}
        <Route 
          path="/admin/dashboard" 
          element={
            <AdminRoute>
              <AdminHome />
            </AdminRoute>
          } 
        />

        {/* Employee Management */}
        <Route 
          path="/admin/employees" 
          element={
            <AdminRoute>
              <EmployeeList />
            </AdminRoute>
          } 
        />
        <Route 
          path="/admin/employees/add" 
          element={
            <AdminRoute>
              <AddEmployee />
            </AdminRoute>
          } 
        />
        <Route 
          path="/admin/employees/edit/:id" 
          element={
            <AdminRoute>
              <EditEmployee />
            </AdminRoute>
          } 
        />
        <Route 
          path="/admin/employees/:id" 
          element={
            <AdminRoute>
              <EmployeeProfile />
            </AdminRoute>
          } 
        />

        {/* Department Management */}
        <Route 
          path="/admin/departments" 
          element={
            <AdminRoute>
              <DepartmentList />
            </AdminRoute>
          } 
        />
        <Route 
          path="/admin/departments/add" 
          element={
            <AdminRoute>
              <AddDepartment />
            </AdminRoute>
          } 
        />
        <Route 
          path="/admin/departments/edit/:id" 
          element={
            <AdminRoute>
              <EditDepartment />
            </AdminRoute>
          } 
        />
        <Route 
          path="/admin/departments/:id" 
          element={
            <AdminRoute>
              <DepartmentDetails />
            </AdminRoute>
          } 
        />

        {/* Attendance Management */}
        <Route 
          path="/admin/attendance/daily" 
          element={
            <AdminRoute>
              <DailyAttendance />
            </AdminRoute>
          } 
        />
        <Route 
          path="/admin/attendance/monthly" 
          element={
            <AdminRoute>
              <MonthlyAttendance />
            </AdminRoute>
          } 
        />
        <Route 
          path="/admin/attendance/reports" 
          element={
            <AdminRoute>
              <AttendanceReports />
            </AdminRoute>
          } 
        />

        {/* Leave Management */}
        <Route 
          path="/admin/leaves/requests" 
          element={
            <AdminRoute>
              <LeaveRequests />
            </AdminRoute>
          } 
        />
        <Route 
          path="/admin/leaves/policy" 
          element={
            <AdminRoute>
              <LeavePolicy />
            </AdminRoute>
          } 
        />

        {/* Settings */}
        <Route 
          path="/admin/settings" 
          element={
            <AdminRoute>
              <CompanySettings />
            </AdminRoute>
          } 
        />

        {/* Redirects */}
        <Route 
          path="/admin" 
          element={<Navigate to="/admin/dashboard" />} 
        />
        <Route 
          path="/admin/attendance" 
          element={<Navigate to="/admin/attendance/daily" />} 
        />
        <Route 
          path="/admin/leaves" 
          element={<Navigate to="/admin/leaves/requests" />} 
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;