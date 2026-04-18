import { Link, useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'
import apiClient from '../../services/apiClient'
import { useNotification } from '../../context/useNotification'

const parseCoordinates = (location) => {
  const raw = String(location || '').trim()
  if (!raw.includes(',')) return null

  const [latText, lngText] = raw.split(',')
  const lat = Number(latText)
  const lng = Number(lngText)

  if (Number.isNaN(lat) || Number.isNaN(lng)) return null

  return { lat, lng }
}

function FrmUserLocationTracking() {
  const navigate = useNavigate()
  const { showWarning, showError, showSuccess } = useNotification()

  const [trackingDate, setTrackingDate] = useState('')
  const [userId, setUserId] = useState('')
  const [coordinates, setCoordinates] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)

  const mapUrl = useMemo(() => {
    if (!coordinates) return ''

    return `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}&z=15&output=embed`
  }, [coordinates])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSearched(true)
    setError('')

    const trimmedUserId = userId.trim()

    if (!trackingDate || !trimmedUserId) {
      const message = 'Tracking Date and User ID are required'
      showError(message)
      setError(message)
      return
    }

    if (!/^[A-Za-z0-9]+$/.test(trimmedUserId)) {
      const message = 'User ID must contain only letters and numbers'
      showError(message)
      setError(message)
      return
    }

    setLoading(true)
    setCoordinates(null)

    try {
      const response = await apiClient.get('/admin/getLocationTracking', {
        params: {
          userId: trimmedUserId,
          cDate: trackingDate,
        },
      })

      const success = response?.success
      const apiRows = Array.isArray(response?.data) ? response.data : []
      const locationValue = apiRows[0]?.LOCATION || apiRows[0]?.location || ''
      const parsed = parseCoordinates(locationValue)

      if (success && parsed) {
        setCoordinates(parsed)
        showSuccess('Location found')
      } else if (success && apiRows.length > 0) {
        const message = 'The received location data is invalid.'
        showError(message)
        setError(message)
      } else {
        const message = 'No location found for the given user and date.'
        showWarning(message)
        setError(message)
      }
    } catch (apiError) {
      const message = apiError?.message || 'Failed to fetch location.'
      showError(message)
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="main-content page-user-location-tracking">
      <div className="page-header">
        <h1 className="page-title">User Location Tracking</h1>
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-item">
            Home
          </Link>
          <span className="breadcrumb-item">Admin</span>
          <span className="breadcrumb-item active">User Location Tracking</span>
        </nav>
      </div>

      <div className="card mb-4">
        <div className="card-header">
          <h5 className="card-title mb-0">Search Filters</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="trackingDate" className="form-label">
                  Tracking Date <span className="text-danger">*</span>
                </label>
                <input
                  id="trackingDate"
                  type="date"
                  className={`form-control ${!trackingDate && searched ? 'is-invalid' : ''}`}
                  value={trackingDate}
                  onChange={(event) => setTrackingDate(event.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="userId" className="form-label">
                  User ID <span className="text-danger">*</span>
                </label>
                <input
                  id="userId"
                  type="text"
                  className={`form-control ${(!userId.trim() || (!/^[A-Za-z0-9]+$/.test(userId.trim()) && searched)) ? 'is-invalid' : ''}`}
                  value={userId}
                  onChange={(event) => setUserId(event.target.value)}
                  placeholder="Enter User ID"
                />
              </div>
            </div>

            <div className="d-flex justify-content-center gap-3 mt-4">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
                Close
              </button>
            </div>
          </form>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle me-2" />
          {error}
        </div>
      )}

      {coordinates && (
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-2">
            <h5 className="card-title mb-0">User Location</h5>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-outline-primary"
            >
              Open in Google Maps
            </a>
          </div>
          <div className="card-body">
            <div className="mb-3 text-muted small">
              Latitude: {coordinates.lat} | Longitude: {coordinates.lng}
            </div>
            <div className="ratio ratio-16x9">
              <iframe
                title="User Location Map"
                src={mapUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FrmUserLocationTracking
