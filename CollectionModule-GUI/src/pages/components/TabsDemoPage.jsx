import React from 'react'
import { Card } from '../../components/ui'
import { Tabs } from '../../components/ui/Tabs'
import { Mail, Settings, Users, Bell, FileText, BarChart3, Lock, LineChart, ClipboardList } from 'lucide-react'

export const TabsDemoPage = () => {
  // Tab 1: Basic Tabs
  const basicTabs = [
    { id: 'tab1', label: 'Overview', content: 'This is the Overview tab content. Display information about the item.' },
    { id: 'tab2', label: 'Details', content: 'Additional detailed information and specifications.' },
    { id: 'tab3', label: 'Settings', content: 'Configure preferences and options.' },
    { id: 'tab4', label: 'Activity', content: 'View recent activity and logs.' }
  ]

  // Tab 2: With Icons and Badges
  const iconTabs = [
    {
      id: 'mail',
      label: 'Inbox',
      icon: <Mail size={18} />,
      badge: '3',
      content: 'You have 3 new messages waiting.'
    },
    {
      id: 'users',
      label: 'Users',
      icon: <Users size={18} />,
      badge: '12',
      content: 'Manage team members and permissions.'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: <Bell size={18} />,
      badge: '5',
      content: 'System alerts and notifications.'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings size={18} />,
      content: 'Configure your preferences.'
    }
  ]

  // Tab 3: Complex Content
  const contentTabs = [
    {
      id: 'summary',
      label: 'Summary',
      icon: <BarChart3 size={18} />,
      content: (
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded border border-blue-100">
            <p className="text-xs text-gray-600 uppercase tracking-wide">Total Revenue</p>
            <p className="text-2xl font-bold text-blue-600 mt-2">$45,230</p>
          </div>
          <div className="p-4 bg-green-50 rounded border border-green-100">
            <p className="text-xs text-gray-600 uppercase tracking-wide">New Customers</p>
            <p className="text-2xl font-bold text-green-600 mt-2">234</p>
          </div>
          <div className="p-4 bg-purple-50 rounded border border-purple-100">
            <p className="text-xs text-gray-600 uppercase tracking-wide">Conversion</p>
            <p className="text-2xl font-bold text-purple-600 mt-2">3.2%</p>
          </div>
        </div>
      )
    },
    {
      id: 'details',
      label: 'Details',
      icon: <FileText size={18} />,
      content: (
        <div className="space-y-2">
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Product Sales</span>
            <span className="font-semibold text-gray-900">$32,450</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Services</span>
            <span className="font-semibold text-gray-900">$12,780</span>
          </div>
        </div>
      )
    },
    {
      id: 'security',
      label: 'Security',
      icon: <Lock size={18} />,
      content: 'Two-factor authentication: Enabled • Last login: 2 hours ago'
    }
  ]

  // Tab 4: Disabled States
  const disabledTabs = [
    { id: 'enabled1', label: 'Available', content: 'This tab is active and clickable.' },
    { id: 'disabled1', label: 'Locked', disabled: true, content: 'This content is unavailable.' },
    { id: 'enabled2', label: 'Info', content: 'Another available tab.' }
  ]

  // Tab 5: Vertical Layout
  const verticalTabs = [
    { id: 'profile', label: 'Profile', content: 'Edit your profile information including name, email, and bio.' },
    { id: 'preferences', label: 'Preferences', content: 'Manage your notification preferences and language settings.' },
    { id: 'privacy', label: 'Privacy', content: 'Control your privacy settings and data sharing options.' }
  ]

  // Tab 6: Graphs & Forms
  const graphsAndFormsTabs = [
    {
      id: 'graphs',
      label: 'Graphs',
      icon: <LineChart size={18} />,
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded border border-gray-200">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Sales Chart</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-24 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded"></div>
                <span className="text-sm text-gray-600">Jan: $12,500</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-32 h-8 bg-gradient-to-r from-purple-400 to-purple-600 rounded"></div>
                <span className="text-sm text-gray-600">Feb: $18,240</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-28 h-8 bg-gradient-to-r from-pink-400 to-pink-600 rounded"></div>
                <span className="text-sm text-gray-600">Mar: $15,800</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded border border-gray-200">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Growth Metrics</h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">+24%</p>
                <p className="text-xs text-gray-600 mt-1">Growth</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">847</p>
                <p className="text-xs text-gray-600 mt-1">Users</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">92%</p>
                <p className="text-xs text-gray-600 mt-1">Retention</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'forms',
      label: 'Forms',
      icon: <ClipboardList size={18} />,
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Select Department</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>-- Select Department --</option>
                <option>Sales</option>
                <option>Marketing</option>
                <option>Engineering</option>
                <option>Support</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
              <textarea
                placeholder="Enter your message"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows="3"
              ></textarea>
            </div>
            <div className="flex gap-2 pt-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Submit
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Tabs Component Demo</h1>
        </div>

        {/* Basic Tabs - 4 Tabs */}
        <Card title="Basic Tabs" subtitle="Simple horizontal tabs with default styling">
          <Tabs tabs={basicTabs} />
        </Card>

      {/* Tabs with Icons & Badges */}
      <Card title="Tabs with Icons & Badges" subtitle="Icons and notification badges">
        <Tabs tabs={iconTabs} color="secondary" />
      </Card>

      {/* Complex Content Tabs */}
      <Card title="Tabs with Complex Content" subtitle="Cards, metrics, and detailed information">
        <Tabs tabs={contentTabs} color="primary" variant="pill" />
      </Card>

      {/* Graphs & Forms Tabs */}
      <Card title="Graphs & Forms" subtitle="Visualize data with graphs and capture input with forms">
        <Tabs tabs={graphsAndFormsTabs} color="primary" variant="pill" />
      </Card>

      {/* Disabled Tabs */}
      <Card title="Disabled Tabs" subtitle="Prevent access to certain tabs">
        <Tabs tabs={disabledTabs} />
      </Card>

      {/* Vertical Tabs */}
      <Card title="Vertical Tabs" subtitle="Stacked vertical layout">
        <div className="p-4 bg-gray-50 rounded-lg">
          <Tabs tabs={verticalTabs} orientation="vertical" color="success" variant="pill" />
        </div>
      </Card>
      </div>
    </div>
  )
}

export default TabsDemoPage
