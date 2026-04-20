import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { ReusableGroupedDataGrid } from '../../components/ReusableGroupedDataGrid'
import apiClient from '../../services/apiClient'
import { useNotification } from '../../context/useNotification'

function FrmOverallPerformanceSummaryReport() {
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
        { displayName: 'Allocation', field: 'allocation' },
        { displayName: 'Weightage', field: 'weightage' },
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
        { displayName: 'Weightage', field: 'valueWeightage' },
        { displayName: 'Paid', field: 'valuePaid' },
        { displayName: 'Paid(%)', field: 'valuePaidPercent' },
        { displayName: 'Fully Paid', field: 'valueFullyPaid' },
        { displayName: 'Full Paid(%)', field: 'valueFullyPaidPercent' },
        { displayName: 'Partial Paid', field: 'valuePartialPaid' },
        { displayName: 'Partial Paid (%)', field: 'valuePartialPaidPercent' },
        { displayName: 'Unpaid', field: 'valueUnpaid' },
        { displayName: 'Unpaid(%)', field: 'valueUnpaidPercent' },
        { displayName: 'NPA', field: 'valueNpa' },
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
        const response = await apiClient.get('/reports/overallPerformanceSummary')
        const success = response?.success
        const data = Array.isArray(response?.data) ? response.data : []

        if (!success || !data.length) {
          setRows([])
          showError('No record found')
          setError('No record found')
          return
        }

        const transformed = data.map((item) => ({
          zone: item.ZONE_NAME || '',
          allocation: item.ALLOCATED_CASES_COUNT ?? 0,
          weightage: item.PERCENTAGE ?? 0,
          paid: item.PAID_COUNT ?? 0,
          paidPercent: item.PAID_PERCENT ?? 0,
          fullyPaid: item.FULLY_PAID_COUNT ?? 0,
          fullyPaidPercent: item.FULLY_PAID_PERCENT ?? 0,
          partialPaid: item.PARTIAL_PAID_COUNT ?? 0,
          partialPaidPercent: item.PARTIAL_PAID_PERCENT ?? 0,
          unpaid: item.UNPAID_COUNT ?? 0,
          unpaidPercent: item.UNPAID_PERCENT ?? 0,
          npa: item.NPA_COUNT ?? 0,
          npaPercent: item.NPA_PERCENT ?? 0,
          valueAllocation: item.FINAL_RECORD_COUNT ?? 0,
          valueWeightage: item.PERCENTAGE_OVERALL ?? 0,
          valuePaid: item.FINAL_COUNT_ENGNNO_12 ?? 0,
          valuePaidPercent: item.PERCENTAGE_ENGNNO_12 ?? 0,
          valueFullyPaid: item.FINAL_COUNT_ENGNNO_1 ?? 0,
          valueFullyPaidPercent: item.PERCENTAGE_ENGNNO_1 ?? 0,
          valuePartialPaid: item.FINAL_COUNT_ENGNNO_2 ?? 0,
          valuePartialPaidPercent: item.PERCENTAGE_ENGNNO_2 ?? 0,
          valueUnpaid: item.FINAL_COUNT_ENGNNO_NULL ?? 0,
          valueUnpaidPercent: item.PERCENTAGE_ENGNNO_NULL ?? 0,
          valueNpa: item.FINAL_COUNT_ENGNNO_3 ?? 0,
          valueNpaPercent: item.PERCENTAGE_ENGNNO_3 ?? 0,
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
    <div className="main-content page-overall-performance-summary-report">
      <div className="page-header">
        <h1 className="page-title">Overall Performance Summary Report</h1>
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-item">
            Home
          </Link>
          <span className="breadcrumb-item">Reports</span>
          <span className="breadcrumb-item active">Overall Performance Summary</span>
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
              title="Performance Summary"
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

export default FrmOverallPerformanceSummaryReport