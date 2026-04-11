import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Select, Textarea, Button } from '../../components/ui'
import { AlertCircle, CheckCircle } from 'lucide-react'

export default function ThreeColumnFormPage() {
  const [submittedData, setSubmittedData] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      assetId: '',
      assetName: '',
      assetType: '',
      category: '',
      location: '',
      serialNumber: '',
      purchaseDate: '',
      warrantyDate: '',
      purchasePrice: '',
      currentValue: '',
      vendor: '',
      status: '',
      assignedTo: '',
      department: '',
      condition: '',
      lastServiceDate: '',
      nextServiceDate: '',
      maintenance: '',
      notes: '',
    },
  })

  const onSubmit = (data) => {
    setSubmittedData(data)
    setTimeout(() => setSubmittedData(null), 5000)
  }

  const handleReset = () => {
    reset()
    setSubmittedData(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Three Column Form Layout</h1>
        </div>

        {/* Success Message */}
        {submittedData && (
          <div className="p-4 bg-success-50 border border-success-200 rounded-lg flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-success-900">Form Submitted Successfully!</h3>
              <p className="text-success-800 text-sm mt-1">
                Asset information has been recorded. Check the console for submitted data.
              </p>
            </div>
          </div>
        )}

        {/* Main Form Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Section 1: Basic Asset Information */}
            <div className="mb-10">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                Basic Asset Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Asset ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Asset ID <span className="text-danger-600">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('assetId', {
                      required: 'Asset ID is required',
                    })}
                    placeholder="AST-001"
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${
                      errors.assetId
                        ? 'border-danger-500'
                        : 'border-gray-300'
                    }`}
                  />
                  {errors.assetId && (
                    <p className="text-danger-600 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.assetId.message}
                    </p>
                  )}
                </div>

                {/* Asset Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Asset Name <span className="text-danger-600">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('assetName', {
                      required: 'Asset name is required',
                    })}
                    placeholder="Enter asset name"
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${
                      errors.assetName
                        ? 'border-danger-500'
                        : 'border-gray-300'
                    }`}
                  />
                  {errors.assetName && (
                    <p className="text-danger-600 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.assetName.message}
                    </p>
                  )}
                </div>

                {/* Asset Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Asset Type <span className="text-danger-600">*</span>
                  </label>
                  <select
                    {...register('assetType', {
                      required: 'Asset type is required',
                    })}
                    defaultValue=""
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white ${
                      errors.assetType
                        ? 'border-danger-500'
                        : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Type</option>
                    <option value="Hardware">Hardware</option>
                    <option value="Software">Software</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Equipment">Equipment</option>
                    <option value="Vehicle">Vehicle</option>
                  </select>
                  {errors.assetType && (
                    <p className="text-danger-600 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.assetType.message}
                    </p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Category
                  </label>
                  <select
                    {...register('category')}
                    defaultValue=""
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="">Select Category</option>
                    <option value="Computing">Computing</option>
                    <option value="Networking">Networking</option>
                    <option value="Office">Office</option>
                    <option value="Miscellaneous">Miscellaneous</option>
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    {...register('location')}
                    placeholder="Enter location"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Serial Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Serial Number
                  </label>
                  <input
                    type="text"
                    {...register('serialNumber')}
                    placeholder="Enter serial number"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Financial Details */}
            <div className="mb-10">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                Financial Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Purchase Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Purchase Date
                  </label>
                  <input
                    type="date"
                    {...register('purchaseDate')}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Warranty Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Warranty Expiry Date
                  </label>
                  <input
                    type="date"
                    {...register('warrantyDate')}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Vendor */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Vendor/Supplier
                  </label>
                  <input
                    type="text"
                    {...register('vendor')}
                    placeholder="Enter vendor name"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Purchase Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Purchase Price (₹)
                  </label>
                  <input
                    type="number"
                    {...register('purchasePrice')}
                    placeholder="0.00"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Current Value */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Current Value (₹)
                  </label>
                  <input
                    type="number"
                    {...register('currentValue')}
                    placeholder="0.00"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Depreciation */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Depreciation Rate (%)
                  </label>
                  <input
                    type="number"
                    placeholder="5"
                    min="0"
                    max="100"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Assignment & Status */}
            <div className="mb-10">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                Assignment & Status
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Assigned To */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Assigned To
                  </label>
                  <input
                    type="text"
                    {...register('assignedTo')}
                    placeholder="Enter employee name"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Department */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Department
                  </label>
                  <select
                    {...register('department')}
                    defaultValue=""
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="">Select Department</option>
                    <option value="IT">IT</option>
                    <option value="Finance">Finance</option>
                    <option value="HR">HR</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Status
                  </label>
                  <select
                    {...register('status')}
                    defaultValue=""
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Retired">Retired</option>
                    <option value="Lost">Lost</option>
                  </select>
                </div>

                {/* Condition */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Condition
                  </label>
                  <select
                    {...register('condition')}
                    defaultValue=""
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="">Select Condition</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Poor">Poor</option>
                  </select>
                </div>

                {/* Last Service Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Last Service Date
                  </label>
                  <input
                    type="date"
                    {...register('lastServiceDate')}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Next Service Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Next Service Date
                  </label>
                  <input
                    type="date"
                    {...register('nextServiceDate')}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Additional Details */}
            <div className="mb-10">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                Additional Details
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Maintenance */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Maintenance Schedule
                  </label>
                  <select
                    {...register('maintenance')}
                    defaultValue=""
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="">Select Schedule</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Semi-Annually">Semi-Annually</option>
                    <option value="Annually">Annually</option>
                    <option value="As Needed">As Needed</option>
                  </select>
                </div>

                {/* Notes */}
                <div className="row-span-2">
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Notes / Remarks
                  </label>
                  <textarea
                    {...register('notes')}
                    placeholder="Enter any additional notes or remarks..."
                    rows={5}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="px-8 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-8 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Code Examples */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 3-Column Layout */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              3-Column Grid (Tab+)
            </h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
{`<div className="grid grid-cols-1 
             md:grid-cols-2 
             lg:grid-cols-3 
             gap-6">
  {/* 3 columns on desktop */}
  {/* 2 columns on tablet */}
  {/* 1 column on mobile */}
  <input ... />
  <input ... />
  <input ... />
</div>`}
            </pre>
          </div>

          {/* Responsive Behavior */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Responsive Breakpoints
            </h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
{`Mobile:    1 column (100%)
Tablet:    2 columns (md:)
Desktop:   3 columns (lg:)

gap-6 = 1.5rem spacing
between items`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
