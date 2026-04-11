import { useState } from 'react'
import {
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  Info,
  X,
} from 'lucide-react'

export default function AlertModalDemoPage() {
  const [showToasts, setShowToasts] = useState({
    success: false,
    error: false,
    warning: false,
    info: false,
  })

  const [modals, setModals] = useState({
    basicAlert: false,
    confirmDialog: false,
    deleteConfirm: false,
    formModal: false,
    largeModal: false,
  })

  const showToast = (type) => {
    setShowToasts((prev) => ({ ...prev, [type]: true }))
    setTimeout(() => {
      setShowToasts((prev) => ({ ...prev, [type]: false }))
    }, 4000)
  }

  const openModal = (key) => {
    setModals((prev) => ({ ...prev, [key]: true }))
  }

  const closeModal = (key) => {
    setModals((prev) => ({ ...prev, [key]: false }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Alert & Modal Components</h1>
        </div>

        {/* Section 1: Alert Messages */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Alert Messages</h2>

          {/* Success Alert */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Success Alert</h3>
            <div className="p-4 bg-success-50 border border-success-200 rounded-lg flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-success-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-success-900">Operation Successful!</h4>
                <p className="text-success-800 text-sm mt-1">
                  Your action has been completed successfully. The changes have been saved.
                </p>
              </div>
              <button
                onClick={() => {}}
                className="text-success-600 hover:text-success-800 flex-shrink-0 mt-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Error Alert */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Error Alert</h3>
            <div className="p-4 bg-danger-50 border border-danger-200 rounded-lg flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-danger-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-danger-900">Error Occurred</h4>
                <p className="text-danger-800 text-sm mt-1">
                  Something went wrong while processing your request. Please try again.
                </p>
              </div>
              <button
                onClick={() => {}}
                className="text-danger-600 hover:text-danger-800 flex-shrink-0 mt-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Warning Alert */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Warning Alert</h3>
            <div className="p-4 bg-warning-50 border border-warning-200 rounded-lg flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-warning-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-warning-900">Warning</h4>
                <p className="text-warning-800 text-sm mt-1">
                  Please review this important information before proceeding with your action.
                </p>
              </div>
              <button
                onClick={() => {}}
                className="text-warning-600 hover:text-warning-800 flex-shrink-0 mt-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Info Alert */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Info Alert</h3>
            <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg flex items-start gap-4">
              <Info className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-primary-900">Information</h4>
                <p className="text-primary-800 text-sm mt-1">
                  This is informational content that you should be aware of.
                </p>
              </div>
              <button
                onClick={() => {}}
                className="text-primary-600 hover:text-primary-800 flex-shrink-0 mt-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Alert with Actions */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Alert with Action Button</h3>
            <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg flex items-start gap-4">
              <Info className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-primary-900">New Feature Available</h4>
                <p className="text-primary-800 text-sm mt-1">
                  Check out our new feature that can help you be more productive.
                </p>
                <button className="mt-3 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors">
                  Learn More
                </button>
              </div>
              <button
                onClick={() => {}}
                className="text-primary-600 hover:text-primary-800 flex-shrink-0 mt-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Toast Notifications */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Toast Notifications</h2>
          <p className="text-gray-600 mb-6">
            Click the buttons below to see toast notifications in action. They appear at the bottom-right.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => showToast('success')}
              className="px-6 py-3 bg-success-600 hover:bg-success-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2 justify-center"
            >
              <CheckCircle className="w-4 h-4" />
              Show Success Toast
            </button>
            <button
              onClick={() => showToast('error')}
              className="px-6 py-3 bg-danger-600 hover:bg-danger-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2 justify-center"
            >
              <AlertCircle className="w-4 h-4" />
              Show Error Toast
            </button>
            <button
              onClick={() => showToast('warning')}
              className="px-6 py-3 bg-warning-600 hover:bg-warning-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2 justify-center"
            >
              <AlertTriangle className="w-4 h-4" />
              Show Warning Toast
            </button>
            <button
              onClick={() => showToast('info')}
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2 justify-center"
            >
              <Info className="w-4 h-4" />
              Show Info Toast
            </button>
          </div>

          {/* Toast Preview */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-4">Toast Preview (Bottom-Right Corner):</p>
            <div className="relative bg-white rounded border border-gray-300 h-32 flex items-center justify-center">
              <div className="absolute bottom-4 right-4 w-72 p-3 bg-success-600 text-white rounded-lg shadow-lg flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1">Operation completed successfully!</span>
                <button className="ml-2 hover:opacity-80">×</button>
              </div>
              <p className="text-gray-500">Toast appears here</p>
            </div>
          </div>
        </div>

        {/* Section 3: Modal Dialogs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Modal Dialogs</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => openModal('basicAlert')}
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
            >
              Basic Alert Modal
            </button>
            <button
              onClick={() => openModal('confirmDialog')}
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
            >
              Confirmation Dialog
            </button>
            <button
              onClick={() => openModal('deleteConfirm')}
              className="px-6 py-3 bg-danger-600 hover:bg-danger-700 text-white font-medium rounded-lg transition-colors"
            >
              Delete Confirmation
            </button>
            <button
              onClick={() => openModal('formModal')}
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
            >
              Form Modal
            </button>
          </div>

          <p className="text-sm text-gray-500">
            Click any button above to see the modal in action
          </p>
        </div>

        {/* Section 4: Modal Components Code Examples */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Implementation Examples</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Alert Box Code */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Success Alert</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded text-xs overflow-x-auto">
{`<div className="p-4 bg-success-50 
            border border-success-200 
            rounded-lg flex items-start gap-4">
  <CheckCircle className="w-6 h-6 
    text-success-600" />
  <div>
    <h4 className="font-semibold 
      text-success-900">
      Success!
    </h4>
    <p className="text-success-800 text-sm">
      Your action completed.
    </p>
  </div>
</div>`}
              </pre>
            </div>

            {/* Toast Code */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Toast Notification</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded text-xs overflow-x-auto">
{`<div className="fixed bottom-4 right-4 
            p-4 bg-success-600 
            text-white rounded-lg shadow-lg 
            flex items-center gap-3">
  <CheckCircle className="w-5 h-5" />
  <span>Success message</span>
  <button onClick={close}>×</button>
</div>`}
              </pre>
            </div>

            {/* Basic Modal Code */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Basic Modal Dialog</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded text-xs overflow-x-auto">
{`{isOpen && (
  <div className="fixed inset-0 
              bg-black bg-opacity-50 
              flex items-center justify-center">
    <div className="bg-white rounded-lg 
                  shadow-xl p-6 max-w-md w-full">
      <h2>Modal Title</h2>
      <p>Modal content here</p>
      <div className="flex gap-3 mt-6">
        <button>Cancel</button>
        <button>Confirm</button>
      </div>
    </div>
  </div>
)}`}
              </pre>
            </div>

            {/* Confirmation Modal Code */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Confirmation Modal</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded text-xs overflow-x-auto">
{`{isOpen && (
  <div className="fixed inset-0 
              bg-black bg-opacity-50 
              flex items-center justify-center">
    <div className="bg-white rounded-lg p-6">
      <AlertTriangle className="text-warning" />
      <h2>Confirm Action</h2>
      <p>Are you sure?</p>
      <div className="flex gap-3">
        <button>No, Cancel</button>
        <button className="bg-danger">
          Yes, Confirm
        </button>
      </div>
    </div>
  </div>
)}`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notifications - Display */}
      {showToasts.success && (
        <div className="fixed bottom-4 right-4 w-80 p-4 bg-success-600 text-white rounded-lg shadow-lg flex items-center gap-3 animate-slideUp">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span className="flex-1">Operation completed successfully!</span>
          <button
            onClick={() => setShowToasts((prev) => ({ ...prev, success: false }))}
            className="ml-2 hover:opacity-80"
          >
            ×
          </button>
        </div>
      )}

      {showToasts.error && (
        <div className="fixed bottom-4 right-4 w-80 p-4 bg-danger-600 text-white rounded-lg shadow-lg flex items-center gap-3 animate-slideUp">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="flex-1">An error occurred. Please try again.</span>
          <button
            onClick={() => setShowToasts((prev) => ({ ...prev, error: false }))}
            className="ml-2 hover:opacity-80"
          >
            ×
          </button>
        </div>
      )}

      {showToasts.warning && (
        <div className="fixed bottom-4 right-4 w-80 p-4 bg-warning-600 text-white rounded-lg shadow-lg flex items-center gap-3 animate-slideUp">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          <span className="flex-1">Please be careful with this action.</span>
          <button
            onClick={() => setShowToasts((prev) => ({ ...prev, warning: false }))}
            className="ml-2 hover:opacity-80"
          >
            ×
          </button>
        </div>
      )}

      {showToasts.info && (
        <div className="fixed bottom-4 right-4 w-80 p-4 bg-primary-600 text-white rounded-lg shadow-lg flex items-center gap-3 animate-slideUp">
          <Info className="w-5 h-5 flex-shrink-0" />
          <span className="flex-1">Here is some helpful information.</span>
          <button
            onClick={() => setShowToasts((prev) => ({ ...prev, info: false }))}
            className="ml-2 hover:opacity-80"
          >
            ×
          </button>
        </div>
      )}

      {/* Basic Alert Modal */}
      {modals.basicAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-fadeIn">
            <div className="flex items-start gap-4 mb-4">
              <Info className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Information</h2>
                <p className="text-gray-600 text-sm mt-2">
                  This is a basic information modal. You can use it to display important messages to users.
                </p>
              </div>
              <button
                onClick={() => closeModal('basicAlert')}
                className="text-gray-400 hover:text-gray-600 flex-shrink-0"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
              <button
                onClick={() => closeModal('basicAlert')}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog Modal */}
      {modals.confirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-fadeIn">
            <div className="flex items-start gap-4 mb-4">
              <AlertTriangle className="w-6 h-6 text-warning-600 flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Confirm Action</h2>
                <p className="text-gray-600 text-sm mt-2">
                  Are you sure you want to proceed with this action? This operation can be reversed.
                </p>
              </div>
              <button
                onClick={() => closeModal('confirmDialog')}
                className="text-gray-400 hover:text-gray-600 flex-shrink-0"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
              <button
                onClick={() => closeModal('confirmDialog')}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => closeModal('confirmDialog')}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
              >
                Yes, Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {modals.deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-fadeIn">
            <div className="flex items-start gap-4 mb-4">
              <AlertCircle className="w-6 h-6 text-danger-600 flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Delete Item?</h2>
                <p className="text-gray-600 text-sm mt-2">
                  This action cannot be undone. Are you sure you want to permanently delete this item?
                </p>
              </div>
              <button
                onClick={() => closeModal('deleteConfirm')}
                className="text-gray-400 hover:text-gray-600 flex-shrink-0"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
              <button
                onClick={() => closeModal('deleteConfirm')}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => closeModal('deleteConfirm')}
                className="px-4 py-2 bg-danger-600 hover:bg-danger-700 text-white font-medium rounded-lg transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {modals.formModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-fadeIn">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Add New Item</h2>
              <button
                onClick={() => closeModal('formModal')}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Item Name</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Description</label>
                <textarea
                  placeholder="Enter description"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
                />
              </div>
            </div>
            <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
              <button
                onClick={() => closeModal('formModal')}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => closeModal('formModal')}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
