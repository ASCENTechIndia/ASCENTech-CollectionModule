import { Link } from 'react-router-dom'
import { useState } from 'react'
import apiClient from '../../services/apiClient'
import { useNotification } from '../../context/useNotification'

function FrmBucketSetter() {
  const { showSuccess, showError } = useNotification()
  const [loading, setLoading] = useState(false)
  const [firstMessage, setFirstMessage] = useState('')
  const [secondMessage, setSecondMessage] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setFirstMessage('')
    setSecondMessage('')

    try {
      const response = await apiClient.post('/admin/bucketsetter')
      const success = response?.success
      const data = response?.data

      if (success && data) {
        const fullMessage = String(data.message || '')
        const firstPart = fullMessage.includes('.') ? `${fullMessage.split('.')[0]}.` : fullMessage
        const updatedCount = data.p_updated_count ?? 0

        setFirstMessage(firstPart)
        setSecondMessage(`${updatedCount} Rows Updated`)
        showSuccess('Bucket set successfully')
      } else {
        showError('Unexpected response format')
      }
    } catch (apiError) {
      showError(apiError?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="main-content page-bucket-setter">
      <div className="page-header">
        <h1 className="page-title">Bucket Setter</h1>
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-item">Home</Link>
          <span className="breadcrumb-item">Admin</span>
          <span className="breadcrumb-item active">Bucket Setter</span>
        </nav>
      </div>

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? 'Processing...' : 'Set Bucket'}
            </button>

            {(firstMessage || secondMessage) && (
              <div className="mt-4 d-grid gap-3">
                <div className="alert alert-success mb-0" role="alert">
                  <strong>Status: </strong>{firstMessage}
                </div>
                <div className="alert alert-info mb-0" role="alert">
                  <strong>Updated Rows: </strong>{secondMessage}
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default FrmBucketSetter
