import { Link, useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import apiClient from '../../services/apiClient'
import { useNotification } from '../../context/useNotification'

// Debounce utility
function debounce(fn, delay) {
  let timer = null
  return (...args) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

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

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      trackingDate: '',
      userId: '',
    },
  })

  const [coordinates, setCoordinates] = useState(null)
  const [loading, setLoading] = useState(false)

  // Search state
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchError, setSearchError] = useState('')

  const mapUrl = useMemo(() => {
    if (!coordinates) return ''
    return `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}&z=15&output=embed`
  }, [coordinates])

  const onSubmit = async (values) => {
    const trimmedUserId = String(values.userId || '').trim()
    const trackingDate = values.trackingDate

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
        showError('Invalid location data received')
      } else {
        showWarning('No location found for given user and date')
      }
    } catch (error) {
      showError(error?.message || 'Failed to fetch location')
    } finally {
      setLoading(false)
    }
  }

  // Debounced search
  const doSearch = debounce(async (term) => {
    if (!term) {
      setSearchResults([])
      setSearchError('')
      setSearchLoading(false)
      return
    }

    setSearchLoading(true)
    setSearchError('')

    try {
      const response = await apiClient.get('/users/search-user-by-name-id', {
        params: { search: term },
      })

      if (response?.success && Array.isArray(response.data)) {
        setSearchResults(response.data)
      } else {
        setSearchResults([])
        setSearchError('No results found')
      }
    } catch {
      setSearchResults([])
      setSearchError('Search failed')
    } finally {
      setSearchLoading(false)
    }
  }, 400)

  const handleSearchInput = (e) => {
    const val = e.target.value
    setSearchTerm(val)
    doSearch(val)
  }

  const handleSelectUser = (user) => {
    setSearchTerm(user.VAR_USERMST_USERFULLNAME)
    setSearchResults([])

    // remove "E" before setting
    const cleanId = user.VAR_USERMST_USERID.replace(/^E/i, '')
    setValue('userId', cleanId)
  }

  const handleClearSearch = () => {
  setSearchTerm('')
  setSearchResults([])
  setSearchError('')
  
  // clear userId field
  setValue('userId', '')
}
  return (
    <div className="main-content page-user-location-tracking">
      <div className="page-header">
        <h1 className="page-title">User Location Tracking</h1>
      </div>

      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center gap-3 flex-wrap">

  {/* Left Title */}
  <h5 className="card-title mb-0">Search Filters</h5>

  {/* Right Search */}
  <div className="position-relative" style={{ minWidth: "280px", maxWidth: "350px", width: "100%" }}>
    
   <div className="input-group position-relative">
  <span className="input-group-text bg-white border-end-0">
    <i className="bi bi-search text-muted"></i>
  </span>

  <input
    type="text"
    className="form-control border-start-0 pe-5"
    placeholder="Type name or user ID..."
    value={searchTerm}
    onChange={handleSearchInput}
    autoComplete="off"
  />

  {/* Clear Button */}
  {searchTerm && (
    <button
      type="button"
      onClick={handleClearSearch}
      className="btn btn-sm position-absolute top-50 end-0 translate-middle-y me-2 p-0"
    >
      <i className="bi bi-x-circle text-muted"></i>
    </button>
  )}
</div>

    {/* Loader */}
    {searchLoading && (
      <div className="spinner-border spinner-border-sm position-absolute end-0 top-50 translate-middle-y me-2" />
    )}

    {/* Dropdown */}
    {searchResults.length > 0 && (
      <ul
        className="list-group position-absolute w-100 shadow z-3"
        style={{ maxHeight: 180, overflowY: "auto", top: "100%" }}
      >
        {searchResults.map((user, idx) => (
          <li
            key={user.VAR_USERMST_USERID || idx}
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center py-2 px-2"
            style={{ cursor: "pointer", fontSize: "13px" }}
            onClick={() => handleSelectUser(user)}
          >
            <div className="d-flex flex-column">
              <span className="fw-medium">{user.VAR_USERMST_USERFULLNAME}</span>
              <small className="text-muted">{user.VAR_USERMST_USERID}</small>
            </div>
            <i className="bi bi-person text-primary"></i>
          </li>
        ))}
      </ul>
    )}

    {searchError && (
      <div className="text-danger small mt-1">{searchError}</div>
    )}
  </div>

</div>

        <div className="card-body">

          {/* 📅 Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row g-3">

              <div className="col-md-6">
                <label className="form-label">
                  Tracking Date <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className={`form-control ${errors.trackingDate ? 'is-invalid' : ''}`}
                  {...register('trackingDate', {
                    required: 'Tracking Date is required',
                  })}
                />
                {errors.trackingDate && (
                  <div className="invalid-feedback">
                    {errors.trackingDate.message}
                  </div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  User ID <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.userId ? 'is-invalid' : ''}`}
                  placeholder="Auto-filled after selection"
                  readOnly
                  {...register('userId', {
                    required: 'User ID is required',
                  })}
                />
                {errors.userId && (
                  <div className="invalid-feedback">
                    {errors.userId.message}
                  </div>
                )}
              </div>
            </div>

            <div className="text-center mt-4">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 📍 Map */}
      {coordinates && (
        <div className="card">
          <div className="card-header d-flex justify-content-between">
            <h5>User Location</h5>
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
            <div className="mb-2 small text-muted">
              Lat: {coordinates.lat} | Lng: {coordinates.lng}
            </div>

            <div className="ratio ratio-16x9">
              <iframe src={mapUrl} title="map" loading="lazy"></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FrmUserLocationTracking