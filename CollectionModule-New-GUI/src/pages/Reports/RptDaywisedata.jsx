import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import ReusableDataGrid from '../../components/ReusableDataGrid'
import apiClient from '../../services/apiClient'
import { useNotification } from '../../context/useNotification'
import DataTable from '../../components/Datatable'

const MilestoneDate = ({ date }) => {
  if (!date) return <span>-</span>;

  let parsedDate;

  // Handle DD/MM/YYYY
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
    const [day, month, year] = date.split("/");
    parsedDate = new Date(`${year}-${month}-${day}`); // convert to ISO
  } else {
    parsedDate = new Date(date); // fallback
  }

  if (isNaN(parsedDate)) return <span>-</span>;

  const d = parsedDate.getDate();
  const m = parsedDate.toLocaleString("default", { month: "short" });
  const y = parsedDate.getFullYear();

  return (
    <div className="milestone-date-horizontal">
      <span className="milestone-day-big">{d}</span>
      <div className="milestone-right">
        <span className="milestone-month">{m}</span>
        <span className="milestone-year">{y}</span>
      </div>
    </div>
  );
};

const formatDateForApi = (value) => {
  if (!value) return ''

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''

  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
  const day = String(date.getDate()).padStart(2, '0')
  const month = months[date.getMonth()]
  const year = date.getFullYear()

  return `${day}-${month}-${year}`
}

function RptDaywisedata() {
  const { showError, showSuccess, showWarning } = useNotification()
  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startDate: '',
      endDate: '',
      accountNo: '',
      smaType: '',
    },
  })
  const today = new Date().toISOString().split('T')[0]
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [accountNo, setAccountNo] = useState('')
  const [smaType, setSmaType] = useState('')
  const [loading, setLoading] = useState(false)
  const [rows, setRows] = useState([])

  const columns = [
    { label: 'Contract Upload Date', sortable: true },
    { label: 'Account Type', sortable: true },
    {
      label: 'EMI Amount',
      sortable: true,
      render: (value) => Number(value || 0).toLocaleString(undefined, { maximumFractionDigits: 2 }),
    },
    {
      label: 'DIFF IN INT CREDIT',
      sortable: true,
      render: (value) => Number(value || 0).toLocaleString(undefined, { maximumFractionDigits: 2 }),
    },
    {
      label: 'CAP UNPD INT',
      sortable: true,
      render: (value) => Number(value || 0).toLocaleString(undefined, { maximumFractionDigits: 2 }),
    },
    {
      label: 'COLLECTABLE AMOUNT',
      sortable: true,
      render: (value) => Number(value || 0).toLocaleString(undefined, { maximumFractionDigits: 2 }),
    },
    { label: 'SMA Type', sortable: true },
  ]

  const columns2 = [
    {
      key: "uploadDate",
      label: "Contract Upload Date",
      render: (val, row) =>
        <MilestoneDate date={val} />
    },
    {
      key: "accountType",
      label: "Account Type",
      render: (val) => (
        val === "CCOD" ? (<span className="badge bg-primary text-white">
          {val}
        </span>) : val === "DLTL" ? (<span className="badge bg-info text-white">
          {val}
        </span>) : (<span className="badge bg-secondary text-white">
          {val}
        </span>)
      )
    },
    {
      key: "emiAmount",
      label: "EMI Amount",
      render: (val) => (
        <span>₹ {val}</span>
      )
    },
    {
      key: "diffInt",
      label: "Diff In Int Credit",
      render: (val) => (
        <span>₹ {val}</span>
      )
    },
    {
      key: "capUnpd",
      label: "Cap UNPD INT",
      render: (val) => (
        <span>₹ {val}</span>
      )
    },
    {
      key: "collectable",
      label: "Collectable Amount",
      render: (val) => (
        <span>₹ {val}</span>
      )
    },
    {
      key: "sma",
      label: "SMA Type",
      render: (val) => 
        ( val === "SMA0" ? (
          <span className="badge bg-success text-white">
          {val}
        </span> ): val === "SMA1" ? (
          <span className="badge bg-warning text-black">
          {val}
        </span>) : (<span className="badge bg-danger text-white">
          {val}
        </span>)
        )
    }
  ]

  const tableRows = useMemo(
    () =>
      rows.map((item) => [
        item.uploadDate || '',
        item.accountType || '',
        item.emiAmount || 0,
        item.diffInt || 0,
        item.capUnpd || 0,
        item.collectable || 0,
        item.sma || '',
      ]),
    [rows]
  )

  const handleSearch = async () => {

    const params = {
      startDate: formatDateForApi(startDate),
      endDate: formatDateForApi(endDate),
    }

    if (accountNo.trim()) {
      params.userId = accountNo.trim()
    }

    if (smaType) {
      params.smaType = smaType
    }

    const queryParams = new URLSearchParams(params)

    setLoading(true)
    try {
      const response = await apiClient.get(`/reports/dailyUploadedReport?${queryParams.toString()}`)
      const success = response?.success
      const data = Array.isArray(response?.data) ? response.data : []

      if (!success || !data.length) {
        setRows([])
        showWarning('No Data Found')
        return
      }

      const formatted = data.map((item) => ({
        uploadDate: item.CONTRACTUPLOADDATE || '',
        accountNumber: item.CONTRACTNUMBER || '',
        accountType: item.ACCOUNTTYPE || '',
        emiAmount: item.EMI || 0,
        diffInt: item.DIFF_IN_INT_CREDIT || 0,
        capUnpd: item.CAP_UNPD_INT || 0,
        collectable: item.COLLECTABLEAMOUNT || 0,
        sma: item.VAR_BANKDATA_DPDBUCKET || '',
      }))

      setRows(formatted)
      showSuccess(`Found ${formatted.length} records`)
    } catch (apiError) {
      setRows([])
      showError(apiError.message || 'API Error')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setStartDate('')
    setEndDate('')
    setAccountNo('')
    setSmaType('')
    setRows([])
    setValue('startDate', '')
    setValue('endDate', '')
    setValue('accountNo', '')
    setValue('smaType', '')
  }

  return (
    <div className="main-content page-daywise-data-report">
      <div className="page-header">
        <h1 className="page-title">Daily Uploaded Data Report</h1>
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-item">
            Home
          </Link>
          <span className="breadcrumb-item">Reports</span>
          <span className="breadcrumb-item active">Daily Uploaded Data</span>
        </nav>
      </div>

      <div className="card mb-4">
        <div className="card-header">
          <h5 className="card-title mb-0">Search Filters</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleFormSubmit(handleSearch)}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="startDate" className="form-label">
                  Select Start Date <span className="text-danger">*</span>
                </label>
                <input
                  id="startDate"
                  type="date"
                  max={today}
                  className={`form-control ${errors.startDate ? 'is-invalid' : ''}`}
                  value={startDate}
                  {...register('startDate', {
                    required: 'Start Date is required',
                    onChange: (event) => setStartDate(event.target.value),
                  })}
                />
                {errors.startDate && <div className="invalid-feedback">{errors.startDate.message}</div>}
              </div>

              <div className="col-md-6">
                <label htmlFor="endDate" className="form-label">
                  Select End Date <span className="text-danger">*</span>
                </label>
                <input
                  id="endDate"
                  type="date"
                  max={today}
                  className={`form-control ${errors.endDate ? 'is-invalid' : ''}`}
                  value={endDate}
                  {...register('endDate', {
                    required: 'End Date is required',
                    onChange: (event) => setEndDate(event.target.value),
                  })}
                />
                {errors.endDate && <div className="invalid-feedback">{errors.endDate.message}</div>}
              </div>

              <div className="col-md-6">
                <label htmlFor="accountNo" className="form-label">
                  Account Number
                </label>
                <input
                  id="accountNo"
                  type="text"
                  className="form-control"
                  value={accountNo}
                  placeholder="Enter account number (optional)"
                  {...register('accountNo', {
                    onChange: (event) => setAccountNo(event.target.value),
                  })}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="smaType" className="form-label">
                  SMA Type
                </label>
                <select
                  id="smaType"
                  className="form-select"
                  value={smaType}
                  {...register('smaType', {
                    onChange: (event) => setSmaType(event.target.value),
                  })}
                >
                  <option value="">--Select Option--</option>
                  <option value="SMA0">SMA0</option>
                  <option value="SMA1">SMA1</option>
                  <option value="SMA2">SMA2</option>
                </select>
              </div>
            </div>

            <div className="d-flex justify-content-center gap-3 mt-4">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleClose}>
                Close
              </button>
            </div>
          </form>
        </div>
      </div>

      {rows.length > 0 && (
        <div className="card">
          <div className="card-body">
            {/* <p className="text-muted mb-3">No Of Allocations: {rows.length}</p> */}
            {/* <ReusableDataGrid rows={tableRows} columns={columns} pageSize={10} /> */}
            <DataTable
              title='Daily Data Report'
              subtitle={`Number of Allocations: ${rows.length}`}
              columns={columns2}
              data={rows}
              perPage={5}
              csvFilename='daily_uploaded_data_report.csv'
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default RptDaywisedata