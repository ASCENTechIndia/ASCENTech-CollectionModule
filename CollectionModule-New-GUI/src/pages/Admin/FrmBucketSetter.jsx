import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import apiClient from '../../services/apiClient'
import { useNotification } from '../../context/useNotification';
import { useConfirm } from '../../context/ConfirmModalContext';
import { useLoader } from '../../context/LoaderContext';

function FrmBucketSetter() {
  const { showSuccess, showError } = useNotification()
  const confirm = useConfirm();
  const { handleSubmit } = useForm()
  const [loading, setLoading] = useState(false)
  const { setLoader } = useLoader();
  const [firstMessage, setFirstMessage] = useState('')
  const [secondMessage, setSecondMessage] = useState('')

  const onSubmit = async () => {
    // setLoading(true)
    setFirstMessage('')
    setSecondMessage('')
    const agreed = await confirm("Do you want to set the buckets?");

    if (!agreed) {
      setLoading(false);
      return;
    }
    
    try {
      setLoader(true);
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
      // setLoading(false)
      setLoader(false);
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
        <div className="card-body py-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 mx-auto" style={{ maxWidth: '760px' }}>
              <div className="border rounded-4 bg-body-tertiary p-4 p-md-5 shadow-sm">
                <div className="d-flex align-items-start gap-3">
                  <div
                    className="d-inline-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                    style={{ width: '44px', height: '44px', background: 'color-mix(in srgb, var(--accent-color), transparent 84%)', color: 'var(--accent-color)' }}
                  >
                    <i className="bi bi-layers fs-5" />
                  </div>
                  <div className="flex-grow-1">
                    <h5 className="mb-2 fw-semibold">Bucket Distribution</h5>
                    <p className="mb-4 text-muted">
                      This page is used to categorize and distribute cases into predefined buckets based on their current status.
                    </p>
                    <div className="fw-semibold mb-3">The available buckets include:</div>
                    <div className="row g-2">
                      <div className="col-12 col-sm-6">
                        <div className="border rounded-3 bg-body px-3 py-2 h-100">
                          <strong>Already Worked</strong>
                        </div>
                      </div>
                      <div className="col-12 col-sm-6">
                        <div className="border rounded-3 bg-body px-3 py-2 h-100">
                          <strong>PTP (Promise to Pay)</strong>
                        </div>
                      </div>
                      <div className="col-12 col-sm-6">
                        <div className="border rounded-3 bg-body px-3 py-2 h-100">
                          <strong>Untouched</strong>
                        </div>
                      </div>
                      <div className="col-12 col-sm-6">
                        <div className="border rounded-3 bg-body px-3 py-2 h-100">
                          <strong>Work for the Day</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <button type="submit" disabled={loading} className="btn btn-primary px-4">
                {loading ? 'Processing...' : 'Set Bucket'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FrmBucketSetter
