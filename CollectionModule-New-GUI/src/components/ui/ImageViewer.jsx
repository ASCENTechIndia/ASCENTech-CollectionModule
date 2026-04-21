import { useEffect, useState } from 'react'
import apiClient from '../../services/apiClient'
import { useNotification } from '../../context/useNotification'

function ImageViewer({ imageCode, onClose }) {
  const { showError } = useNotification()
  const [imageSrc, setImageSrc] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchImage = async () => {
      if (!imageCode) return
      setLoading(true)
      try {
        const res = await apiClient.get('/transactionReports/getImage', {
          params: { imageCode },
        })

        if (res?.data?.success && res?.data?.data) {
          setImageSrc(`data:image/png;base64,${res.data.data}`)
        } else {
          setImageSrc('')
          showError('Image not available')
        }
      } catch (error) {
        setImageSrc('')
        showError('Failed to load image')
      } finally {
        setLoading(false)
      }
    }

    fetchImage()
  }, [imageCode])

  if (!imageCode) return null

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Image Preview</h5>
            <button type="button" className="btn-close" onClick={() => window.location.assign('/')} aria-label="Close" />
          </div>
          <div className="modal-body text-center">
            {loading ? (
              <div className="py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : imageSrc ? (
              <img src={imageSrc} alt="Preview" className="img-fluid" />
            ) : (
              <p className="text-muted mb-0">Image not available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageViewer
