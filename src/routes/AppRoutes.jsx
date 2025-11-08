import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { Navigate } from "react-router-dom";
import { ROLES } from "../utils/constants";

//
import Home from "../pages/Home";
import Login from "../pages/authentications/Login";

// Error
import NotFound from "../pages/errors/NotFound";
import Forbidden from "../pages/errors/Forbidden";

// Admin
import User from "../pages/user/User";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import WorkSpace from "../pages/workspace/WorkSpace";
import Crm from "../pages/crm/Crm";
import Payroll from "../pages/finance/Payroll";
import Invoice from "../pages/finance/Invoice";
import Employee from "../pages/hr/Employee";
import Attendance from "../pages/hr/Attendance";
import Request from "../pages/hr/Request";
import Inventory from "../pages/inventory/Inventory";
import Marketing from "../pages/marketing/Marketing";
import Project from "../pages/project/Project";
import Milestone from "../pages/project/Milestone";
import Report from "../pages/report/Report";

// Client
import ClientCrm from "../pages/crm/ClientCrm";
import ClientPayroll from "../pages/finance/ClientPayroll";
import ClientInvoice from "../pages/finance/ClientInvoice";
import ClientEmployee from "../pages/hr/ClientEmployee";
import ClientAttendance from "../pages/hr/ClientAttendance";
import ClientRequest from "../pages/hr/ClientRequest";
import ClientInventory from "../pages/inventory/ClientInventory";
import ClientMarketing from "../pages/marketing/ClientMarketing";
import ClientProject from "../pages/project/ClientProject";
import ClientMilestone from "../pages/project/ClientMilestone";
import ClientReport from "../pages/report/ClientReport";
import ClientUser from "../pages/user/ClientUser";
import ClientDashboard from "../pages/dashboard/ClientDashboard";
import ClientDashboardLayout from "../pages/dashboard/ClientDashboardLayout";
import WorkspaceForm from "../pages/workspace/WorkspaceForm";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={[ROLES.S_ADMIN]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute roles={[ROLES.S_ADMIN]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/work-spaces"
          element={
            <ProtectedRoute roles={[ROLES.S_ADMIN]}>
              <WorkSpace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute roles={[ROLES.S_ADMIN]}>
              <User />
            </ProtectedRoute>
          }
        />
        {/* HR*/}
        <Route
          path="/admin/hr/employees"
          element={
            <ProtectedRoute roles={[ROLES.S_ADMIN, ROLES.ADMIN]}>
              <Employee />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/hr/attendances"
          element={
            <ProtectedRoute roles={[ROLES.S_ADMIN, ROLES.ADMIN]}>
              <Attendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/hr/requests"
          element={
            <ProtectedRoute roles={[ROLES.S_ADMIN, ROLES.ADMIN]}>
              <Request />
            </ProtectedRoute>
          }
        />

        {/* Finance */}
        <Route
          path="/admin/finance/payrolls"
          element={
            <ProtectedRoute roles={[ROLES.S_ADMIN, ROLES.ADMIN]}>
              <Payroll />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/finance/invoices"
          element={
            <ProtectedRoute roles={[ROLES.S_ADMIN, ROLES.ADMIN]}>
              <Invoice />
            </ProtectedRoute>
          }
        />

        {/* Client CRM */}
        <Route
          path="/admin/crm"
          element={
            <ProtectedRoute roles={[ROLES.S_ADMIN, ROLES.ADMIN]}>
              <Crm />
            </ProtectedRoute>
          }
        />

        {/* Projects */}
        <Route
          path="/admin/projects/all"
          element={
            <ProtectedRoute roles={[ROLES.S_ADMIN, ROLES.ADMIN]}>
              <Project />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/projects/milestones"
          element={
            <ProtectedRoute roles={[ROLES.S_ADMIN, ROLES.ADMIN]}>
              <Milestone />
            </ProtectedRoute>
          }
        />

        {/* Reporting */}
        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute roles={[ROLES.S_ADMIN, ROLES.ADMIN]}>
              <Report />
            </ProtectedRoute>
          }
        />

        {/* Marketing*/}
        <Route
          path="/admin/marketing"
          element={
            <ProtectedRoute roles={[ROLES.S_ADMIN, ROLES.ADMIN]}>
              <Marketing />
            </ProtectedRoute>
          }
        />

        {/* Analytics */}
        <Route
          path="/admin/inventory"
          element={
            <ProtectedRoute roles={[ROLES.S_ADMIN, ROLES.ADMIN]}>
              <Inventory />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Client Routes */}
      <Route
        path="/biz-space/create"
        element={
          <ProtectedRoute roles={[ROLES.S_ADMIN, ROLES.ADMIN]}>
            <WorkspaceForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/biz-space"
        element={
          <ProtectedRoute roles={[ROLES.S_ADMIN, ROLES.ADMIN]}>
            <ClientDashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/biz-space/dashboard"
          element={
            <ProtectedRoute roles={[ROLES.S_ADMIN, ROLES.ADMIN]}>
              <ClientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/biz-space/users"
          element={
            <ProtectedRoute roles={[ROLES.S_ADMIN, ROLES.ADMIN]}>
              <ClientUser />
            </ProtectedRoute>
          }
        />

        {/* HR*/}
        <Route
          path="/biz-space/hr/employees"
          element={
            <ProtectedRoute roles={[ROLES.S_ADMIN, ROLES.ADMIN]}>
              <ClientEmployee />
            </ProtectedRoute>
          }
        />
        <Route
          path="/biz-space/hr/attendances"
          element={
            <ProtectedRoute roles={[ROLES.S_ADMIN, ROLES.ADMIN]}>
              <ClientAttendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/biz-space/hr/requests"
          element={
            <ProtectedRoute roles={[ROLES.S_ADMIN, ROLES.ADMIN]}>
              <ClientRequest />
            </ProtectedRoute>
          }
        />

        {/* Finance */}
        <Route
          path="/biz-space/finance/payrolls"
          element={
            <ProtectedRoute roles={[ROLES.S_ADMIN, ROLES.ADMIN]}>
              <ClientPayroll />
            </ProtectedRoute>
          }
        />
        <Route
          path="/biz-space/finance/invoices"
          element={
            <ProtectedRoute roles={[ROLES.S_ADMIN, ROLES.ADMIN]}>
              <ClientInvoice />
            </ProtectedRoute>
          }
        />

        {/* Client CRM */}
        <Route
          path="/biz-space/crm"
          element={
            <ProtectedRoute roles={[ROLES.S_ADMIN, ROLES.ADMIN]}>
              <ClientCrm />
            </ProtectedRoute>
          }
        />

        {/* Projects */}
        <Route
          path="/biz-space/projects/all"
          element={
            <ProtectedRoute roles={[ROLES.S_ADMIN, ROLES.ADMIN]}>
              <ClientProject />
            </ProtectedRoute>
          }
        />
        <Route
          path="/biz-space/projects/milestones"
          element={
            <ProtectedRoute roles={[ROLES.S_ADMIN, ROLES.ADMIN]}>
              <ClientMilestone />
            </ProtectedRoute>
          }
        />

        {/* Reporting */}
        <Route
          path="/biz-space/reports"
          element={
            <ProtectedRoute roles={[ROLES.S_ADMIN, ROLES.ADMIN]}>
              <ClientReport />
            </ProtectedRoute>
          }
        />

        {/* Marketing*/}
        <Route
          path="/biz-space/marketing"
          element={
            <ProtectedRoute roles={[ROLES.S_ADMIN, ROLES.ADMIN]}>
              <ClientMarketing />
            </ProtectedRoute>
          }
        />

        {/* Analytics */}
        <Route
          path="/biz-space/inventory"
          element={
            <ProtectedRoute roles={[ROLES.S_ADMIN, ROLES.ADMIN]}>
              <ClientInventory />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Error Routes */}
      <Route path="/forbidden" element={<Forbidden />} />
      <Route path="/admin/*" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
