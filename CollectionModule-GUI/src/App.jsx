import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { AuthProvider, useAuth } from './context/AuthContext'
import { NotificationProvider } from './context/NotificationContext'

// Layouts
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'

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
import FrmPincodeMstrInserion from './pages/Admin/FrmPincodeMstrInserion'
import FrmAccessofPages from './pages/user/FrmAccessofPages'

const queryClient = new QueryClient()

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router future={{ v7_startTransition: true }}>
        <AuthProvider>
          <NotificationProvider>
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
                
                {/* Asset Management */}
                {/* <Route path="/assets" element={<AssetListPage />} />
                <Route path="/assets/create" element={<AssetCreatePage />} />
                <Route path="/assets/:id/edit" element={<AssetCreatePage />} /> */}
                
                {/* User Management */}
                {/* <Route path="/users" element={<UserListPage />} /> */}
                <Route path="/User/FrmUserList" element={<FrmUserList />} />
                <Route path='/User/FrmUserCreation' element={<FrmUserCreation />} />
                <Route path='/User/FrmUserCreationWeb' element={<FrmUserCreationWeb />} />
                <Route path="/User/FrmUserModification" element={<FrmUserModification />} />
                <Route path='/FrmAccessofPages' element={<FrmAccessofPages />} />
                <Route path="/User/FrmPincodeMstrInserion" element={<FrmPincodeMstrInserion />} />
                
                {/* Branch Management */}
                {/* <Route path="/branches" element={<BranchListPage />} /> */}
                
                {/* Reports */}
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/reports/demo-grid" element={<DemoReportPage />} />
                <Route path="/reports/demo-grid-tailwind" element={<DemoTailwindReportPage />} />
                <Route path="/reports/transactions" element={<TransactionReportPage />} />
                
                {/* Tables & Data Grid */}
                {/* <Route path="/tables" element={<DataGridPage />} /> */}
                
                {/* Form Examples */}
                {/* <Route path="/forms/two-column" element={<TwoColumnFormPage />} /> */}
                <Route path="/forms/three-column" element={<ThreeColumnFormPage />} />
                
                {/* Components Demo */}
                <Route path="/components/alerts-modals" element={<AlertModalDemoPage />} />
                {/* <Route path="/components/buttons" element={<ButtonDemoPage />} />
                <Route path="/components/tabs" element={<TabsDemoPage />} />
                <Route path="/components/charts" element={<ChartsDemoPage />} /> */}

                

              </Route>

              {/* 404 Page */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </NotificationProvider>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  )
}

export default App
