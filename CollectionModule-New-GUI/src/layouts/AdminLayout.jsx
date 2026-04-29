import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import BackToTopButton from '../components/ui/BackToTopButton'

function AdminLayout() {
  const location = useLocation()
  const [desktopCollapsed, setDesktopCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const toggleTimeoutRef = useRef(null)
  const [authMenuManualOpen, setAuthMenuManualOpen] = useState(false)
  const [formsMenuManualOpen, setFormsMenuManualOpen] = useState(false)
  const [componentsMenuManualOpen, setComponentsMenuManualOpen] = useState(false)
  const [tablesMenuManualOpen, setTablesMenuManualOpen] = useState(false)
  const [dashboardMenuManualOpen, setDashboardMenuManualOpen] = useState(false)
  const [chartsMenuManualOpen, setChartsMenuManualOpen] = useState(false)
  const [widgetsMenuManualOpen, setWidgetsMenuManualOpen] = useState(false)
  const [userMgmtMenuOpen, setUserMgmtMenuOpen] = useState(false);
  const [reportsMenuManualOpen, setReportsMenuManualOpen] = useState(false)
  const [adminMenuManualOpen, setAdminMenuManualOpen] = useState(false)
  const [userMenuManualOpen, setUserMenuManualOpen] = useState(false)
  const [pincodeMenuManualOpen, setPincodeMenuManualOpen] = useState(false)
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')

    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme
    }

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }

    return 'light'
  })
  const [notifications, setNotifications] = useState([
  ])
  const searchInputRef = useRef(null)

  useEffect(() => {
    document.body.classList.toggle('sidebar-collapsed', desktopCollapsed)
    document.body.classList.toggle('sidebar-open', mobileOpen)

    return () => {
      document.body.classList.remove('sidebar-collapsed')
      document.body.classList.remove('sidebar-open')
    }
  }, [desktopCollapsed, mobileOpen])

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }

    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === '/' && event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
        event.preventDefault()
        searchInputRef.current?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  const authRouteActive = location.pathname.startsWith('/auth')
  const formsRouteActive = location.pathname.startsWith('/forms')
  const componentsRouteActive = location.pathname.startsWith('/components')
  const tablesRouteActive = location.pathname.startsWith('/tables')
  const dashboardRouteActive = location.pathname.startsWith('/Dashboard') || location.pathname.startsWith('/dashboard')
  const chartsRouteActive = location.pathname.startsWith('/charts')
  const widgetsRouteActive = location.pathname.startsWith('/widgets')
  const userMgmtRouteActive = location.pathname.startsWith('/user')
  const reportsRouteActive = location.pathname.startsWith('/reports')
  const adminRouteActive = location.pathname.startsWith('/admin')
  const userRouteActive = location.pathname.startsWith('/user')
  const pincodeRouteActive = location.pathname.startsWith('/pincode')

  const authMenuOpen = authRouteActive || authMenuManualOpen
  const formsMenuOpen = formsRouteActive || formsMenuManualOpen
  const componentsMenuOpen = componentsRouteActive || componentsMenuManualOpen
  const tablesMenuOpen = tablesRouteActive || tablesMenuManualOpen
  const dashboardMenuOpen = dashboardRouteActive || dashboardMenuManualOpen
  const chartsMenuOpen = chartsRouteActive || chartsMenuManualOpen
  const widgetsMenuOpen = widgetsRouteActive || widgetsMenuManualOpen
  const userMgmtOpen = userMgmtRouteActive || userMgmtMenuOpen
  const reportsMenuOpen = reportsRouteActive || reportsMenuManualOpen
  const adminMenuOpen = adminRouteActive || adminMenuManualOpen
  const userMenuOpen = userRouteActive || userMenuManualOpen
  const pincodeMenuOpen = pincodeRouteActive || pincodeMenuManualOpen

  const toggleSidebar = () => {
    // Debounce toggle to prevent rapid state changes during animations
    if (toggleTimeoutRef.current) {
      clearTimeout(toggleTimeoutRef.current)
    }

    if (window.innerWidth >= 1200) {
      setDesktopCollapsed((value) => !value)
    } else {
      setMobileOpen((value) => !value)
    }

    // Prevent toggling again for 300ms to let CSS transitions complete
    toggleTimeoutRef.current = setTimeout(() => {
      toggleTimeoutRef.current = null
    }, 300)
  }

  useEffect(() => {
    return () => {
      if (toggleTimeoutRef.current) {
        clearTimeout(toggleTimeoutRef.current)
      }
    }
  }, [])

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  const markAllAsRead = () => {
    setNotifications((current) => current.map((item) => ({ ...item, read: true })))
  }

  const markAsRead = (id) => {
    setNotifications((current) =>
      current.map((item) => {
        if (item.id !== id) {
          return item
        }

        return { ...item, read: true }
      }),
    )
  }

  return (
    <>
      <Header
        theme={theme}
        onThemeToggle={toggleTheme}
        notifications={notifications}
        onMarkAsRead={markAsRead}
        onMarkAllAsRead={markAllAsRead}
        onToggleSidebar={toggleSidebar}
        searchInputRef={searchInputRef}
      />
      <Sidebar
        desktopCollapsed={desktopCollapsed}
        mobileOpen={mobileOpen}
        authMenuOpen={authMenuOpen}
        formsMenuOpen={formsMenuOpen}
        componentsMenuOpen={componentsMenuOpen}
        tablesMenuOpen={tablesMenuOpen}
        dashboardMenuOpen={dashboardMenuOpen}
        chartsMenuOpen={chartsMenuOpen}
        widgetsMenuOpen={widgetsMenuOpen}
        userManagementMenuOpen={userMgmtOpen}
        reportsMenuOpen={reportsMenuOpen}
        adminMenuOpen={adminMenuOpen}
        userMenuOpen={userMenuOpen}
        pincodeMenuOpen={pincodeMenuOpen}
        onToggleAuthMenu={() => setAuthMenuManualOpen((value) => !value)}
        onToggleFormsMenu={() => setFormsMenuManualOpen((value) => !value)}
        onToggleComponentsMenu={() => setComponentsMenuManualOpen((value) => !value)}
        onToggleTablesMenu={() => setTablesMenuManualOpen((value) => !value)}
        onToggleDashboardMenu={() => setDashboardMenuManualOpen((value) => !value)}
        onToggleChartsMenu={() => setChartsMenuManualOpen((value) => !value)}
        onToggleWidgetsMenu={() => setWidgetsMenuManualOpen((value) => !value)}
        onToggleuserManagementMenu= {() => setUserMgmtMenuOpen((value) => !value)}
        onToggleReportsMenu={() => setReportsMenuManualOpen((value) => !value)}
        onToggleAdminMenu={() => setAdminMenuManualOpen((value) => !value)}
        onToggleUserMenu={() => setUserMenuManualOpen((value) => !value)}
        onTogglePincodeMenu={() => setPincodeMenuManualOpen((value) => !value)}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <main className="main">
        <Outlet />

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-credits">
              <div className="footer-copyright">&copy; 2026 Collection Module</div>
            </div>
          </div>
        </footer>
        <BackToTopButton />
      </main>
    </>
  )
}

export default AdminLayout
