import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Input, Select, Alert } from '../../components/ui'
import { useForm } from 'react-hook-form'

const ASSET_TYPES = [
  { value: 'laptop', label: 'Laptop' },
  { value: 'mobile', label: 'Mobile Phone' },
  { value: 'tablet', label: 'Tablet' },
  { value: 'desktop', label: 'Desktop' },
  { value: 'monitor', label: 'Monitor' },
]

const STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'maintenance', label: 'Under Maintenance' },
  { value: 'decommissioned', label: 'Decommissioned' },
]

export default function AssetCreatePage() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, watch } = useForm()
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const onSubmit = async (data) => {
    setLoading(true)
    setSubmitError(null)
    try {
      // API call will be implemented in services
      console.log('Form data:', data)
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      navigate('/assets')
    } catch (error) {
      setSubmitError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const assetType = watch('assetType')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Create New Asset</h1>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-8">
          {submitError && (
            <Alert variant="danger" className="mb-6">
              {submitError}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Basic Information
              </h2>
              <div className="space-y-4">
                <Input
                  label="Asset Name"
                  placeholder="e.g., MacBook Pro M1"
                  {...register('assetName', { required: 'Asset name is required' })}
                  error={errors.assetName?.message}
                />

                <Select
                  label="Asset Type"
                  options={ASSET_TYPES}
                  {...register('assetType', { required: 'Asset type is required' })}
                  error={errors.assetType?.message}
                />

              <Input
                label="Serial Number"
                placeholder="Enter serial number"
                {...register('serialNumber', { required: 'Serial number is required' })}
                error={errors.serialNumber?.message}
              />

              <Input
                label="Model"
                placeholder="e.g., PRO16,1"
                {...register('model')}
              />
            </div>
          </div>

          {/* Asset Details */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Asset Details
            </h2>
            <div className="space-y-4">
              <Input
                label="Purchase Date"
                type="date"
                {...register('purchaseDate')}
              />

              <Input
                label="Cost (₹)"
                type="number"
                placeholder="0.00"
                {...register('cost')}
              />

              <Select
                label="Status"
                options={STATUS_OPTIONS}
                {...register('status', { required: 'Status is required' })}
                error={errors.status?.message}
              />

              <Input
                label="Warranty Until"
                type="date"
                {...register('warranty')}
              />
            </div>
          </div>

          {/* Vendor Information */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Vendor Information
            </h2>
            <div className="space-y-4">
              <Input
                label="Vendor Name"
                placeholder="Vendor name"
                {...register('vendorName')}
              />

              <Input
                label="Vendor Contact"
                placeholder="Contact number"
                {...register('vendorContact')}
              />

              <Input
                label="Invoice Number"
                placeholder="Invoice #"
                {...register('invoiceNumber')}
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Additional Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="form-label">Notes</label>
                <textarea
                  className="input-field resize-none"
                  rows="4"
                  placeholder="Add any additional notes..."
                  {...register('notes')}
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="border-t pt-6 flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/assets')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Asset'}
            </Button>
          </div>
          </form>
        </div>
      </div>
    </div>
  )
}
