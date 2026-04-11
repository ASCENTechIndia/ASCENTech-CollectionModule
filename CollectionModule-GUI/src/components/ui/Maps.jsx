import { clsx } from 'clsx'
import { useEffect, useRef, useState } from 'react'

/**
 * MapComponent - Google Maps integration
 * @param {Object} props
 * @param {number} props.latitude - Center latitude
 * @param {number} props.longitude - Center longitude
 * @param {number} props.zoom - Zoom level
 * @param {Function} props.onLocationSelect - Callback for location selection
 * @param {string} props.markerLabel - Marker label text
 * @param {string} props.height - Height CSS value
 * @param {string} props.apiKey - Google Maps API key
 */
export function MapComponent({
  latitude,
  longitude,
  zoom = 12,
  onLocationSelect,
  markerLabel = 'Location',
  height = '400px',
  apiKey,
}) {
  const mapRef = useRef(null)

  useEffect(() => {
    // Initialize Google Map
    if (window.google && mapRef.current && latitude && longitude && apiKey) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
        zoom: zoom,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
      })

      const marker = new window.google.maps.Marker({
        position: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
        map,
        title: markerLabel,
        draggable: true,
      })

      // Handle marker drag
      marker.addListener('dragend', () => {
        const pos = marker.getPosition()
        onLocationSelect?.({
          latitude: pos.lat(),
          longitude: pos.lng(),
        })
      })

      // Handle map clicks for location selection
      if (onLocationSelect) {
        map.addListener('click', (e) => {
          const lat = e.latLng.lat()
          const lng = e.latLng.lng()
          onLocationSelect({ latitude: lat, longitude: lng })

          marker.setPosition({ lat, lng })
        })
      }
    }
  }, [latitude, longitude, zoom, markerLabel, apiKey, onLocationSelect])

  if (!apiKey) {
    return (
      <div
        style={{ height }}
        className="bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 text-sm sm:text-base"
      >
        <p>Google Maps API key not configured</p>
      </div>
    )
  }

  return (
    <>
      <script
        src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}`}
        async
        defer
      ></script>
      <div
        ref={mapRef}
        style={{ height, width: '100%' }}
        className="rounded-lg border border-gray-200 shadow-soft"
      />
    </>
  )
}

/**
 * LocationPicker Component - Interactive location selection with map
 */
export function LocationPicker({
  label,
  latitude,
  longitude,
  onChange,
  error,
  disabled = false,
  apiKey,
  className,
  id,
}) {
  const [showMap, setShowMap] = useState(false)

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          <div>
            <label htmlFor={`${id}-lat`} className="form-label">
              Latitude
            </label>
            <input
              id={`${id}-lat`}
              type="number"
              value={latitude}
              onChange={(e) =>
                onChange({
                  latitude: parseFloat(e.target.value),
                  longitude: longitude,
                })
              }
              disabled={disabled}
              className={clsx(
                'input-field text-xs sm:text-base',
                disabled && 'bg-gray-100 cursor-not-allowed'
              )}
              step="0.0001"
              placeholder="-90 to 90"
            />
          </div>
          <div>
            <label htmlFor={`${id}-lng`} className="form-label">
              Longitude
            </label>
            <input
              id={`${id}-lng`}
              type="number"
              value={longitude}
              onChange={(e) =>
                onChange({
                  latitude: latitude,
                  longitude: parseFloat(e.target.value),
                })
              }
              disabled={disabled}
              className={clsx(
                'input-field text-xs sm:text-base',
                disabled && 'bg-gray-100 cursor-not-allowed'
              )}
              step="0.0001"
              placeholder="-180 to 180"
            />
          </div>
        </div>

        {apiKey && (
          <button
            type="button"
            onClick={() => setShowMap(!showMap)}
            disabled={disabled}
            className={clsx(
              'w-full p-2 sm:p-3 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200',
              'bg-primary-600 text-white hover:bg-primary-700',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {showMap ? 'Hide Map' : 'Show Map'}
          </button>
        )}

        {showMap && (
          <div className="animate-slideUp">
            <MapComponent
              latitude={latitude}
              longitude={longitude}
              onLocationSelect={onChange}
              apiKey={apiKey}
              height="300px sm:height-400px"
            />
          </div>
        )}
      </div>
      {error && (
        <span className="text-danger-600 text-xs mt-1.5 block">
          {error}
        </span>
      )}
    </div>
  )
}
