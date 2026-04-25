import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ReusableDataGrid from '../../components/ReusableDataGrid'
import apiClient from '../../services/apiClient'
import { useAuth } from '../../context/AuthContext'
import { useNotification } from "../../context/useNotification";
import { useConfirm } from '../../context/ConfirmModalContext';
import DataTable from '../../components/Datatable'
import { UserCheck } from "lucide-react";


const formatDateForApi = (value) => {
  if (!value) return ''
  const date = new Date(value)
  if (isNaN(date.getTime())) return ''
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const day = String(date.getDate()).padStart(2, '0')
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}

const formatDateToDDMMYYYY = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return ''
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}

function FrmInactiveUserAcs() {
  const { user } = useAuth();
  const confirm = useConfirm();
  const { showWarning, showError, showSuccess } = useNotification()
  const navigate = useNavigate()
  const today = new Date().toISOString().split('T')[0]

  // Form state
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [userId, setUserId] = useState('')
  const [userDropdownId, setUserDropdownId] = useState('Inactive')
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [error, setError] = useState('')

  // Table columns
  // const columns = [
  //   { label: 'Unallocated Date', sortable: true },
  //   { label: 'Collection Associate ID', sortable: true },
  //   { label: 'Account Number', sortable: true },
  // ]
  const columns2 = [
    { label: 'Unallocated Date', sortable: true, key: "date" },
    {
      label: 'Collection Associate ID', sortable: true, key: "collectionid", render: (val) =>
        val ? (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: "#e8f0fe",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <i
                className="bi bi-person-fill"
                style={{ color: "#1a73e8", fontSize: "0.85rem" }}
              />
            </span>
            <span
              style={{ fontSize: "0.82rem", fontWeight: 500, color: "#1e293b" }}
            >
              {val}
            </span>
          </div>
        ) : (
          <span className="text-muted">—</span>
        ),
    },
    {
      label: 'Account Number', sortable: true, key: "accountnumber", render: (val) =>
        val ? (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              background: "#f8f9fa",
              color: "#495057",
              padding: "3px 10px",
              borderRadius: "6px",
              fontSize: "0.78rem",
              fontFamily: "monospace",
              border: "1px solid #dee2e6",
              letterSpacing: "0.03em",
            }}
          >
            <i className="bi bi-file-earmark-text" style={{ color: "#6c757d" }} />
            {val}
          </span>
        ) : (
          <span className="text-muted">—</span>
        ),
    },
  ]
  // Convert rows to array of arrays for ReusableDataGrid
  const tableRows = rows.map((item) => ({
    date: item.date || '',
    collectionid: item.collectionID || '',
    accountnumber: item.accountNumber || '',
  }))

  const handleSearch = async (event) => {
    event.preventDefault()
    setError('')
    setSearched(true)

    if (!startDate || !endDate) {
      showError('Start Date and End Date are required')
      setError('Start Date and End Date are required')
      return
    }

    const startDateFormatted = formatDateForApi(startDate)
    const endDateFormatted = formatDateForApi(endDate)
    const trimmedUserId = userId.trim()
    const userType = userDropdownId

    let url = `/inactive-user-accounts/search?startDate=${startDateFormatted}&endDate=${endDateFormatted}&userType=${userType}`
    if (trimmedUserId) url += `&userId=${trimmedUserId}`

    setLoading(true)
    try {
      const response = await apiClient.get(url)

      if (response.success && Array.isArray(response.data) && response.data.length > 0) {
        const formattedData = response.data.map((item) => ({
          date: formatDateToDDMMYYYY(item.UNALLOCATE_DATE),
          collectionID: item.VAR_BANKDATA_USERID,
          accountNumber: item.VAR_BANKDATA_CONTRACTNUM,
        }))
        setRows(formattedData)
        showSuccess(`Found ${formattedData.length} records`)
      } else if (response.success && response.data.length === 0) {
        setRows([])
        showWarning('No records found')
        setError('No records found')
      } else {
        setRows([])
        showError('Unexpected response format')
        setError('Unexpected response format')
      }
    } catch (err) {
      console.error(err)
      setRows([])
      showError(err?.message || 'Failed to fetch inactive user accounts')
      setError(err?.message || 'Failed to fetch inactive user accounts')
    } finally {
      setLoading(false)
    }
  }

  const handleUnallocateAll = async () => {
    // TODO: implement API call
    // showWarning('Unallocate All Accounts feature not yet implemented')
    const agreed = await confirm("Do you want unallocate all accounts?");
    if (!agreed) {
      return;
    }
    try {
      const response = await apiClient.post("/inactive-user-accounts/unallocate-all", {});

      if (response.success) {
        showSuccess("Successfully Unallocated Accounts");
      }
    } catch (error) {
      showError(err?.message || 'Failed to unallocate inactive user accounts');
      setError(err?.message || 'Failed to unallocate inactive user accounts')
    }
  }

  return (
    <div className="main-content">
      <div className="page-users">
      {/* <div className="page-header">
        <h1 className="page-title">Inactive User Accounts</h1>
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-item">Home</Link>
          <span className="breadcrumb-item">User Management</span>
          <span className="breadcrumb-item active">Inactive User Accounts</span>
        </nav>
      </div> */}

       <div className="page-header users-page-header">
          <div>
            <h1 className="page-title">Inactive User Accounts</h1>
          </div>
          <div className="page-header-actions">
            <button
              className="btn btn-primary btn-sm"
            onClick={handleUnallocateAll}>
              <UserCheck className="inline mr-2" size={16} /> Unallocate All Accounts
            </button>
          </div>
        </div>

      <div className="card mb-4">
        <div className="card-body">

          <p className="fw-semibold mb-3">Users Unallocated Accounts</p>

          <form onSubmit={handleSearch}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="startDate" className="form-label">
                  Select Start Date <span className="text-danger">*</span>
                </label>
                <input
                  id="startDate"
                  type="date"
                  className={`form-control ${!startDate && searched ? 'is-invalid' : ''}`}
                  value={startDate}
                  max={today}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="endDate" className="form-label">
                  Select End Date <span className="text-danger">*</span>
                </label>
                <input
                  id="endDate"
                  type="date"
                  className={`form-control ${!endDate && searched ? 'is-invalid' : ''}`}
                  value={endDate}
                  max={today}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="userId" className="form-label">User Id</label>
                <input
                  id="userId"
                  type="text"
                  className="form-control"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Enter User ID (optional)"
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ""); // remove non-digits
                    setUserId(value);
                  }}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="userType" className="form-label">Select User</label>
                <select
                  id="userType"
                  className="form-select"
                  value={userDropdownId}
                  onChange={(e) => setUserDropdownId(e.target.value)}
                >
                  <option value="">-- Select Option --</option>
                  <option value="All">All</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="d-flex justify-content-center gap-3 mt-4">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
                Close
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* {tableRows.length > 0 && (
        <div className="card">
          <div className="card-body">
            <ReusableDataGrid rows={tableRows} columns={columns} pageSize={10} />
          </div>
        </div>
      )} */}

      {tableRows.length > 0 && (
        <div className="card">
          <div className="card-body">
            {/* <ReusableDataGrid rows={tableRows} columns={columns} pageSize={10} /> */}
            <DataTable
              title='Unallocated Accounts Table'
              data={tableRows}
              columns={columns2}
              defaultPerPage={10}
              csvFilename='inactive_accounts.csv'
            />
          </div>
        </div>
      )}
      </div>
    </div>
  )
}

export default FrmInactiveUserAcs