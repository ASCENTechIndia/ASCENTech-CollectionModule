import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Select, Textarea, Button } from '../../components/ui'
import { AlertCircle, CheckCircle } from 'lucide-react'

export default function TwoColumnFormPage() {
  const [submittedData, setSubmittedData] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      department: '',
      designation: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      remarks: '',
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
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Two Column Form Layout</h1>
        </div>

        {/* Success Message */}
        {submittedData && (
          <div className="p-4 bg-success-50 border border-success-200 rounded-lg flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-success-900">Form Submitted Successfully!</h3>
              <p className="text-success-800 text-sm mt-1">
                Your information has been recorded. Check the console for submitted data.
              </p>
            </div>
          </div>
        )}

        {/* Main Form Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Section 1: Personal Information */}
            <div className="mb-10">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    First Name <span className="text-danger-600">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('firstName', {
                      required: 'First name is required',
                    })}
                    placeholder="Enter first name"
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${
                      errors.firstName
                        ? 'border-danger-500'
                        : 'border-gray-300'
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-danger-600 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Last Name <span className="text-danger-600">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('lastName', {
                      required: 'Last name is required',
                    })}
                    placeholder="Enter last name"
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${
                      errors.lastName
                        ? 'border-danger-500'
                        : 'border-gray-300'
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-danger-600 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.lastName.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Email Address <span className="text-danger-600">*</span>
                  </label>
                  <input
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    placeholder="Enter email address"
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${
                      errors.email
                        ? 'border-danger-500'
                        : 'border-gray-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-danger-600 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Phone Number <span className="text-danger-600">*</span>
                  </label>
                  <input
                    type="tel"
                    {...register('phone', {
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: 'Phone must be 10 digits',
                      },
                    })}
                    placeholder="Enter 10-digit phone number"
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${
                      errors.phone
                        ? 'border-danger-500'
                        : 'border-gray-300'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-danger-600 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Section 2: Professional Information */}
            <div className="mb-10">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                Professional Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Company */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    {...register('company')}
                    placeholder="Enter company name"
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
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>

                {/* Designation */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    {...register('designation')}
                    placeholder="Enter job title"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Address Information */}
            <div className="mb-10">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                Address Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    {...register('address')}
                    placeholder="Enter street address"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    {...register('city')}
                    placeholder="Enter city"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    State/Province
                  </label>
                  <input
                    type="text"
                    {...register('state')}
                    placeholder="Enter state"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Zip Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    ZIP/Postal Code
                  </label>
                  <input
                    type="text"
                    {...register('zipCode')}
                    placeholder="Enter postal code"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Country */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Country
                  </label>
                  <select
                    {...register('country')}
                    defaultValue=""
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="">Select Country</option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 4: Remarks */}
            <div className="mb-10">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                Additional Information
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Remarks / Comments
                </label>
                <textarea
                  {...register('remarks')}
                  placeholder="Enter any additional remarks or comments..."
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none"
                />
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
                type="reset"
                onClick={handleReset}
                className="px-8 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Code Example */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Layout Usage
          </h3>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Fields automatically stack on mobile, 2 columns on tablet+ */}
  <input type="text" placeholder="Field 1" />
  <input type="text" placeholder="Field 2" />
  <input type="email" placeholder="Field 3" />
  <select>...</select>
</div>`}
          </pre>
        </div>
      </div>
    </div>
  )
}
