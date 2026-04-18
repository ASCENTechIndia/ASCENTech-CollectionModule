import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ReusableGroupedDataGrid } from '../../components/ReusableGroupedDataGrid'
import apiClient from '../../services/apiClient'
import { useNotification } from '../../context/useNotification'

function FrmNonVisitDoneSummaryReport() {
  const { showError, showSuccess } = useNotification()
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const headers = [
    {
      displayName: 'In Count',
      children: [
        { displayName: 'Zone', field: 'zone' },
        { displayName: 'Not-Visits', field: 'nonVisits' },
        { displayName: 'Not-Visits %', field: 'nonVisitsPercent' },
        { displayName: 'Paid Count', field: 'paidCount' },
        { displayName: 'Paid %', field: 'paidPercent' },
        { displayName: 'Fully Paid', field: 'fullyPaidCount' },
        { displayName: 'Fully Paid %', field: 'fullyPaidPercent' },
        { displayName: 'Partial Paid Count', field: 'partialPaidCount' },
        { displayName: 'Partial Paid %', field: 'partialPaidPercent' },
        { displayName: 'Unpaid Count', field: 'unpaidCount' },
        { displayName: 'Unpaid %', field: 'unpaidPercent' },
        { displayName: 'NPA Count', field: 'npaCount' },
        { displayName: 'NPA %', field: 'npaPercent' },
      ],
    },
    {
      displayName: 'In Value',
      children: [
        { displayName: 'Allocation', field: 'valueAllocation' },
        { displayName: 'Not-Visit Done %', field: 'valueNonVisitPercent' },
        { displayName: 'Paid Amount', field: 'paidAmount' },
        { displayName: 'Paid %', field: 'valuePaidPercent' },
        { displayName: 'Fully Paid Amount', field: 'fullyPaidAmount' },
        { displayName: 'Fully Paid %', field: 'valueFullyPaidPercent' },
        { displayName: 'Partial Paid Amount', field: 'partialPaidAmount' },
        { displayName: 'Partial Paid %', field: 'valuePartialPaidPercent' },
        { displayName: 'Unpaid Amount', field: 'unpaidAmount' },
        { displayName: 'Unpaid %', field: 'valueUnpaidPercent' },
        { displayName: 'NPA Amount', field: 'npaAmount' },
        { displayName: 'NPA %', field: 'valueNpaPercent' },
      ],
    },
  ]

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError('')
      try {
        const response = await apiClient.get('/reports/nonVisitDoneSummary')
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
          nonVisits: item.TOTAL_NONVISITS ?? 0,
          nonVisitsPercent: item.TOTAL_NONVISITS_PERS ?? 0,
          paidCount: item.PAID_CNT ?? 0,
          paidPercent: item.PAID_PERS ?? 0,
          fullyPaidCount: item.FULLY_PAID_CNT ?? 0,
          fullyPaidPercent: item.FULLY_PAID_PERS ?? 0,
          partialPaidCount: item.PARTIAL_PAID_CNT ?? 0,
          partialPaidPercent: item.PARTIAL_PAID_PERS ?? 0,
          unpaidCount: item.UNPAID_CNT ?? 0,
          unpaidPercent: item.UNPAID_PERS ?? 0,
          npaCount: item.NPA_CNT ?? 0,
          npaPercent: item.NPA_PERS ?? 0,
          valueAllocation: item.COLLECTABLE_AMT ?? 0,
          valueNonVisitPercent: item.COLLECTABLE_PERCENT ?? 0,
          paidAmount: item.PAIDAMT ?? 0,
          valuePaidPercent: item.PAID_PERCENT ?? 0,
          fullyPaidAmount: item.FULLYPAIDAMT ?? 0,
          valueFullyPaidPercent: item.FULLYPAID_PERCENT ?? 0,
          partialPaidAmount: item.PARTIALPAIDAMT ?? 0,
          valuePartialPaidPercent: item.PARTIALPAID_PERCENT ?? 0,
          unpaidAmount: item.UNPAID_AMT ?? 0,
          valueUnpaidPercent: item.UNPAID_PERCENT ?? 0,
          npaAmount: item.NPA_AMT ?? 0,
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
  }, [showError, showSuccess])

  return (
    <div className="main-content page-non-visit-done-summary-report">
      <div className="page-header">
        <h1 className="page-title">Non-Visit Done Summary Report</h1>
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-item">
            Home
          </Link>
          <span className="breadcrumb-item">Reports</span>
          <span className="breadcrumb-item active">Non-Visit Done Summary</span>
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
              title="Non-Visit Done Summary"
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

export default FrmNonVisitDoneSummaryReport