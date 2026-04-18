import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Dashboard', icon: 'ph-light ph-squares-four' },
  { to: '/users', label: 'Users', icon: 'ph-light ph-users-three' },
  { to: '/roles', label: 'Roles', icon: 'ph-light ph-shield' },
]

const tablesMenuItems = [{ to: '/tables/datatables', label: 'DataTables' }]

const chartsMenuItems = [
  { to: '/charts/apexcharts', label: 'ApexCharts' },
  { to: '/charts/chartjs', label: 'Chart.js' },
  { to: '/charts/echarts', label: 'ECharts' },
]

const widgetsMenuItems = [
  { to: '/widgets/widgets-cards', label: 'Cards' },
  { to: '/widgets/widgets-banners', label: 'Banners' },
  { to: '/widgets/widgets-charts', label: 'Charts' },
  { to: '/widgets/widgets-apps', label: 'Apps' },
  { to: '/widgets/widgets-data', label: 'Data' },
]

const formsMenuItems = [
  { to: '/forms/elements', label: 'Form Elements' },
  { to: '/forms/layouts', label: 'Form Layouts' },
  { to: '/forms/validation', label: 'Validation' },
  { to: '/forms/wizard', label: 'Wizard' },
  { to: '/forms/editors', label: 'Rich Editors' },
  { to: '/forms/pickers', label: 'Date/Time Pickers' },
  { to: '/forms/select', label: 'Advanced Select' },
  { to: '/forms/upload', label: 'File Upload' },
]

const componentsMenuItems = [
  { to: '/components/accordion', label: 'Accordion' },
  { to: '/components/alerts', label: 'Alerts' },
  { to: '/components/badges', label: 'Badges' },
  { to: '/components/breadcrumbs', label: 'Breadcrumbs' },
  { to: '/components/buttons', label: 'Buttons' },
  { to: '/components/cards', label: 'Cards' },
  { to: '/components/carousel', label: 'Carousel' },
  { to: '/components/dropdowns', label: 'Dropdowns' },
  { to: '/components/list-group', label: 'List Group' },
  { to: '/components/modal', label: 'Modal' },
  { to: '/components/nav-tabs', label: 'Nav Tabs' },
  { to: '/components/offcanvas', label: 'Offcanvas' },
  { to: '/components/pagination', label: 'Pagination' },
  { to: '/components/popovers', label: 'Popovers' },
  { to: '/components/progress', label: 'Progress' },
  { to: '/components/spinners', label: 'Spinners' },
  { to: '/components/toasts', label: 'Toasts' },
  { to: '/components/tooltips', label: 'Tooltips' },
]
const user = [
  { to: "/User/FrmUserModification", label: "User Modification"}
]

function Sidebar({
  desktopCollapsed,
  mobileOpen,
  authMenuOpen,
  formsMenuOpen,
  componentsMenuOpen,
  tablesMenuOpen,
  chartsMenuOpen,
  widgetsMenuOpen,
  onToggleAuthMenu,
  onToggleFormsMenu,
  onToggleComponentsMenu,
  onToggleTablesMenu,
  onToggleChartsMenu,
  onToggleWidgetsMenu,
  onCloseMobile,
}) {
  return (
    <>
      <aside className={`sidebar ${desktopCollapsed ? 'collapsed' : ''} ${mobileOpen ? 'open' : ''}`}>
        <nav className="sidebar-nav">
          <ul className="nav-menu">
            {navItems.map((item) => (
              <li className="nav-item" key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={onCloseMobile}
                >
                  <span className="nav-icon">
                    <i className={item.icon} />
                  </span>
                  <span className="nav-text">{item.label}</span>
                </NavLink>
              </li>
            ))}

            <li className={`nav-item has-submenu ${authMenuOpen ? 'open' : ''}`}>
              <button type="button" className="nav-link w-100 text-start border-0 bg-transparent" onClick={onToggleAuthMenu} aria-expanded={authMenuOpen}>
                <span className="nav-icon"><i className="ph-light ph-shield-check" /></span>
                <span className="nav-text">Authentication</span>
                <span className="nav-badge">3</span>
                <span className="nav-arrow"><i className="bi bi-chevron-right" /></span>
              </button>
              <ul className={`nav-submenu ${authMenuOpen ? 'show' : ''}`} style={{ maxHeight: authMenuOpen ? '220px' : '0px' }}>
                <li><NavLink to="/auth/login" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={onCloseMobile}><span className="nav-dot" /> Login</NavLink></li>
                <li><NavLink to="/auth/forgot-password" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={onCloseMobile}><span className="nav-dot" /> Forgot Password</NavLink></li>
                <li><NavLink to="/auth/reset-password" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={onCloseMobile}><span className="nav-dot" /> Reset Password</NavLink></li>
              </ul>
            </li>

            {/* Here i added my user FrmUserModification component */}
            <li className={`nav-item has-submenu ${authMenuOpen ? 'open' : ''}`}>
              <button type="button" className="nav-link w-100 text-start border-0 bg-transparent" onClick={onToggleAuthMenu} aria-expanded={authMenuOpen}>
                <span className="nav-icon"><i className="ph-light ph-shield-check" /></span>
                <span className="nav-text">User</span>
                <span className="nav-badge">3</span>
                <span className="nav-arrow"><i className="bi bi-chevron-right" /></span>
              </button>
              <ul className={`nav-submenu ${authMenuOpen ? 'show' : ''}`} style={{ maxHeight: authMenuOpen ? '220px' : '0px' }}>
                <li><NavLink to="/User/FrmUserModification" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={onCloseMobile}><span className="nav-dot" /> User Modification</NavLink></li>
              </ul>
            </li>

            <li className={`nav-item has-submenu ${formsMenuOpen ? 'open' : ''}`}>
              <button type="button" className="nav-link w-100 text-start border-0 bg-transparent" onClick={onToggleFormsMenu} aria-expanded={formsMenuOpen}>
                <span className="nav-icon"><i className="ph-light ph-textbox" /></span>
                <span className="nav-text">Forms</span>
                <span className="nav-badge">{formsMenuItems.length}</span>
                <span className="nav-arrow"><i className="bi bi-chevron-right" /></span>
              </button>
              <ul className={`nav-submenu ${formsMenuOpen ? 'show' : ''}`} style={{ maxHeight: formsMenuOpen ? `${formsMenuItems.length * 36 + 20}px` : '0px' }}>
                {formsMenuItems.map((item) => (
                  <li key={item.to}><NavLink to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={onCloseMobile}><span className="nav-dot" /> {item.label}</NavLink></li>
                ))}
              </ul>
            </li>

            <li className={`nav-item has-submenu ${componentsMenuOpen ? 'open' : ''}`}>
              <button type="button" className="nav-link w-100 text-start border-0 bg-transparent" onClick={onToggleComponentsMenu} aria-expanded={componentsMenuOpen}>
                <span className="nav-icon"><i className="ph-light ph-puzzle-piece" /></span>
                <span className="nav-text">Components</span>
                <span className="nav-badge">{componentsMenuItems.length}</span>
                <span className="nav-arrow"><i className="bi bi-chevron-right" /></span>
              </button>
              <ul className={`nav-submenu ${componentsMenuOpen ? 'show' : ''}`} style={{ maxHeight: componentsMenuOpen ? `${componentsMenuItems.length * 36 + 20}px` : '0px' }}>
                {componentsMenuItems.map((item) => (
                  <li key={item.to}><NavLink to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={onCloseMobile}><span className="nav-dot" /> {item.label}</NavLink></li>
                ))}
              </ul>
            </li>

            <li className={`nav-item has-submenu ${tablesMenuOpen ? 'open' : ''}`}>
              <button type="button" className="nav-link w-100 text-start border-0 bg-transparent" onClick={onToggleTablesMenu} aria-expanded={tablesMenuOpen}>
                <span className="nav-icon"><i className="ph-light ph-table" /></span>
                <span className="nav-text">Tables</span>
                <span className="nav-badge">{tablesMenuItems.length}</span>
                <span className="nav-arrow"><i className="bi bi-chevron-right" /></span>
              </button>
              <ul className={`nav-submenu ${tablesMenuOpen ? 'show' : ''}`} style={{ maxHeight: tablesMenuOpen ? `${tablesMenuItems.length * 36 + 20}px` : '0px' }}>
                {tablesMenuItems.map((item) => (
                  <li key={item.to}><NavLink to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={onCloseMobile}><span className="nav-dot" /> {item.label}</NavLink></li>
                ))}
              </ul>
            </li>

            <li className={`nav-item has-submenu ${chartsMenuOpen ? 'open' : ''}`}>
              <button type="button" className="nav-link w-100 text-start border-0 bg-transparent" onClick={onToggleChartsMenu} aria-expanded={chartsMenuOpen}>
                <span className="nav-icon"><i className="ph-light ph-chart-line-up" /></span>
                <span className="nav-text">Charts</span>
                <span className="nav-badge">{chartsMenuItems.length}</span>
                <span className="nav-arrow"><i className="bi bi-chevron-right" /></span>
              </button>
              <ul className={`nav-submenu ${chartsMenuOpen ? 'show' : ''}`} style={{ maxHeight: chartsMenuOpen ? `${chartsMenuItems.length * 36 + 20}px` : '0px' }}>
                {chartsMenuItems.map((item) => (
                  <li key={item.to}><NavLink to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={onCloseMobile}><span className="nav-dot" /> {item.label}</NavLink></li>
                ))}
              </ul>
            </li>

            <li className={`nav-item has-submenu ${widgetsMenuOpen ? 'open' : ''}`}>
              <button type="button" className="nav-link w-100 text-start border-0 bg-transparent" onClick={onToggleWidgetsMenu} aria-expanded={widgetsMenuOpen}>
                <span className="nav-icon"><i className="ph-light ph-stack" /></span>
                <span className="nav-text">Widgets</span>
                <span className="nav-badge">{widgetsMenuItems.length}</span>
                <span className="nav-arrow"><i className="bi bi-chevron-right" /></span>
              </button>
              <ul className={`nav-submenu ${widgetsMenuOpen ? 'show' : ''}`} style={{ maxHeight: widgetsMenuOpen ? `${widgetsMenuItems.length * 36 + 20}px` : '0px' }}>
                {widgetsMenuItems.map((item) => (
                  <li key={item.to}><NavLink to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={onCloseMobile}><span className="nav-dot" /> {item.label}</NavLink></li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-footer-user">
            <a href="#" className="sidebar-footer-profile" onClick={(event) => event.preventDefault()}>
              <img src="/assets/img/profile-img.webp" alt="User" className="sidebar-footer-avatar" />
              <div className="sidebar-footer-info">
                <div className="sidebar-footer-name">John Doe</div>
                <div className="sidebar-footer-role">Product Admin</div>
              </div>
            </a>
          </div>
        </div>
      </aside>

      <div
        className={`sidebar-overlay ${mobileOpen ? 'show' : ''}`}
        onClick={onCloseMobile}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            onCloseMobile()
          }
        }}
      />
    </>
  )
}

export default Sidebar