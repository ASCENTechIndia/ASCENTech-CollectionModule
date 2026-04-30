import { Link } from 'react-router-dom'
import { useState } from 'react'
import apiClient from '../../services/apiClient'
import { useNotification } from '../../context/useNotification'
import { useConfirm } from '../../context/ConfirmModalContext'
import { useLoader } from '../../context/LoaderContext'

function FrmDistanceMatrix() {
  const { showSuccess, showError } = useNotification()
  const confirm = useConfirm();
  const [loading, setLoading] = useState(false)
  const { setLoader } = useLoader();

  const handleMatrixInsertion = async () => {
    setLoading(true)
    

    const agreed = await confirm("Do you want to insert distance matrix?");
    if (!agreed) {
      setLoading(false);
      return;
    }

    try {
      setLoader(true);
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
      setLoader(false);
    }
  }

  return (
    <div className="main-content page-distance-matrix">
      <div className="page-header">
        <h1 className="page-title">Distance Matrix</h1>
      </div>

      <div className="card">
        <div className="card-body py-4">
          <div className="mb-4 mx-auto" style={{ maxWidth: '760px' }}>
            <div className="border rounded-4 bg-body-tertiary p-4 p-md-5 shadow-sm">
              <div className="d-flex align-items-start gap-3">
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                  style={{ width: '44px', height: '44px', background: 'color-mix(in srgb, var(--accent-color), transparent 84%)', color: 'var(--accent-color)' }}
                >
                  <i className="bi bi-diagram-3 fs-5" />
                </div>
                <div className="flex-grow-1">
                  <h5 className="mb-2 fw-semibold">Distance Matrix</h5>
                  <p className="mb-0 text-muted">
                    This page is used to calculate and store the distance between the Field Officer’s (FOS) disposition location and the customer’s address.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center">
            <button
              type="button"
              onClick={handleMatrixInsertion}
              disabled={loading}
              className="btn btn-primary px-4"
            >
              {loading ? 'Processing...' : 'Add Distance Matrix'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FrmDistanceMatrix
