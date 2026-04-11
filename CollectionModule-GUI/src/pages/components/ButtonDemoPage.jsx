import { useState } from 'react'
import {
  Heart,
  Download,
  Upload,
  Plus,
  Trash2,
  Edit,
  Eye,
  Search,
  Send,
  Copy,
  Check,
  X,
  ArrowRight,
  ChevronDown,
  Settings,
  LogOut,
  Bell,
  Star,
} from 'lucide-react'

export default function ButtonDemoPage() {
  const [loadingBtn, setLoadingBtn] = useState(null)

  const handleLoadingClick = (btnKey) => {
    setLoadingBtn(btnKey)
    setTimeout(() => setLoadingBtn(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">All Button Types & Variants</h1>
        </div>

        {/* Section 1: Button Variants */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Button Variants</h2>

          {/* Primary Buttons */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Primary</h3>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors">
                Primary Button
              </button>
              <button disabled className="px-6 py-2.5 bg-gray-400 text-white font-medium rounded-lg cursor-not-allowed opacity-50">
                Disabled
              </button>
              <button className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                With Icon
              </button>
            </div>
          </div>

          {/* Secondary Buttons */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Secondary</h3>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium rounded-lg transition-colors">
                Secondary Button
              </button>
              <button disabled className="px-6 py-2.5 bg-gray-200 text-gray-900 font-medium rounded-lg cursor-not-allowed opacity-50">
                Disabled
              </button>
              <button className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium rounded-lg transition-colors flex items-center gap-2">
                <Edit className="w-4 h-4" />
                Edit
              </button>
            </div>
          </div>

          {/* Success Buttons */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Success</h3>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-2.5 bg-success-600 hover:bg-success-700 text-white font-medium rounded-lg transition-colors">
                Success Button
              </button>
              <button disabled className="px-6 py-2.5 bg-gray-400 text-white font-medium rounded-lg cursor-not-allowed opacity-50">
                Disabled
              </button>
              <button className="px-6 py-2.5 bg-success-600 hover:bg-success-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
                <Check className="w-4 h-4" />
                Confirm
              </button>
            </div>
          </div>

          {/* Danger Buttons */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Danger</h3>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-2.5 bg-danger-600 hover:bg-danger-700 text-white font-medium rounded-lg transition-colors">
                Danger Button
              </button>
              <button disabled className="px-6 py-2.5 bg-gray-400 text-white font-medium rounded-lg cursor-not-allowed opacity-50">
                Disabled
              </button>
              <button className="px-6 py-2.5 bg-danger-600 hover:bg-danger-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>

          {/* Warning Buttons */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Warning</h3>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-2.5 bg-warning-600 hover:bg-warning-700 text-white font-medium rounded-lg transition-colors">
                Warning Button
              </button>
              <button disabled className="px-6 py-2.5 bg-gray-400 text-white font-medium rounded-lg cursor-not-allowed opacity-50">
                Disabled
              </button>
              <button className="px-6 py-2.5 bg-warning-600 hover:bg-warning-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Alert
              </button>
            </div>
          </div>

          {/* Outline Buttons */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Outline / Ghost</h3>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-2.5 border border-primary-600 text-primary-600 hover:bg-primary-50 font-medium rounded-lg transition-colors">
                Outline Button
              </button>
              <button disabled className="px-6 py-2.5 border border-gray-300 text-gray-600 cursor-not-allowed opacity-50 font-medium rounded-lg">
                Disabled
              </button>
              <button className="px-6 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-lg transition-colors flex items-center gap-2">
                <Copy className="w-4 h-4" />
                Copy
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Button Sizes */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Button Sizes</h2>

          <div className="space-y-6">
            {/* Extra Small */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Extra Small (xs)</h3>
              <div className="flex flex-wrap items-center gap-3">
                <button className="px-3 py-1 text-xs bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors">
                  XS Button
                </button>
                <button className="px-3 py-1 text-xs bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors flex items-center gap-1">
                  <Plus className="w-3 h-3" />
                  Add
                </button>
              </div>
            </div>

            {/* Small */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Small (sm)</h3>
              <div className="flex flex-wrap items-center gap-3">
                <button className="px-4 py-2 text-sm bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors">
                  Small Button
                </button>
                <button className="px-4 py-2 text-sm bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>

            {/* Medium (Default) */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Medium (md - Default)</h3>
              <div className="flex flex-wrap items-center gap-3">
                <button className="px-6 py-2.5 text-base bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors">
                  Medium Button
                </button>
                <button className="px-6 py-2.5 text-base bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload File
                </button>
              </div>
            </div>

            {/* Large */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Large (lg)</h3>
              <div className="flex flex-wrap items-center gap-3">
                <button className="px-8 py-3 text-lg bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors">
                  Large Button
                </button>
                <button className="px-8 py-3 text-lg bg-success-600 hover:bg-success-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  Create Asset
                </button>
              </div>
            </div>

            {/* Extra Large */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Extra Large (xl)</h3>
              <div className="flex flex-wrap items-center gap-3">
                <button className="px-10 py-4 text-xl bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg transition-colors">
                  Extra Large Button
                </button>
                <button className="px-10 py-4 text-xl bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg transition-colors flex items-center gap-2">
                  <Star className="w-6 h-6" />
                  Featured
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Button Shapes */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Button Shapes</h2>

          <div className="space-y-6">
            {/* Square/Sharp */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Square (No Radius)</h3>
              <div className="flex flex-wrap gap-3">
                <button className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors">
                  Square Button
                </button>
                <button className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Search
                </button>
              </div>
            </div>

            {/* Rounded (Default) */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Rounded (rounded-lg)</h3>
              <div className="flex flex-wrap gap-3">
                <button className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors">
                  Rounded Button
                </button>
                <button className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Send
                </button>
              </div>
            </div>

            {/* Full Rounded / Pill */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pill (rounded-full)</h3>
              <div className="flex flex-wrap gap-3">
                <button className="px-8 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-full transition-colors">
                  Pill Button
                </button>
                <button className="px-8 py-2.5 bg-success-600 hover:bg-success-700 text-white font-medium rounded-full transition-colors flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Like
                </button>
              </div>
            </div>

            {/* Icon Only Circle */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Icon Only Circle</h3>
              <div className="flex flex-wrap gap-3">
                <button className="w-10 h-10 bg-primary-600 hover:bg-primary-700 text-white rounded-full flex items-center justify-center transition-colors">
                  <Plus className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 bg-danger-600 hover:bg-danger-700 text-white rounded-full flex items-center justify-center transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 bg-warning-600 hover:bg-warning-700 text-white rounded-full flex items-center justify-center transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 border-2 border-primary-600 text-primary-600 hover:bg-primary-50 rounded-full flex items-center justify-center transition-colors">
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Button States */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Button States</h2>

          <div className="space-y-6">
            {/* Hover State */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Hover State (Move mouse over)</h3>
              <button className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 hover:shadow-lg text-white font-medium rounded-lg transition-all duration-200">
                Hover Me - Shadow & Color Change
              </button>
            </div>

            {/* Active State */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Active State</h3>
              <button className="px-6 py-2.5 bg-primary-700 text-white font-medium rounded-lg ring-4 ring-primary-200">
                Active Button (pressed)
              </button>
            </div>

            {/* Disabled State */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Disabled State (No Interaction)</h3>
              <button disabled className="px-6 py-2.5 bg-gray-400 text-gray-600 font-medium rounded-lg cursor-not-allowed opacity-50">
                Disabled Button
              </button>
            </div>

            {/* Loading State */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Loading State</h3>
              <button
                onClick={() => handleLoadingClick('loading')}
                className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
              >
                {loadingBtn === 'loading' ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Click to Load
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Section 5: Button with Different Icon Positions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Icon Positions</h2>

          <div className="space-y-6">
            {/* Icon Left */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Icon on Left (Default)</h3>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button className="px-6 py-2.5 bg-success-600 hover:bg-success-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload
                </button>
              </div>
            </div>

            {/* Icon Right */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Icon on Right</h3>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
                  More Options
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Icon Only */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Icon Only (with tooltip)</h3>
              <div className="flex flex-wrap gap-3" title="Edit">
                <button title="Edit" className="p-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
                  <Edit className="w-5 h-5" />
                </button>
                <button title="Delete" className="p-2.5 bg-danger-600 hover:bg-danger-700 text-white rounded-lg transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
                <button title="Settings" className="p-2.5 bg-warning-600 hover:bg-warning-700 text-white rounded-lg transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 6: Button Groups */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Button Groups</h2>

          <div className="space-y-6">
            {/* Horizontal Group */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Horizontal Button Group</h3>
              <div className="flex gap-3">
                <button className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors">
                  Save
                </button>
                <button className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium rounded-lg transition-colors">
                  Cancel
                </button>
                <button className="px-6 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-lg transition-colors">
                  Delete
                </button>
              </div>
            </div>

            {/* Vertical Group */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Vertical Button Group</h3>
              <div className="flex flex-col gap-3 max-w-xs">
                <button className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors">
                  Primary Action
                </button>
                <button className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium rounded-lg transition-colors">
                  Secondary Action
                </button>
                <button className="px-6 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-lg transition-colors">
                  Cancel
                </button>
              </div>
            </div>

            {/* Compact Group */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Compact Button Group</h3>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button className="px-4 py-2 bg-primary-600 text-white font-medium border-r border-gray-300 hover:bg-primary-700 transition-colors">
                  List
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 font-medium border-r border-gray-300 hover:bg-gray-200 transition-colors">
                  Grid
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors">
                  Table
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 7: Full Width Buttons */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Full Width & Special Cases</h2>

          <div className="space-y-6">
            {/* Full Width */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Full Width Button</h3>
              <button className="w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors">
                Full Width Button
              </button>
            </div>

            {/* Gradient Button */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Gradient Button</h3>
              <button className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:shadow-lg text-white font-medium rounded-lg transition-all">
                Gradient Button
              </button>
            </div>

            {/* Button with Badge */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Button with Badge</h3>
              <button className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2 relative">
                Notifications
                <span className="absolute -top-2 -right-2 bg-danger-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>
            </div>

            {/* Split Button */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Split Button with Dropdown</h3>
              <div className="flex border border-primary-600 rounded-lg overflow-hidden">
                <button className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium flex items-center gap-2 transition-colors">
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button className="px-3 py-2.5 bg-primary-600 hover:bg-primary-700 text-white border-l border-primary-500 transition-colors flex items-center justify-center">
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 8: Code Examples */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Code Examples</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Primary Button */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Primary Button</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded text-xs overflow-x-auto">
{`<button className="px-6 py-2.5 
  bg-primary-600 
  hover:bg-primary-700 
  text-white 
  font-medium 
  rounded-lg 
  transition-colors">
  Click Me
</button>`}
              </pre>
            </div>

            {/* Button with Icon */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Button with Icon</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded text-xs overflow-x-auto">
{`<button className="px-6 py-2.5 
  bg-primary-600 
  hover:bg-primary-700 
  text-white 
  font-medium 
  rounded-lg 
  flex items-center gap-2">
  <Download className="w-4 h-4" />
  Download
</button>`}
              </pre>
            </div>

            {/* Outline Button */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Outline Button</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded text-xs overflow-x-auto">
{`<button className="px-6 py-2.5 
  border border-primary-600 
  text-primary-600 
  hover:bg-primary-50 
  font-medium 
  rounded-lg 
  transition-colors">
  Outline
</button>`}
              </pre>
            </div>

            {/* Icon Only Circle */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Icon Only Circle</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded text-xs overflow-x-auto">
{`<button className="w-10 h-10 
  bg-primary-600 
  hover:bg-primary-700 
  text-white 
  rounded-full 
  flex items-center 
  justify-center">
  <Plus className="w-5 h-5" />
</button>`}
              </pre>
            </div>

            {/* Disabled Button */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Disabled Button</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded text-xs overflow-x-auto">
{`<button 
  disabled 
  className="px-6 py-2.5 
  bg-gray-400 
  text-white 
  font-medium 
  rounded-lg 
  cursor-not-allowed 
  opacity-50">
  Disabled
</button>`}
              </pre>
            </div>

            {/* Loading Button */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Loading Button</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded text-xs overflow-x-auto">
{`<button className="px-6 py-2.5 
  bg-primary-600 
  font-medium 
  rounded-lg 
  flex items-center gap-2">
  <svg className="animate-spin 
    h-4 w-4">...</svg>
  Loading...
</button>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
