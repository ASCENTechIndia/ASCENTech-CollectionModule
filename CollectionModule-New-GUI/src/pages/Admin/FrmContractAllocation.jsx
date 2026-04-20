import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import apiClient from '../../services/apiClient'
import { useNotification } from '../../context/useNotification'

function FrmContractAllocation() {
  const { showError, showSuccess } = useNotification()
  const [isChecked, setIsChecked] = useState(false)
  const [count, setCount] = useState('')
  const [message, setMessage] = useState('')
  const [loadingCount, setLoadingCount] = useState(true)
  const [allocating, setAllocating] = useState(false)

  const fetchRecordCount = async () => {
    setLoadingCount(true)
    try {
      const response = await apiClient.get('/admin/getAccCounts')
      const success = response?.success
      const firstRow = Array.isArray(response?.data) ? response.data[0] : null

      if (success && firstRow) {
        const value = firstRow.NULLFOSCOUNT ?? firstRow.NullFOSCount ?? 0
        setCount(Number(value))
      } else {
        setCount(0)
      }
    } catch (apiError) {
      setCount(0)
      showError(apiError?.message || 'Failed to fetch record count')
    } finally {
      setLoadingCount(false)
    }
  }

  const handleAllocateAccounts = async () => {
    setAllocating(true)
    setMessage('')

    try {
      const response = await apiClient.post('/admin/allocateAccount', {
        withSmaStatus: isChecked,
      })
      const success = response?.success
      const data = response?.data || {}

      if (success && data?.success) {
        setMessage(data.message || 'Contract Allocation Successful')
        showSuccess(data.message || 'Contract Allocation Successful')
        fetchRecordCount()
      } else {
        const failMessage = data?.message || 'Contract Allocation failed'
        setMessage(failMessage)
        showError(failMessage)
      }
    } catch (apiError) {
      const failMessage = apiError?.message || 'Contract Allocation failed'
      setMessage(failMessage)
      showError(failMessage)
    } finally {
      setAllocating(false)
    }
  }

  useEffect(() => {
    fetchRecordCount()
  }, [])

  return (
    <div className="main-content page-contract-allocation">
      <div className="page-header">
        <h1 className="page-title">Account Allocation</h1>
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-item">Home</Link>
          <span className="breadcrumb-item">Admin</span>
          <span className="breadcrumb-item active">Contract Allocation</span>
        </nav>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="form-check mb-3">
            <input
              id="withSmaStatus"
              type="checkbox"
              className="form-check-input"
              checked={isChecked}
              onChange={(event) => setIsChecked(event.target.checked)}
            />
            <label htmlFor="withSmaStatus" className="form-check-label">
              Along with SMA Status
            </label>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAllocateAccounts}
            disabled={allocating}
          >
            {allocating ? 'Allocating...' : 'Allocate Accounts'}
          </button>

          {message && (
            <div className="alert alert-info mt-3 mb-0" role="alert">
              {message}
            </div>
          )}

          <div className="mt-3 text-muted">
            {loadingCount
              ? 'Loading count...'
              : count === 0
                ? 'No New records for allocation'
                : `Count: ${count}`}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FrmContractAllocation
