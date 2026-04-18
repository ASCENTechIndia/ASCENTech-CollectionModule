import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { ReusableGroupedDataGrid } from '../../components/ReusableGroupedDataGrid'
import apiClient from '../../services/apiClient'
import { useNotification } from '../../context/useNotification'

function FrmVisitDoneSummaryReport() {
  const { showError, showSuccess } = useNotification()
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const hasFetchedRef = useRef(false)

  const headers = [
    {
      displayName: 'In Count',
      children: [
        { displayName: 'Zone', field: 'zone' },
        { displayName: 'Visit Done', field: 'visitDone' },
        { displayName: 'Visit Done(%)', field: 'visitDonePercent' },
        { displayName: 'Paid', field: 'paid' },
        { displayName: 'Paid (%)', field: 'paidPercent' },
        { displayName: 'Fully Paid', field: 'fullyPaid' },
        { displayName: 'Fully Paid (%)', field: 'fullyPaidPercent' },
        { displayName: 'Partial Paid', field: 'partialPaid' },
        { displayName: 'Partial Paid (%)', field: 'partialPaidPercent' },
        { displayName: 'Unpaid', field: 'unpaid' },
        { displayName: 'Unpaid (%)', field: 'unpaidPercent' },
        { displayName: 'NPA', field: 'npa' },
        { displayName: 'NPA (%)', field: 'npaPercent' },
      ],
    },
    {
      displayName: 'In Value',
      children: [
        { displayName: 'Allocation', field: 'valueAllocation' },
        { displayName: 'Visit Done(%)', field: 'valueVisitDonePercent' },
        { displayName: 'Paid Amount', field: 'paidAmount' },
        { displayName: 'Paid(%)', field: 'valuePaidPercent' },
        { displayName: 'Fully Paid Amount', field: 'valueFullyPaidAmount' },
        { displayName: 'Full Paid(%)', field: 'valueFullyPaidPercent' },
        { displayName: 'Partial Paid Amount', field: 'valuePartialPaidAmount' },
        { displayName: 'Partial Paid (%)', field: 'valuePartialPaidPercent' },
        { displayName: 'Unpaid Amount', field: 'valueUnpaidAmount' },
        { displayName: 'Unpaid(%)', field: 'valueUnpaidPercent' },
        { displayName: 'NPA Amount', field: 'valueNpaAmount' },
        { displayName: 'NPA(%)', field: 'valueNpaPercent' },
      ],
    },
  ]

  useEffect(() => {
    if (hasFetchedRef.current) return
    hasFetchedRef.current = true

    const fetchData = async () => {
      setLoading(true)
      setError('')
      try {
        const response = await apiClient.get('/reports/visitDoneSummary')
        const success = response?.success
        const data = Array.isArray(response?.data) ? response.data : []

        if (!success || !data.length) {
          setRows([])
          showError('No record found')
          setError('No record found')
          return
        }

        const transformed = data.map((item) => ({
          zone: item.VAR_COMPANYMST_BRANCHNAME || '',
          visitDone: item.TOTAL_VISITS ?? 0,
          visitDonePercent: item.TOTAL_VISITS_PERS ?? 0,
          paid: item.PAID_COUNT ?? 0,
          paidPercent: item.PAID_COUNT_PERS ?? 0,
          fullyPaid: item.FULLY_PAID_COUNT ?? 0,
          fullyPaidPercent: item.FULLY_PAID_PERS ?? 0,
          partialPaid: item.PARTIAL_PAID_COUNT ?? 0,
          partialPaidPercent: item.PARTIAL_PAID_PERS ?? 0,
          unpaid: item.NOT_PAID_COUNT ?? 0,
          unpaidPercent: item.NOT_PAID_PERS ?? 0,
          npa: item.NPA_COUNT ?? 0,
          npaPercent: item.NPA_PERS ?? 0,
          valueAllocation: item.COLLECTABLE_AMT ?? 0,
          valueVisitDonePercent: item.COLLECTABLE_PERCENT ?? 0,
          paidAmount: item.PAIDAMT ?? 0,
          valuePaidPercent: item.PAID_PERCENT ?? 0,
          valueFullyPaidAmount: item.FULLYPAIDAMT ?? 0,
          valueFullyPaidPercent: item.FULLYPAID_PERCENT ?? 0,
          valuePartialPaidAmount: item.PARTIALPAIDAMT ?? 0,
          valuePartialPaidPercent: item.PARTIALPAID_PERCENT ?? 0,
          valueUnpaidAmount: item.UNPAID_AMT ?? 0,
          valueUnpaidPercent: item.UNPAID_PERCENT ?? 0,
          valueNpaAmount: item.NPA_AMT ?? 0,
          valueNpaPercent: item.NPA_PERCENT ?? 0,
        }))

        setRows(transformed)
        showSuccess(`Loaded ${transformed.length} records`)
      } catch (apiError) {
        setRows([])
        showError(apiError.message || 'Failed to load report')
        setError(apiError.message || 'Failed to load report')
      } finally {
        setLoading(false)
      }
    }

    void fetchData()
  }, [])

  return (
    <div className="main-content page-visit-done-summary-report">
      <div className="page-header">
        <h1 className="page-title">Visit Done Summary Report</h1>
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-item">
            Home
          </Link>
          <span className="breadcrumb-item">Reports</span>
          <span className="breadcrumb-item active">Visit Done Summary</span>
        </nav>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle me-2" />
          {error}
        </div>
      )}

      <div className="card">
        <div className="card-body">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2 text-muted">Loading report...</p>
            </div>
          ) : rows.length > 0 ? (
            <ReusableGroupedDataGrid
              title="Visit Done Summary"
              headers={headers}
              rows={rows}
              pageSize={10}
            />
          ) : (
            <div className="text-center text-muted py-4">No records found</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FrmVisitDoneSummaryReport