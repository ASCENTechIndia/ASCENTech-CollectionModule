import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import ToastNotifications from './components/common/ToastNotifications'
import GlobalLoader from './components/common/GlobalLoader'

// Layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

// Pages
import LoginPage from './pages/auth/LoginPage'
// import DashboardPage from './pages/dashboard/DashboardPage'
import Dashboard from './pages/dashboard/Dashboard'
import AssetListPage from './pages/asset/AssetListPage'
import AssetCreatePage from './pages/asset/AssetCreatePage'
import UserListPage from './pages/user/UserListPage'
import BranchListPage from './pages/branch/BranchListPage'
import ReportsPage from './pages/reports/ReportsPage'
import DemoReportPage from './pages/reports/DemoReportPage'
import DemoTailwindReportPage from './pages/reports/DemoTailwindReportPage'
import TransactionReportPage from './pages/reports/TransactionReportPage'
import DataGridPage from './pages/tables/DataGridPage'
import TwoColumnFormPage from './pages/forms/TwoColumnFormPage'
import ThreeColumnFormPage from './pages/forms/ThreeColumnFormPage'
import AlertModalDemoPage from './pages/components/AlertModalDemoPage'
import ButtonDemoPage from './pages/components/ButtonDemoPage'
import TabsDemoPage from './pages/components/TabsDemoPage'
import ChartsDemoPage from './pages/components/ChartsDemoPage'
import NotFoundPage from './pages/NotFoundPage'
import FrmUserCreation from './pages/user/FrmUserCreation'
import FrmUserCreationWeb from './pages/user/FrmUserCreationWeb'
import FrmUserList from './pages/user/FrmUserList'
import FrmUserModification from "./pages/user/FrmUserModification";
import FrmPincodeMstrInserion from './pages/user/FrmPincodeMstrInserion'
import FrmAccessofPages from './pages/user/FrmAccessofPages'
import FrmInactiveUserAcs from './pages/user/FrmInactiveUserAcs'
import FrmActiveAgents from './pages/dashboard/FrmActiveAgents'
import FrmUserPinAllocation from "./pages/user/FrmUserPinAllocation";
import FrmResetPassword from "./pages/user/FrmResetPassword";
import FrmChangePassword from "./pages/user/FrmChangePassword";
import FrmUserLocationTracking from "./pages/Admin/FrmUserLocationTracking";
import FrmLastLoginHistory from "./pages/Admin/FrmLastLoginHistory";
import FrmNewDashboard2 from './pages/dashboard/FrmNewDashboard2'
import FrmDailyVisit from './pages/dashboard/FrmDailyVisit'
import FrmBucketSetter from "./pages/Admin/FrmBucketSetter"
import FrmUnassignCases from "./pages/user/FrmUnassignCases"
import FrmAccountAllocationReport from "./pages/reports/FrmAccountAllocationReport"
import FrmInactiveUserPincodeHistory from "./pages/reports/FrmInactiveUserPincodeHistory"
import FrmOverallPerformanceSummaryReport from "./pages/reports/FrmOverallPerformanceSummaryReport";
import FrmVisitDoneSummaryReport from "./pages/reports/FrmVisitDoneSummaryReport";
import FrmNonVisitDoneSummaryReport from "./pages/reports/FrmNonVisitDoneSummaryReport";
import SMASummaryReport from "./pages/reports/SMASummaryReport";
import TransactionReport from "./pages/reports/TransactionReport";
import FrmUserRouteReport from "./pages/reports/FrmUserRouteReport";

const queryClient = new QueryClient()

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router future={{ v7_startTransition: true }}>
        <AuthProvider>
          <NotificationProvider>
            <GlobalLoader />
            <Routes>
              {/* Auth Routes */}
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
              </Route>

              {/* Protected Routes */}
              <Route
                element={
                  <ProtectedRoute>
                    <MainLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/Dashboard/FrmActiveAgents" element={<FrmActiveAgents />} />
                <Route path="/Dashboard/FrmNewDashboard2" element={<FrmNewDashboard2 />} />
                <Route path='/Dashboard/FrmDailyVisit' element={<FrmDailyVisit />} />
                
                {/* Asset Management (commented out) */}
                {/* <Route path="/assets" element={<AssetListPage />} />
                <Route path="/assets/create" element={<AssetCreatePage />} />
                <Route path="/assets/:id/edit" element={<AssetCreatePage />} /> */}
                
                {/* User Management */}
                <Route path="/User/FrmUserList" element={<FrmUserList />} />
                <Route path='/User/FrmUserCreation' element={<FrmUserCreation />} />
                <Route path='/User/FrmUserCreationWeb' element={<FrmUserCreationWeb />} />
                <Route path="/User/FrmUserModification" element={<FrmUserModification />} />
                <Route path='/FrmAccessofPages' element={<FrmAccessofPages />} />
                <Route path="/User/FrmPincodeMstrInserion" element={<FrmPincodeMstrInserion />} />
                <Route path="/User/FrmInactiveUserAcs" element={<FrmInactiveUserAcs />} />
                <Route
                  path="/User/FrmUserCreation"
                  element={<FrmUserCreation />}
                />
                <Route
                  path="/User/FrmUserCreationWeb"
                  element={<FrmUserCreationWeb />}
                />
                <Route
                  path="/User/FrmUserPinAllocation"
                  element={<FrmUserPinAllocation />}
                />
                <Route
                  path="/User/FrmResetPassword"
                  element={<FrmResetPassword />}
                />
                <Route
                  path="/User/FrmChangePassword"
                  element={<FrmChangePassword />}
                />
                <Route
                  path="/User/FrmUserLocationTracking"
                  element={<FrmUserLocationTracking />}
                />
                <Route
                  path="/User/FrmLastLoginHistory"
                  element={<FrmLastLoginHistory />}
                />
                <Route
                  path="/Admin/FrmBucketSetter"
                  element={<FrmBucketSetter />}
                />
                <Route
                  path="/Admin/FrmUnassignCases"
                  element={<FrmUnassignCases />}
                />
                <Route
                  path="/User/FrmUserModification"
                  element={<FrmUserModification />}
                />
                <Route path="/FrmAccessofPages" element={<FrmAccessofPages />} />

                
                {/* Report */}
                <Route path="/Report/FrmAccountAllocationReport" element={<FrmAccountAllocationReport />} />
                <Route path="/Report/FrmInactiveUserPincodeHistory" element={<FrmInactiveUserPincodeHistory />} />
                <Route path="/Report/FrmOverallPerformanceSummaryReport" element={<FrmOverallPerformanceSummaryReport />} />
                <Route path="/Report/FrmNonVisitDoneSummaryReport" element={<FrmNonVisitDoneSummaryReport />} />
                <Route path="/Report/FrmVisitDoneSummaryReport" element={<FrmVisitDoneSummaryReport />} />
                <Route path="/Report/SMASummaryReport" element={<SMASummaryReport />} />
                <Route path="/Report/TransactionReport" element={<TransactionReport />} />
                <Route path="/Report/FrmUserRouteReport" element={<FrmUserRouteReport />} />
                
                {/* Reports */}
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/reports/demo-grid" element={<DemoReportPage />} />
                <Route path="/reports/demo-grid-tailwind" element={<DemoTailwindReportPage />} />
                <Route path="/reports/transactions" element={<TransactionReportPage />} />

                {/* Form Examples */}
                <Route path="/forms/three-column" element={<ThreeColumnFormPage />} />

                {/* Components Demo */}
                {/* <Route path="/components/alerts-modals" element={<AlertModalDemoPage />} /> */}
                {/* <Route path="/components/buttons" element={<ButtonDemoPage />} /> */}
                <Route path="/components/tabs" element={<TabsDemoPage />} />
                <Route path="/components/charts" element={<ChartsDemoPage />} />

                

              </Route>

              {/* 404 Page */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <ToastNotifications />
          </NotificationProvider>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;