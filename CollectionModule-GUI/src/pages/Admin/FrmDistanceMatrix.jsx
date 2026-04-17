import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import apiClient from '../../services/apiService'
import { useNotification } from '../../context/NotificationContext'

const FrmDistanceMatrix = () => {
  const { showSuccess, showError } = useNotification()
  const [loading, setLoading] = useState(false)

  const handleMatrixInsertion = async () => {
    setLoading(true)

    try {
      const response = await apiClient.post('/admin/matrix-distance-insertion')
      const { success, data, message } = response?.data || {}

      if (success) {
        const displayMessage = data?.message || message || 'Distance matrix updated successfully'
        showSuccess(displayMessage)
        return
      }

      showError(message || 'Failed to update distance matrix')
    } catch (error) {
      showError(error?.response?.data?.message || error?.message || 'Failed to update distance matrix')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-112px)] bg-gray-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl rounded-2xl border border-gray-200 bg-white p-6 shadow-soft sm:p-10">
        <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-4">
          <button
            type="button"
            onClick={handleMatrixInsertion}
            disabled={loading}
            className="inline-flex min-w-[260px] items-center justify-center rounded-lg bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-md transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? 'Processing...' : 'Matrix Distance Insertion'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default FrmDistanceMatrix
