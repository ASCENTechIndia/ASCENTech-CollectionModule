import { Link } from 'react-router-dom'
import { useState } from 'react'
import apiClient from '../../services/apiClient'
import { useNotification } from '../../context/useNotification'

function FrmDistanceMatrix() {
  const { showSuccess, showError } = useNotification()
  const [loading, setLoading] = useState(false)

  const handleMatrixInsertion = async () => {
    setLoading(true)

    try {
      const response = await apiClient.post('/admin/matrix-distance-insertion')
      const success = response?.success
      const data = response?.data || {}
      const message = data?.message || 'Distance matrix updated successfully'

      if (success) {
        showSuccess(message)
      } else {
        showError(message || 'Failed to update distance matrix')
      }
    } catch (apiError) {
      showError(apiError?.message || 'Failed to update distance matrix')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="main-content page-distance-matrix">
      <div className="page-header">
        <h1 className="page-title">Distance Matrix</h1>
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-item">Home</Link>
          <span className="breadcrumb-item">Admin</span>
          <span className="breadcrumb-item active">Distance Matrix</span>
        </nav>
      </div>

      <div className="card">
        <div className="card-body d-flex justify-content-center">
          <button
            type="button"
            onClick={handleMatrixInsertion}
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? 'Processing...' : 'Matrix Distance Insertion'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default FrmDistanceMatrix
