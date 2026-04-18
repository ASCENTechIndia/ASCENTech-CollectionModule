import { Link, Navigate, Route, Routes } from 'react-router-dom'
import AdminLayout from './layouts/AdminLayout'
import AuthLayout from './layouts/AuthLayout'
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
import FrmAccountAllocationReport from './pages/Reports/FrmAccountAllocationReport'
import RptDaywisedata from './pages/Reports/RptDaywisedata'
import FrmInactiveUserPincodeHistory from './pages/Reports/FrmInactiveUserPincodeHistory'
import FrmOverallPerformanceSummaryReport from './pages/Reports/FrmOverallPerformanceSummaryReport'
import FrmNonVisitDoneSummaryReport from './pages/Reports/FrmNonVisitDoneSummaryReport'
import FrmVisitDoneSummaryReport from './pages/Reports/FrmVisitDoneSummaryReport'
import FrmTransactionReport from './pages/Reports/FrmTransactionReport'

function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
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
        <Route path="reports/account-allocation" element={<FrmAccountAllocationReport />} />
        <Route path="reports/daywise-data" element={<RptDaywisedata />} />
        <Route path="reports/inactive-user-pincode-history" element={<FrmInactiveUserPincodeHistory />} />
        <Route path="reports/overall-performance-summary" element={<FrmOverallPerformanceSummaryReport />} />
        <Route path="reports/non-visit-done-summary" element={<FrmNonVisitDoneSummaryReport />} />
        <Route path="reports/visit-done-summary" element={<FrmVisitDoneSummaryReport />} />
        <Route path="reports/transaction-report" element={<FrmTransactionReport />} />
      </Route>

      <Route
        path="/auth/login"
        element={
          <AuthLayout
            split
            visual={
              <>
                <Link to="/" className="fauth-logo">
                  <img src="/assets/img/logo.webp" alt="FlexAdmin" />
                  <span>FlexAdmin</span>
                </Link>
                <span className="fauth-kicker">Workspace Intelligence</span>
                <h2 className="fauth-visual-title">Command your operations from one modern control center.</h2>
                <p className="fauth-visual-text">Track growth, team activity, and operational risk with a dashboard built for fast decisions.</p>
                <div className="fauth-visual-points">
                  <div className="fauth-point"><i className="bi bi-graph-up-arrow" /> Real-time business insights</div>
                  <div className="fauth-point"><i className="bi bi-shield-lock" /> Enterprise-grade account protection</div>
                  <div className="fauth-point"><i className="bi bi-lightning-charge" /> Fast collaboration workflows</div>
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

      <Route path="/404" element={<Error404Page />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  )
}

export default App
