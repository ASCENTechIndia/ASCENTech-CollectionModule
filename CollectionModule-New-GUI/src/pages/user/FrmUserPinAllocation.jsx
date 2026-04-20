import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import apiClient from '../../services/apiClient'
import { useNotification } from '../../context/useNotification'

function FrmUserPinAllocation() {
  const navigate = useNavigate()
  const { showSuccess, showError, showWarning } = useNotification()

  const [allPincodes, setAllPincodes] = useState([])
  const [search, setSearch] = useState('')
  const [selectedPins, setSelectedPins] = useState([])
  const [userId, setUserId] = useState('')
  const [userName, setUserName] = useState('')

  const [loadingPincodes, setLoadingPincodes] = useState(false)
  const [loadingUsername, setLoadingUsername] = useState(false)
  const [loadingUserPincodes, setLoadingUserPincodes] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchPincodes = async () => {
      setLoadingPincodes(true)
      try {
        const response = await apiClient.get('/assignPincode/getPincodeList')
        const success = response?.success
        const data = Array.isArray(response?.data) ? response.data : []

        if (success && data.length) {
          const codes = data.map((item) => String(item.VAR_PINCODE_NO ?? item.var_pincode_no ?? '')).filter(Boolean)
          setAllPincodes(codes)
        } else {
          setAllPincodes([])
        }
      } catch (apiError) {
        showError(apiError?.message || 'Failed to load pincode list')
        setAllPincodes([])
      } finally {
        setLoadingPincodes(false)
      }
    }

    fetchPincodes()
  }, [showError])

  const handleSearchUser = async () => {
    const trimmedUserId = userId.trim()
    if (!trimmedUserId) {
      showWarning('Please enter a User ID first.')
      return
    }

    if (!/^\d+$/.test(trimmedUserId)) {
      showWarning('User ID must contain numbers only.')
      return
    }

    setLoadingUsername(true)
    setLoadingUserPincodes(true)

    try {
      const [usernameResult, pincodesResult] = await Promise.allSettled([
        apiClient.get('/assignPincode/fetchUsername', { params: { userId: trimmedUserId } }),
        apiClient.get('/assignPincode/fetchUserPincodes', { params: { userId: trimmedUserId } }),
      ])

      if (usernameResult.status === 'fulfilled') {
        const response = usernameResult.value
        const success = response?.success
        const rows = Array.isArray(response?.data) ? response.data : []

        if (success && rows.length > 0) {
          setUserName(String(rows[0].VAR_USERMST_USERFULLNAME ?? rows[0].var_usermst_userfullname ?? ''))
        } else {
          setUserName('')
          showWarning('No user found for this User ID')
        }
      } else {
        setUserName('')
        showError('Failed to fetch username. Please try again.')
      }

      if (pincodesResult.status === 'fulfilled') {
        const response = pincodesResult.value
        const success = response?.success
        const rows = Array.isArray(response?.data) ? response.data : []

        if (success && rows.length > 0) {
          const userPincodes = rows.map((item) => String(item.VAR_USER_PINCODE ?? item.var_user_pincode ?? '')).filter(Boolean)
          setSelectedPins(userPincodes)
        } else {
          setSelectedPins([])
        }
      } else {
        setSelectedPins([])
        showError('Failed to fetch assigned pincodes. Please try again.')
      }
    } finally {
      setLoadingUsername(false)
      setLoadingUserPincodes(false)
    }
  }

  const handleAddPin = (pin) => {
    if (!selectedPins.includes(pin)) {
      setSelectedPins((prev) => [...prev, pin])
    }
  }

  const handleRemovePin = (pin) => {
    setSelectedPins((prev) => prev.filter((value) => value !== pin))
  }

  const filteredPins = useMemo(() => {
    const term = search.trim()
    if (!term) return allPincodes

    if (term.length !== 6) return []
    return allPincodes.filter((pin) => pin === term)
  }, [allPincodes, search])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const trimmedUserId = userId.trim()
    if (!trimmedUserId) {
      showWarning('User ID is required')
      return
    }

    if (!/^\d+$/.test(trimmedUserId)) {
      showWarning('User ID must contain numbers only.')
      return
    }

    if (selectedPins.length === 0) {
      showWarning('Please select at least one pincode to allocate.')
      return
    }

    setSubmitting(true)
    try {
      const payload = {
        username: Number(trimmedUserId),
        pincode_str: selectedPins.join('~'),
      }

      const response = await apiClient.post('/assignPincode/assignPinCode', payload)
      const success = response?.success
      const data = response?.data || {}
      const outErrCode = Number(data.Out_errorCode ?? data.out_errcode)
      const outMessage = data.Out_ErrorMsg ?? data.out_data ?? response?.message

      if (success && outErrCode === 9999) {
        showSuccess(outMessage || 'Pincodes allocated successfully')
        setUserId('')
        setUserName('')
        setSelectedPins([])
        setSearch('')
      } else {
        showError(outMessage || 'Allocation failed')
      }
    } catch (apiError) {
      showError(apiError?.message || 'Network error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="main-content page-user-pin-allocation">
      <div className="page-header">
        <h1 className="page-title">User PIN Assignment</h1>
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-item">Home</Link>
          <span className="breadcrumb-item">User</span>
          <span className="breadcrumb-item active">User PIN Assignment</span>
        </nav>
      </div>

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="userId" className="form-label">User ID <span className="text-danger">*</span></label>
                <div className="input-group">
                  <input
                    id="userId"
                    type="text"
                    className="form-control"
                    value={userId}
                    onChange={(event) => setUserId(event.target.value.replace(/\D/g, ''))}
                    placeholder="Enter User ID"
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={handleSearchUser}
                    disabled={loadingUsername || loadingUserPincodes}
                  >
                    {loadingUsername || loadingUserPincodes ? 'Searching...' : 'Search'}
                  </button>
                </div>
              </div>

              <div className="col-md-6">
                <label htmlFor="userName" className="form-label">User Name</label>
                <input
                  id="userName"
                  type="text"
                  className="form-control"
                  value={userName}
                  placeholder="Click Search to auto-fill"
                  disabled
                  readOnly
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="pinSearch" className="form-label">PinCode</label>
              <input
                id="pinSearch"
                type="text"
                className={`form-control mb-2 ${search.length > 0 && search.length !== 6 ? 'is-invalid' : ''}`}
                value={search}
                onChange={(event) => setSearch(event.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="Search 6-digit pincode"
                inputMode="numeric"
                pattern="[0-9]{6}"
                maxLength={6}
              />
              {search.length > 0 && search.length !== 6 && (
                <div className="invalid-feedback d-block">Please enter exactly 6 digits.</div>
              )}

              <div className="row g-3">
                <div className="col-md-6">
                  <div className="border rounded p-2" style={{ minHeight: '240px', maxHeight: '240px', overflowY: 'auto' }}>
                    <div className="small text-muted mb-2">Available ({Math.max(allPincodes.length - selectedPins.length, 0)})</div>
                    {loadingPincodes ? (
                      <div className="text-muted">Loading pincodes...</div>
                    ) : (
                      filteredPins.map((pin) => {
                        const disabled = selectedPins.includes(pin)
                        return (
                          <button
                            key={pin}
                            type="button"
                            className="btn btn-sm btn-link text-decoration-none d-block text-start p-1"
                            disabled={disabled}
                            onClick={() => handleAddPin(pin)}
                          >
                            {pin}
                          </button>
                        )
                      })
                    )}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="border rounded p-2" style={{ minHeight: '240px', maxHeight: '240px', overflowY: 'auto' }}>
                    <div className="small text-muted mb-2">Selected ({selectedPins.length})</div>
                    {selectedPins.map((pin) => (
                      <button
                        key={pin}
                        type="button"
                        className="btn btn-sm btn-link text-decoration-none d-block text-start p-1 text-danger"
                        onClick={() => handleRemovePin(pin)}
                      >
                        {pin} (remove)
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center gap-3 mt-4">
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FrmUserPinAllocation
