import { Link, Navigate, Route, Routes } from 'react-router-dom'
import AdminLayout from './layouts/AdminLayout'
import AuthLayout from './layouts/AuthLayout'
import { useAuth } from './context/AuthContext'
import UsersPage from './pages/UsersPage'
import RolesPage from './pages/RolesPage'
import DashboardPage from './pages/DashboardPage'
import FormsMenuPage from './pages/FormsMenuPage'
import ComponentsMenuPage from './pages/ComponentsMenuPage'
import WidgetsMenuPage from './pages/WidgetsMenuPage'
import TablesDataTablesPage from './pages/TablesDataTablesPage'
import ChartsApexChartsPage from './pages/ChartsApexChartsPage'
import ChartsChartJsPage from './pages/ChartsChartJsPage'
import ChartsEChartsPage from './pages/ChartsEChartsPage'
import Error404Page from './pages/Error404Page'
import AuthLoginPage from './pages/AuthLoginPage'
import AuthForgotPasswordPage from './pages/AuthForgotPasswordPage'
import AuthResetPasswordPage from './pages/AuthResetPasswordPage'
import SMASummaryReport from './pages/Reports/SMASummaryReport'
import FrmUserList from './pages/user/FrmUserList'
import FrmUserCreation from './pages/user/FrmUserCreation'
import FrmActiveAgents from './pages/Dashboard/FrmActiveAgents'
import FrmAccountAllocationReport from './pages/Reports/FrmAccountAllocationReport'
import RptDaywisedata from './pages/Reports/RptDaywisedata'
import FrmInactiveUserPincodeHistory from './pages/Reports/FrmInactiveUserPincodeHistory'
import FrmOverallPerformanceSummaryReport from './pages/Reports/FrmOverallPerformanceSummaryReport'
import FrmNonVisitDoneSummaryReport from './pages/Reports/FrmNonVisitDoneSummaryReport'
import FrmVisitDoneSummaryReport from './pages/Reports/FrmVisitDoneSummaryReport'
import FrmTransactionReport from './pages/Reports/FrmTransactionReport'
import FrmUserCreationWeb from './pages/user/FrmUserCreationWeb'
import FrmNewDashboard2 from './pages/Dashboard/FrmNewDashboard2'
import FrmUserRouteReport from './pages/Reports/FrmUserRouteReport'
import FrmUnallocatedCasesReport from './pages/Reports/FrmUnallocatedCasesReport'
import FrmUserLocationTracking from './pages/Admin/FrmUserLocationTracking'
import FrmLastLoginHistory from './pages/Admin/FrmLastLoginHistory'
import FrmBucketSetter from './pages/Admin/FrmBucketSetter'
import FrmContractAllocation from './pages/Admin/FrmContractAllocation'
import FrmDistanceMatrix from './pages/Admin/FrmDistanceMatrix'
import FrmUserPinAllocation from './pages/user/FrmUserPinAllocation'
import FrmUnassignCases from './pages/user/FrmUnassignCases'
import FrmResetPassword from './pages/user/FrmResetPassword'
import FrmChangePassword from './pages/user/FrmChangePassword'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />
  }

  return children
}


// Users
import FrmUserModification from "./pages/user/FrmUserModification"
import FrmAccessofPages from './pages/user/FrmAccessofPages'
import FrmPincodeMstrInserion from './pages/user/FrmPincodeMstrInserion'
import FrmInactiveUserAcs from './pages/user/FrmInactiveUserAcs'
import MapViewPage from './components/ui/MapViewPage'
import FrmDailyVisit from './pages/Dashboard/FrmDailyVisit'
import UsersList from './pages/user/Userlist'
import Roles from './pages/user/Roles'
import UserPinAllocation from './pages/user/UserPinAllocation'
import FrmActiveAgentsNew from './pages/Dashboard/FrmActiveAgentsNew'
import FrmNewDashboard2New from './pages/Dashboard/FrmNewDashboard2New'

function App() {
  return (
    <Routes>
      
      <Route
        path="/"
        element={
          <AdminLayout />
          // <ProtectedRoute>
          //   <AdminLayout />
          // </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="roles" element={<RolesPage />} />
        <Route path="widgets" element={<WidgetsMenuPage />} />
        <Route path="widgets/:widgetPage" element={<WidgetsMenuPage />} />
        <Route path="forms/:formPage" element={<FormsMenuPage />} />
        <Route path="components/:componentPage" element={<ComponentsMenuPage />} />
        <Route path="tables/datatables" element={<TablesDataTablesPage />} />
        <Route path="charts/apexcharts" element={<ChartsApexChartsPage />} />
        <Route path="charts/chartjs" element={<ChartsChartJsPage />} />
        <Route path="charts/echarts" element={<ChartsEChartsPage />} />
        <Route path="reports/sma-summary" element={<SMASummaryReport />} />
        <Route path="user/FrmUserList" element={<FrmUserList />} />
        <Route path="User/FrmUserCreation" element={<FrmUserCreation />} />
        <Route path="User/FrmUserCreationWeb" element={<FrmUserCreationWeb />} />
        {/* Dashboard */}
        <Route path='/Dashboard/FrmActiveAgents' element={<FrmActiveAgents />} />
        <Route path="Dashboard/FrmNewDashboard2" element={<FrmNewDashboard2 />} />
        <Route path='Dashboard/FrmDailyVisit' element={<FrmDailyVisit />} />
        <Route path='/Dashboard/FrmActiveAgentsNew' element={<FrmActiveAgentsNew />} />
        <Route path="Dashboard/FrmNewDashboard2New" element={<FrmNewDashboard2New />} />
        
        {/* User */}
        <Route path='/User/FrmUserModification' element={<FrmUserModification/>}/>
        <Route path="/FrmAccessofPages" element={<FrmAccessofPages />} />
        <Route path='/User/FrmPincodeMstrInserion' element={<FrmPincodeMstrInserion/>}/>
        <Route path='/User/FrmInactiveUserAcs' element={<FrmInactiveUserAcs/>}/>




        
        <Route path="reports/account-allocation" element={<FrmAccountAllocationReport />} />
        <Route path="reports/daywise-data" element={<RptDaywisedata />} />
        <Route path="reports/inactive-user-pincode-history" element={<FrmInactiveUserPincodeHistory />} />
        <Route path="reports/overall-performance-summary" element={<FrmOverallPerformanceSummaryReport />} />
        <Route path="reports/non-visit-done-summary" element={<FrmNonVisitDoneSummaryReport />} />
        <Route path="reports/visit-done-summary" element={<FrmVisitDoneSummaryReport />} />
        <Route path="reports/transaction-report" element={<FrmTransactionReport />} />
        <Route path="reports/user-route-report" element={<FrmUserRouteReport />} />
        <Route path="reports/unallocated-cases-report" element={<FrmUnallocatedCasesReport />} />
        <Route path="admin/user-location-tracking" element={<FrmUserLocationTracking />} />
        <Route path="admin/last-login-history" element={<FrmLastLoginHistory />} />
        <Route path="admin/bucket-setter" element={<FrmBucketSetter />} />
        <Route path="admin/contract-allocation" element={<FrmContractAllocation />} />
        <Route path="admin/distance-matrix" element={<FrmDistanceMatrix />} />
        <Route path="user/pin-allocation" element={<FrmUserPinAllocation />} />
        <Route path="user/unassign-cases" element={<FrmUnassignCases />} />
        <Route path="user/reset-password" element={<FrmResetPassword />} />
        <Route path="user/change-password" element={<FrmChangePassword />} />
        <Route path="user/user-list" element={<UsersList />} />
        <Route path="user/roles" element={<Roles />} />
        <Route path="user/pincode-allocation" element={<UserPinAllocation />} />
      </Route>
      <Route path="/map-view" element={<MapViewPage />} />
      <Route
        path="/auth/login"
        element={
          <AuthLayout
            split
            visual={
              <>
                <Link to="/" className="fauth-logo">
                  <img src="/assets/img/logo.webp" alt="Collection Module" />
                  <span>Collection Module</span>
                </Link>
                <h2 className="fauth-visual-title">Manage collection operations from one unified control center.</h2>
                <p className="fauth-visual-text">Track field performance, collection efficiency, and risk trends with real-time operational visibility.</p>
                <div className="fauth-visual-points">
                  <div className="fauth-point"><i className="bi bi-graph-up-arrow" /> Real-time collection insights</div>
                  <div className="fauth-point"><i className="bi bi-shield-lock" /> Secure user access and controls</div>
                  <div className="fauth-point"><i className="bi bi-lightning-charge" /> Faster field and branch coordination</div>
                </div>
              </>
            }
          />
        }
      >
        <Route index element={<AuthLoginPage />} />
      </Route>

      <Route path="/auth" element={<AuthLayout />}>
        <Route path="forgot-password" element={<AuthForgotPasswordPage />} />
        <Route path="reset-password" element={<AuthResetPasswordPage />} />
      </Route>

      <Route path="/auth-login" element={<Navigate to="/auth/login" replace />} />
      <Route path="/auth-forgot-password" element={<Navigate to="/auth/forgot-password" replace />} />
      <Route path="/auth-reset-password" element={<Navigate to="/auth/reset-password" replace />} />

      <Route path="/charts-apexcharts" element={<Navigate to="/charts/apexcharts" replace />} />
      <Route path="/charts-chartjs" element={<Navigate to="/charts/chartjs" replace />} />
      <Route path="/charts-echarts" element={<Navigate to="/charts/echarts" replace />} />

      <Route path="/widgets-cards" element={<Navigate to="/widgets/widgets-cards" replace />} />
      <Route path="/widgets-banners" element={<Navigate to="/widgets/widgets-banners" replace />} />
      <Route path="/widgets-charts" element={<Navigate to="/widgets/widgets-charts" replace />} />
      <Route path="/widgets-apps" element={<Navigate to="/widgets/widgets-apps" replace />} />
      <Route path="/widgets-data" element={<Navigate to="/widgets/widgets-data" replace />} />

      <Route path="/components-accordion" element={<Navigate to="/components/accordion" replace />} />
      <Route path="/components-alerts" element={<Navigate to="/components/alerts" replace />} />
      <Route path="/components-badges" element={<Navigate to="/components/badges" replace />} />
      <Route path="/components-breadcrumbs" element={<Navigate to="/components/breadcrumbs" replace />} />
      <Route path="/components-buttons" element={<Navigate to="/components/buttons" replace />} />
      <Route path="/components-cards" element={<Navigate to="/components/cards" replace />} />
      <Route path="/components-carousel" element={<Navigate to="/components/carousel" replace />} />
      <Route path="/components-dropdowns" element={<Navigate to="/components/dropdowns" replace />} />
      <Route path="/components-list-group" element={<Navigate to="/components/list-group" replace />} />
      <Route path="/components-modal" element={<Navigate to="/components/modal" replace />} />
      <Route path="/components-nav-tabs" element={<Navigate to="/components/nav-tabs" replace />} />
      <Route path="/components-offcanvas" element={<Navigate to="/components/offcanvas" replace />} />
      <Route path="/components-pagination" element={<Navigate to="/components/pagination" replace />} />
      <Route path="/components-popovers" element={<Navigate to="/components/popovers" replace />} />
      <Route path="/components-progress" element={<Navigate to="/components/progress" replace />} />
      <Route path="/components-spinners" element={<Navigate to="/components/spinners" replace />} />
      <Route path="/components-toasts" element={<Navigate to="/components/toasts" replace />} />
      <Route path="/components-tooltips" element={<Navigate to="/components/tooltips" replace />} />
      <Route path="/Report/FrmAccountAllocationReport" element={<Navigate to="/reports/account-allocation" replace />} />
      <Route path="/Report/RptDaywisedata" element={<Navigate to="/reports/daywise-data" replace />} />
      <Route path="/Report/FrmInactiveUserPincodeHistory" element={<Navigate to="/reports/inactive-user-pincode-history" replace />} />
      <Route path="/Report/FrmOverallPerformanceSummaryReport" element={<Navigate to="/reports/overall-performance-summary" replace />} />
      <Route path="/Report/FrmNonVisitDoneSummaryReport" element={<Navigate to="/reports/non-visit-done-summary" replace />} />
      <Route path="/Report/FrmVisitDoneSummaryReport" element={<Navigate to="/reports/visit-done-summary" replace />} />
      <Route path="/Report/TransactionReport" element={<Navigate to="/reports/transaction-report" replace />} />
      <Route path="/Report/FrmUserRouteReport" element={<Navigate to="/reports/user-route-report" replace />} />
      <Route path="/Report/FrmUnallocatedCasesReport" element={<Navigate to="/reports/unallocated-cases-report" replace />} />
      <Route path="/User/FrmUserLocationTracking" element={<Navigate to="/admin/user-location-tracking" replace />} />
      <Route path="/User/FrmLastLoginHistory" element={<Navigate to="/admin/last-login-history" replace />} />
      <Route path="/User/FrmUserPinAllocation" element={<Navigate to="/user/pin-allocation" replace />} />
      <Route path="/Admin/FrmUnassignCases" element={<Navigate to="/user/unassign-cases" replace />} />
      <Route path="/User/FrmResetPassword" element={<Navigate to="/user/reset-password" replace />} />
      <Route path="/User/FrmChangePassword" element={<Navigate to="/user/change-password" replace />} />
      <Route path="/Admin/FrmBucketSetter" element={<Navigate to="/admin/bucket-setter" replace />} />
      <Route path="/Admin/FrmContractAllocation" element={<Navigate to="/admin/contract-allocation" replace />} />
      <Route path="/Admin/FrmDistanceMatrix" element={<Navigate to="/admin/distance-matrix" replace />} />
   <Route path="/User/Userlist" element={<Navigate to="/user/user-list" replace />} />
    <Route path="/User/Roles" element={<Navigate to="/user/roles" replace />} />
    <Route path="/User/UserPinAllocation" element={<Navigate to="/user/pincode-allocation" replace />} />






      <Route path="/User" element={<Navigate to="/user/FrmUserList" replace />} />
      <Route path="/User" element={<Navigate to="/User/FrmUserCreation" replace />} />
      <Route path="/User" element={<Navigate to="User/FrmUserCreationWeb" replace />} />


      <Route path="/404" element={<Error404Page />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  )
}

export default App
