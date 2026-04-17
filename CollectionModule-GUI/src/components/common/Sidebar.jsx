import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  MapPin,
  BarChart3,
  FileText,
  Table,
  FileInput,
  Bell,
  ChevronDown,
  List,
  ClipboardList,
  Settings,
  User
} from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";

const MENU_ITEMS = [
  {
    label: "Home",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
   {
    label: "Dashboards",
    icon: BarChart3,
    submenu: [
      { label: 'Active Agent Dashboard', href: '/Dashboard/FrmActiveAgents' },
      { label: 'Disposition Report', href: '/Dashboard/FrmNewDashboard2' },
      { label: 'Daily Visit Report', href: '/Dashboard/FrmDailyVisit' }
    ]
  },
  {
    label: "User Management",
    icon: Users,
    submenu: [
      { label: "User Creation", href: "/User/FrmUserList" },
      { label: "User Modification", href: "/User/FrmUserModification" },
      { label: "Pincode Master", href: "/User/FrmPincodeMstrInserion" },
      { label: "Inactive User Cases", href: "/User/FrmInactiveUserAcs" },
      { label: "Assigned Pincode FOS", href: "/User/FrmUserPinAllocation" },
      { label: "Unassigned Cases", href: "/Admin/FrmUnassignCases" },
      { label: "Reset Password", href: "/User/FrmResetPassword" },
      { label: "Change Password", href: "/User/FrmChangePassword" },
    ],
  },
  {
    label: "Admin",
    icon: User,
    submenu: [
      {
        label: "User Location Tracking",
        href: "/User/FrmUserLocationTracking",
      },
      { label: "Last Login History", href: "/User/FrmLastLoginHistory" },
      { label: "Bucket Setter", href: "/Admin/FrmBucketSetter" },
    ],
  },
  {
    label: "Report",
    icon: ClipboardList,
    submenu: [
      { label: "Account Allocation Report", href: "/Report/FrmAccountAllocationReport" },
      { label: "Daily Uploaded Report", href: "/Report/RptDaywisedata" },
      { label: "Inactive User Pincode History", href: "/Report/FrmInactiveUserPincodeHistory" },
      { label: "Overall Performance Report", href: "/Report/FrmOverallPerformanceSummaryReport" },
      { label: "Non Visit Done Summary Report", href: "/Report/FrmNonVisitDoneSummaryReport" },
      { label: "Visit Done Summary Report", href: "/Report/FrmVisitDoneSummaryReport" },
      { label: "SMA Summary Report", href: "/Report/SMASummaryReport" },
      { label: "Transaction Report", href: "/Report/TransactionReport" },
      { label: "User Route Report", href: "/Report/FrmUserRouteReport" },
      { label: "Unallocated Cases Report", href: "/Report/FrmUnallocatedCasesReport" },
    ],
  },
  //  {
  //   label: "Demo Reports",
  //   href: "/reports/demo-grid-tailwind",
  //   icon: List,
  // },







  // {
  //   label: 'Asset Management',
  //   icon: Package,
  //   submenu: [
  //     { label: 'All Assets', href: '/assets' },
  //     { label: 'Create Asset', href: '/assets/create' },
  //   ],
  // },
  // {
  //   label: 'User Management',
  //   href: '/users',
  //   icon: Users,
  // },
  // {
  //   label: 'Branch Management',
  //   href: '/branches',
  //   icon: MapPin,
  // },
  // {
  //   label: 'Reports',
  //   icon: BarChart3,
  //   submenu: [
  //     { label: 'Dashboard Reports', href: '/reports' },
  //     { label: 'Transaction Report', href: '/reports/transactions' },
  //   ],
  // },
  // {
  //   label: 'Tables & Data',
  //   href: '/tables',
  //   icon: Table,
  // },
  // {
  //   label: 'Form Examples',
  //   icon: FileInput,
  //   submenu: [
  //     { label: '2-Column Layout', href: '/forms/two-column' },
  //     { label: '3-Column Layout', href: '/forms/three-column' },
  //   ],
  // },
  // {
  //   label: 'Components',
  //   icon: Bell,
  //   submenu: [
  //     { label: 'Alerts & Modals', href: '/components/alerts-modals' },
  //     { label: 'Button Styles', href: '/components/buttons' },
  //     { label: 'Tabs', href: '/components/tabs' },
  //     { label: 'Charts', href: '/components/charts' },
  //   ],
  // },
];

export function Sidebar({ isOpen }) {
  const location = useLocation();
  const [expandedMenu, setExpandedMenu] = useState(null);

  const isMenuActive = (href) => {
    if (!href) return false;
    return location.pathname.startsWith(href);
  };

  const isSubmenuActive = (submenu = []) => {
    return submenu.some((item) => location.pathname.startsWith(item.href));
  };

  return (
    <aside
      className={clsx(
        "fixed inset-y-0 left-0 z-40 w-64 bg-white transform transition-transform lg:translate-x-0 lg:static lg:z-auto shadow-xl border-r border-gray-100",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="h-full flex flex-col overflow-y-auto">
        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2.5">
          {MENU_ITEMS.map((item) => (
            <div key={item.label}>
              {item.submenu ? (
                <div>
                  <button
                    onClick={() =>
                      setExpandedMenu(
                        expandedMenu === item.label ? null : item.label,
                      )
                    }
                    className={clsx(
                      "w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                      isSubmenuActive(item.submenu)
                        ? "bg-primary-100 text-primary-700 shadow-md"
                        : "text-gray-700 hover:bg-gray-100 hover:text-primary-600",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={20} className="flex-shrink-0" />
                      {item.label}
                    </div>
                    <ChevronDown
                      size={18}
                      className={clsx(
                        "transform transition-transform flex-shrink-0",
                        expandedMenu === item.label && "rotate-180",
                      )}
                    />
                  </button>
                  {expandedMenu === item.label && (
                    <div className="pl-4 mt-2 space-y-1 animate-in fade-in slide-in-from-top-2">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.href}
                          to={subitem.href}
                          className={clsx(
                            "block px-4 py-2.5 text-sm rounded-lg transition-all duration-150 border-l-2 pl-4",
                            isMenuActive(subitem.href)
                              ? "bg-primary-50 text-primary-700 font-medium border-l-primary-500"
                              : "text-gray-600 hover:text-primary-600 hover:bg-gray-50 border-l-transparent",
                          )}
                        >
                          {subitem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.href}
                  className={clsx(
                    "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group relative overflow-hidden",
                    isMenuActive(item.href)
                      ? "bg-primary-100 text-primary-700 shadow-md"
                      : "text-gray-700 hover:bg-gray-100 hover:text-primary-600",
                  )}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-200 -skew-x-12 translate-x-full group-hover:translate-x-0" />
                  <item.icon
                    size={20}
                    className="flex-shrink-0 relative z-10"
                  />
                  <span className="relative z-10">{item.label}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
