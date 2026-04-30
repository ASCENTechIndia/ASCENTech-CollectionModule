import { Link, useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import apiClient from '../../services/apiClient'
import { useNotification } from '../../context/useNotification'
import { useLoader } from '../../context/LoaderContext'

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
  const [mapLoading, setMapLoading] = useState(false)
  const { setLoader } = useLoader();
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

    // setLoading(true)
    setLoader(true);
    setCoordinates(null)
    setMapLoading(false)

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
        setMapLoading(true)
        showSuccess('Location found')
      } else if (success && apiRows.length > 0) {
        showError('Invalid location data received')
      } else {
        showWarning('No location found for given user and date')
      }
    } catch (error) {
      showError(error?.message || 'Failed to fetch location')
    } finally {
      // setLoading(false)
      setLoader(false);
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
    // setLoader(true);
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
      // setLoader(false);
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
        <div className="card-body">

          {/* 📅 Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Search User <span className="text-danger">*</span></label>
                <div className="position-relative">
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
                  {searchLoading && (
                    <div className="spinner-border spinner-border-sm position-absolute end-0 top-50 translate-middle-y me-2" />
                  )}
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
              <div className="col-md-4">
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
              <div className="col-md-4">
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
            <h5>
              {(() => {
                // Find the selected date from the form
                const dateInput = document.querySelector('input[name="trackingDate"]');
                let dateStr = dateInput ? dateInput.value : '';
                // Fallback: try to get from react-hook-form if possible
                if (!dateStr && typeof window !== 'undefined' && window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
                  // no-op fallback
                }
                if (dateStr) {
                  const dateObj = new Date(dateStr);
                  if (!isNaN(dateObj)) {
                    const day = String(dateObj.getDate()).padStart(2, '0');
                    const month = dateObj.toLocaleString('default', { month: 'short' });
                    const year = dateObj.getFullYear();
                    return `User last location on ${day} ${month} ${year}`;
                  }
                }
                return 'User last location';
              })()}
            </h5>
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

            <div className="ratio ratio-16x9 position-relative">
              {mapLoading && (
                <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-white bg-opacity-75" style={{zIndex:2}}>
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading map...</span>
                  </div>
                </div>
              )}
              <iframe
                src={mapUrl}
                title="map"
                loading="lazy"
                onLoad={() => setMapLoading(false)}
                style={mapLoading ? {visibility:'hidden'} : {visibility:'visible'}}
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FrmUserLocationTracking