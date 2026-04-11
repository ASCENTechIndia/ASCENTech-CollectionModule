import { BarChartComponent, PieChartComponent } from '../../components/charts/Charts'
import { Package, CheckCircle, Clock, AlertCircle, TrendingUp, Users, ArrowUpRight } from 'lucide-react'

const DASHBOARD_STATS = [
  {
    title: 'Total Assets',
    value: '2,543',
    change: '+12.5%',
    icon: Package,
    bgColor: 'from-blue-500 to-blue-600',
    lightColor: 'bg-blue-50',
    textColor: 'text-blue-600',
  },
  {
    title: 'Assigned Assets',
    value: '1,823',
    change: '+8.2%',
    icon: CheckCircle,
    bgColor: 'from-green-500 to-green-600',
    lightColor: 'bg-green-50',
    textColor: 'text-green-600',
  },
  {
    title: 'Pending Approvals',
    value: '45',
    change: '-5.3%',
    icon: Clock,
    bgColor: 'from-yellow-500 to-yellow-600',
    lightColor: 'bg-yellow-50',
    textColor: 'text-yellow-600',
  },
  {
    title: 'Issues Reported',
    value: '12',
    change: '+2.1%',
    icon: AlertCircle,
    bgColor: 'from-red-500 to-red-600',
    lightColor: 'bg-red-50',
    textColor: 'text-red-600',
  },
]

const ASSET_DATA = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 520 },
  { name: 'Mar', value: 480 },
  { name: 'Apr', value: 650 },
  { name: 'May', value: 720 },
  { name: 'Jun', value: 890 },
]

const ASSET_TYPE_DATA = [
  { name: 'Laptops', value: 45 },
  { name: 'Mobiles', value: 32 },
  { name: 'Tablets', value: 18 },
  { name: 'Others', value: 5 },
]

const RECENT_ACTIVITIES = [
  {
    id: 1,
    type: 'create',
    title: 'Asset Created',
    description: 'MacBook Pro M1 created',
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    type: 'assign',
    title: 'Asset Assigned',
    description: 'iPhone 14 assigned to John Doe',
    timestamp: '4 hours ago',
  },
  {
    id: 3,
    type: 'transfer',
    title: 'Asset Transferred',
    description: 'Dell Laptop transferred to Mumbai branch',
    timestamp: '1 day ago',
  },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {DASHBOARD_STATS.map((stat) => {
            const IconComponent = stat.icon
            return (
              <div key={stat.title}>
                <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-all duration-300 cursor-pointer h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${stat.lightColor}`}>
                      <IconComponent size={24} className={stat.textColor} />
                    </div>
                    <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                      <ArrowUpRight size={16} />
                      {stat.change}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Main Chart */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Asset Registration Trend</h2>
              <p className="text-sm text-gray-600 mt-1">Total assets registered over the last 6 months</p>
            </div>
            <BarChartComponent
              data={ASSET_DATA}
              dataKey="value"
              xAxisKey="name"
              title=""
            />
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Assets by Type</h2>
              <p className="text-sm text-gray-600 mt-1">Distribution across categories</p>
            </div>
            <PieChartComponent
              data={ASSET_TYPE_DATA}
              dataKey="value"
              nameKey="name"
              title=""
            />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
                <p className="text-sm text-gray-600 mt-1">Latest operations in your system</p>
              </div>
            </div>
            <div className="space-y-4">
              {RECENT_ACTIVITIES.map((activity, index) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0 hover:bg-gray-50 p-3 rounded-lg transition-colors"
                >
                  {/* Timeline Dot */}
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-semibold ${
                        activity.type === 'create'
                          ? 'bg-green-100 text-green-600'
                          : activity.type === 'assign'
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-purple-100 text-purple-600'
                      }`}
                    >
                      {activity.type === 'create' && '✨'}
                      {activity.type === 'assign' && '✓'}
                      {activity.type === 'transfer' && '→'}
                    </div>
                    {index < RECENT_ACTIVITIES.length - 1 && (
                      <div className="w-0.5 h-8 bg-gray-200" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <h3 className="text-sm font-semibold text-gray-900">
                      {activity.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-0.5">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2">
                <Package size={18} />
                Create Asset
              </button>
              <button className="w-full px-4 py-3 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
                <Users size={18} />
                Assign Asset
              </button>
              <button className="w-full px-4 py-3 bg-purple-50 text-purple-600 rounded-lg font-medium hover:bg-purple-100 transition-colors flex items-center justify-center gap-2">
                <TrendingUp size={18} />
                View Reports
              </button>
              <button className="w-full px-4 py-3 bg-orange-50 text-orange-600 rounded-lg font-medium hover:bg-orange-100 transition-colors flex items-center justify-center gap-2">
                <Clock size={18} />
                Pending Tasks
              </button>
            </div>

            {/* Stats Summary */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Summary</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Active Users</span>
                  <span className="font-semibold text-gray-900">24</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Branches</span>
                  <span className="font-semibold text-gray-900">8</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Health Status</span>
                  <span className="inline-flex items-center gap-1 font-semibold">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Good
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
