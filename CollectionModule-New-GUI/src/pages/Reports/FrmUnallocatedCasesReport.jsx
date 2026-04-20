import { Link } from 'react-router-dom'
import { useEffect, useMemo, useRef, useState } from 'react'
import ReusableDataGrid from '../../components/ReusableDataGrid'
import apiClient from '../../services/apiClient'
import { useAuth } from '../../context/AuthContext'
import { useNotification } from '../../context/useNotification'

function FrmUnallocatedCasesReport() {
  const { user } = useAuth()
  const { showError, showSuccess } = useNotification()

  const brid = user?.brid ? String(user.brid) : ''
  const branchName = user?.branchName ? String(user.branchName) : ''

  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const lastFetchKeyRef = useRef('')

  const columns = [
    { label: 'Account Number', sortable: true },
    { label: 'Pincode', sortable: true },
    { label: 'Reason', sortable: true },
  ]

  const tableRows = useMemo(
    () => rows.map((item) => [item.accountNumber, item.pincode, item.reason]),
    [rows],
  )

  useEffect(() => {
    const fetchKey = `${brid}|${branchName}`
    if (lastFetchKeyRef.current === fetchKey) return
    lastFetchKeyRef.current = fetchKey

    const fetchData = async () => {
      if (!brid || !branchName) {
        const message = 'Branch ID or Branch Name missing'
        showError(message)
        setRows([])
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        const response = await apiClient.get('/reports/unallocatedcases', {
          params: { brid, branchName },
        })

        const success = response?.success
        const data = Array.isArray(response?.data) ? response.data : []

        if (!success || !data.length) {
          setRows([])
          showError('No record found')
          return
        }

        const mapped = data.map((item) => ({
          accountNumber: String(item.VAR_BANKDATA_CONTRACTNUM ?? item.var_bankdata_contractnum ?? ''),
          pincode: String(item.NUM_BANKDATA_PINCODE ?? item.num_bankdata_pincode ?? ''),
          reason: String(item.REASON ?? item.reason ?? ''),
        }))

        setRows(mapped)
        showSuccess(`Found ${mapped.length} records`)
      } catch (apiError) {
        setRows([])
        const message = apiError?.message || 'Failed to fetch unallocated cases'
        showError(message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [brid, branchName, showError, showSuccess])

  return (
    <div className="main-content page-unallocated-cases-report">
      <div className="page-header">
        <h1 className="page-title">Unallocated Cases Report</h1>
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-item">
            Home
          </Link>
          <span className="breadcrumb-item">Reports</span>
          <span className="breadcrumb-item active">Unallocated Cases</span>
        </nav>
      </div>

      <div className="card mb-4">
        <div className="card-header">
          <h5 className="card-title mb-0">Report Summary</h5>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="d-flex align-items-center gap-2 text-muted">
              <div className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
              <span>Loading report...</span>
            </div>
          ) : (
            <p className="mb-0 text-muted">No. of unallocated cases: {rows.length}</p>
          )}
        </div>
      </div>

      {!loading && tableRows.length > 0 && (
        <div className="card">
          <div className="card-body">
            <ReusableDataGrid rows={tableRows} columns={columns} pageSize={10} />
          </div>
        </div>
      )}
    </div>
  )
}

export default FrmUnallocatedCasesReport
