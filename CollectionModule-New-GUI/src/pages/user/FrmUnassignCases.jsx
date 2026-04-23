import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import apiClient from '../../services/apiClient'
import { useNotification } from '../../context/useNotification'

function FrmUnassignCases() {
  const { showSuccess, showError } = useNotification()

  const [users, setUsers] = useState([])
  const [selectedCases, setSelectedCases] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await apiClient.get('/admin/unassign-cases/users')
      const success = response?.success
      const rows = Array.isArray(response?.data) ? response.data : []

      console.log("response :", response)
      if (success && rows.length) {
        setUsers(rows)

        const initialSelected = {}
        rows.forEach((user) => {
          const uid = String(user.userId || '')
          initialSelected[uid] = { allSelected: false, pincodes: {} }

          const userPins = Array.isArray(user.pincodes) ? user.pincodes : []
          userPins.forEach((pincode) => {
            initialSelected[uid].pincodes[String(pincode)] = false
          })
        })
        setSelectedCases(initialSelected)
      } else {
        setUsers([])
        setSelectedCases({})
        showError(response?.message || 'Failed to fetch users')
      }
    } catch (apiError) {
      showError(apiError?.message || 'Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return users
    return users.filter((user) => String(user.userId || '').includes(searchTerm.trim()))
  }, [users, searchTerm])

  const handleUserCheckChange = (userId) => {
    setSelectedCases((prev) => {
      const next = structuredClone(prev)
      const currentAllSelected = next[userId]?.allSelected || false
      const newAllSelected = !currentAllSelected

      Object.keys(next[userId]?.pincodes || {}).forEach((pincode) => {
        next[userId].pincodes[pincode] = newAllSelected
      })

      next[userId].allSelected = newAllSelected
      return next
    })
  }

  const handlePincodeCheckChange = (userId, pincode) => {
    setSelectedCases((prev) => {
      const next = structuredClone(prev)
      next[userId].pincodes[pincode] = !next[userId].pincodes[pincode]
      const allSelected = Object.values(next[userId].pincodes).every(Boolean)
      next[userId].allSelected = allSelected
      return next
    })
  }

  const selectedCount = useMemo(
    () => Object.values(selectedCases).reduce((total, userSel) => total + Object.values(userSel.pincodes || {}).filter(Boolean).length, 0),
    [selectedCases],
  )

  const handleSubmit = async () => {
    const selections = []

    Object.entries(selectedCases).forEach(([userId, userSelection]) => {
      const selectedPincodes = Object.entries(userSelection.pincodes || {})
        .filter(([, isSelected]) => isSelected)
        .map(([pincode]) => pincode)

      if (selectedPincodes.length > 0) {
        selections.push({ userId, pincodes: selectedPincodes })
      }
    })

    if (selections.length === 0) {
      showError('Please select at least one case to unassign')
      return
    }

    setSubmitting(true)
    try {
      const response = await apiClient.post('/admin/unassign-cases', { selections })
      if (response?.success) {
        showSuccess(response?.data?.message || 'Cases unassigned successfully')
        await fetchUsers()
      } else {
        showError(response?.message || 'Failed to unassign cases')
      }
    } catch (apiError) {
      showError(apiError?.message || 'Failed to unassign cases')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="main-content page-unassign-cases">
      <div className="page-header">
        <h1 className="page-title">Unassign Cases For Users</h1>
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-item">Home</Link>
          <span className="breadcrumb-item">User</span>
          <span className="breadcrumb-item active">Unassign Cases</span>
        </nav>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="userSearch" className="form-label">Search User(s) / Pincode(s)</label>
            <input
              id="userSearch"
              type="text"
              className="form-control"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          {loading ? (
            <div className="text-muted">Loading users...</div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-muted">No users found</div>
          ) : (
            <div className="border rounded" style={{ maxHeight: '420px', overflowY: 'auto' }}>
              {filteredUsers.map((user) => {
                const uid = String(user.userId || '')
                const pins = Array.isArray(user.pincodes) ? user.pincodes : []
                const selectedForUser = Object.values(selectedCases[uid]?.pincodes || {}).filter(Boolean).length

                return (
                  <div key={uid} className="border-bottom p-3">
                    <div className="form-check mb-2">
                      <input
                        id={`user-${uid}`}
                        type="checkbox"
                        className="form-check-input"
                        checked={selectedCases[uid]?.allSelected || false}
                        onChange={() => handleUserCheckChange(uid)}
                      />
                      <label htmlFor={`user-${uid}`} className="form-check-label fw-semibold">
                        {uid} ({selectedForUser}/{pins.length} selected)
                      </label>
                    </div>

                    <div className="row g-2 ms-3">
                      {pins.map((pin) => {
                        const pinKey = String(pin)
                        return (
                          <div className="col-6 col-md-3" key={`${uid}-${pinKey}`}>
                            <div className="form-check">
                              <input
                                id={`${uid}-${pinKey}`}
                                type="checkbox"
                                className="form-check-input"
                                checked={selectedCases[uid]?.pincodes?.[pinKey] || false}
                                onChange={() => handlePincodeCheckChange(uid, pinKey)}
                              />
                              <label htmlFor={`${uid}-${pinKey}`} className="form-check-label">{pinKey}</label>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {selectedCount > 0 && (
            <div className="alert alert-info mt-3 mb-0">
              {selectedCount} case(s) selected for unassignment
            </div>
          )}

          <div className="mt-3">
            <button
              type="button"
              className="btn btn-primary"
              disabled={submitting || selectedCount === 0}
              onClick={handleSubmit}
            >
              {submitting ? 'Processing...' : 'Unassign Selected Users Cases'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FrmUnassignCases
