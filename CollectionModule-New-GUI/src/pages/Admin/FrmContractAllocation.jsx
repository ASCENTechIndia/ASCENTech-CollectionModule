import { Link } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import apiClient from '../../services/apiClient'
import { useNotification } from '../../context/useNotification'
import { useConfirm } from '../../context/ConfirmModalContext'
import { useLoader } from '../../context/LoaderContext'

function FrmContractAllocation() {
  const { showError, showSuccess } = useNotification()
  const confirm = useConfirm();
  const [isChecked, setIsChecked] = useState(false)
  const [count, setCount] = useState('')
  const [message, setMessage] = useState('')
  const [loadingCount, setLoadingCount] = useState(true)
  const [allocating, setAllocating] = useState(false)
  const { setLoader } = useLoader(); 

  const fetchRecordCount = useCallback(async () => {
    setLoadingCount(true)
    try {
      setLoader(true);
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
      setLoader(false);
    }
  }, [showError])

  const handleAllocateAccounts = async () => {
    setAllocating(true)
    setMessage('')

    const agreed = await confirm("Do you want to allocate accounts?");
    if (!agreed) {
      setAllocating(false);
      return;
    }

    try {
      setLoader(true);
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
      setLoader(false);
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchRecordCount()
    }, 0)

    return () => window.clearTimeout(timer)
  }, [fetchRecordCount])

  return (
    <div className="main-content page-contract-allocation">
      <div className="page-header">
        <h1 className="page-title">Account Allocation</h1>
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
                  <h5 className="mb-2 fw-semibold">Account Allocation</h5>
                  <p className="mb-0 text-muted">
                    This page is used to assign cases to Field Officers (FOS) based on their designated pincodes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto" style={{ maxWidth: '760px' }}>
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

            <div className="d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-primary px-4"
                onClick={handleAllocateAccounts}
                disabled={allocating}
              >
                {allocating ? 'Allocating...' : 'Allocate Accounts'}
              </button>
            </div>

            <div className="mt-3 text-muted text-center">
              {loadingCount
                ? 'Loading count...'
                : count === 0
                  ? 'No New records for allocation'
                  : `Count: ${count}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FrmContractAllocation
