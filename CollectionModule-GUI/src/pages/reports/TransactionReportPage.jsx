import { useState, useMemo } from 'react'
import {
  Search,
  Download,
  Filter,
  ChevronDown,
  ArrowUpDown,
  Eye,
  Trash2,
} from 'lucide-react'

export default function TransactionReportPage() {
  const [filters, setFilters] = useState({
    fromDate: '',
    toDate: '',
    region: '',
    branch: '',
    userId: '',
    siteType: '',
    reportType: '',
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: 'refId', direction: 'asc' })
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(20)
  const [visibleColumns, setVisibleColumns] = useState({
    refId: true,
    collectivePeriod: true,
    transactionId: true,
    agreedAmount: true,
    outwardAmount: true,
    customerCharge: true,
    customerCompensation: true,
    feedback: true,
    paymentAmount: true,
    reversalAmount: true,
    date: true,
    description: true,
    reportId: true,
    transactionType: true,
  })

  // Demo transaction data
  const demoTransactions = [
    {
      refId: 'TXN001',
      collectivePeriod: 'Jan-2024',
      transactionId: 'TXN20240101001',
      agreedAmount: 50000,
      outwardAmount: 50000,
      customerCharge: 500,
      customerCompensation: 100,
      feedback: 'Success',
      paymentAmount: 50500,
      reversalAmount: 0,
      date: '2024-01-01',
      description: 'Initial deposit',
      reportId: 'REP001',
      transactionType: 'Credit',
    },
    {
      refId: 'TXN002',
      collectivePeriod: 'Jan-2024',
      transactionId: 'TXN20240102001',
      agreedAmount: 75000,
      outwardAmount: 75000,
      customerCharge: 750,
      customerCompensation: 150,
      feedback: 'Pending',
      paymentAmount: 75750,
      reversalAmount: 0,
      date: '2024-01-05',
      description: 'Transfer in',
      reportId: 'REP001',
      transactionType: 'Credit',
    },
    {
      refId: 'TXN003',
      collectivePeriod: 'Jan-2024',
      transactionId: 'TXN20240103001',
      agreedAmount: 25000,
      outwardAmount: 25000,
      customerCharge: 250,
      customerCompensation: 50,
      feedback: 'Completed',
      paymentAmount: 25250,
      reversalAmount: 0,
      date: '2024-01-10',
      description: 'Withdrawal',
      reportId: 'REP002',
      transactionType: 'Debit',
    },
    {
      refId: 'TXN004',
      collectivePeriod: 'Feb-2024',
      transactionId: 'TXN20240201001',
      agreedAmount: 100000,
      outwardAmount: 100000,
      customerCharge: 1000,
      customerCompensation: 200,
      feedback: 'Success',
      paymentAmount: 101000,
      reversalAmount: 0,
      date: '2024-02-01',
      description: 'Loan disbursement',
      reportId: 'REP003',
      transactionType: 'Credit',
    },
    {
      refId: 'TXN005',
      collectivePeriod: 'Feb-2024',
      transactionId: 'TXN20240202001',
      agreedAmount: 30000,
      outwardAmount: 30000,
      customerCharge: 300,
      customerCompensation: 60,
      feedback: 'Failed',
      paymentAmount: 30300,
      reversalAmount: 30300,
      date: '2024-02-05',
      description: 'Failed transaction',
      reportId: 'REP003',
      transactionType: 'Debit',
    },
    {
      refId: 'TXN006',
      collectivePeriod: 'Feb-2024',
      transactionId: 'TXN20240203001',
      agreedAmount: 60000,
      outwardAmount: 60000,
      customerCharge: 600,
      customerCompensation: 120,
      feedback: 'Pending',
      paymentAmount: 60600,
      reversalAmount: 0,
      date: '2024-02-10',
      description: 'Pending approval',
      reportId: 'REP004',
      transactionType: 'Credit',
    },
    {
      refId: 'TXN007',
      collectivePeriod: 'Mar-2024',
      transactionId: 'TXN20240301001',
      agreedAmount: 45000,
      outwardAmount: 45000,
      customerCharge: 450,
      customerCompensation: 90,
      feedback: 'Success',
      paymentAmount: 45450,
      reversalAmount: 0,
      date: '2024-03-01',
      description: 'Regular payment',
      reportId: 'REP005',
      transactionType: 'Debit',
    },
    {
      refId: 'TXN008',
      collectivePeriod: 'Mar-2024',
      transactionId: 'TXN20240302001',
      agreedAmount: 80000,
      outwardAmount: 80000,
      customerCharge: 800,
      customerCompensation: 160,
      feedback: 'Success',
      paymentAmount: 80800,
      reversalAmount: 0,
      date: '2024-03-05',
      description: 'Bulk upload',
      reportId: 'REP005',
      transactionType: 'Credit',
    },
    {
      refId: 'TXN009',
      collectivePeriod: 'Mar-2024',
      transactionId: 'TXN20240303001',
      agreedAmount: 35000,
      outwardAmount: 35000,
      customerCharge: 350,
      customerCompensation: 70,
      feedback: 'Pending',
      paymentAmount: 35350,
      reversalAmount: 0,
      date: '2024-03-10',
      description: 'Awaiting confirmation',
      reportId: 'REP006',
      transactionType: 'Debit',
    },
    {
      refId: 'TXN010',
      collectivePeriod: 'Mar-2024',
      transactionId: 'TXN20240304001',
      agreedAmount: 120000,
      outwardAmount: 120000,
      customerCharge: 1200,
      customerCompensation: 240,
      feedback: 'Success',
      paymentAmount: 121200,
      reversalAmount: 0,
      date: '2024-03-15',
      description: 'Large transaction',
      reportId: 'REP006',
      transactionType: 'Credit',
    },
  ]

  // Filter data
  const filteredData = useMemo(() => {
    return demoTransactions.filter((tx) => {
      const matchSearch =
        !searchTerm ||
        Object.values(tx)
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())

      const matchFilters = Object.keys(filters).every((key) => {
        if (!filters[key]) return true
        const fieldValue = String(tx[key] || '').toLowerCase()
        return fieldValue.includes(filters[key].toLowerCase())
      })

      return matchSearch && matchFilters
    })
  }, [searchTerm, filters])

  // Sort data
  const sortedData = useMemo(() => {
    const sorted = [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]

      if (typeof aValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }

      return sortConfig.direction === 'asc'
        ? aValue - bValue
        : bValue - aValue
    })
    return sorted
  }, [filteredData, sortConfig])

  // Paginate data
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return sortedData.slice(start, start + itemsPerPage)
  }, [sortedData, currentPage])

  const totalPages = Math.ceil(sortedData.length / itemsPerPage)

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setCurrentPage(1)
  }

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const toggleColumn = (columnKey) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [columnKey]: !prev[columnKey],
    }))
  }

  const handleExport = () => {
    // Create CSV content
    const headers = Object.keys(visibleColumns)
      .filter((key) => visibleColumns[key])
      .join(',')

    const rows = filteredData
      .map((tx) =>
        Object.keys(visibleColumns)
          .filter((key) => visibleColumns[key])
          .map((key) => tx[key])
          .join(',')
      )
      .join('\n')

    const csv = [headers, rows].join('\n')

    // Download CSV
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'transaction-report.csv'
    a.click()
  }

  const getStatusColor = (status) => {
    const colors = {
      Success: 'bg-green-100 text-green-800',
      Pending: 'bg-yellow-100 text-yellow-800',
      Failed: 'bg-red-100 text-red-800',
      Completed: 'bg-blue-100 text-blue-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const getTransactionTypeColor = (type) => {
    return type === 'Credit'
      ? 'text-green-600 font-semibold'
      : 'text-red-600 font-semibold'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Transaction Report</h1>
        </div>

        {/* Filter Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary-600" />
            Filter Transactions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* From Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From Date
              </label>
              <input
                type="date"
                value={filters.fromDate}
                onChange={(e) => handleFilterChange('fromDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>

            {/* To Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To Date
              </label>
              <input
                type="date"
                value={filters.toDate}
                onChange={(e) => handleFilterChange('toDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Region */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Region
              </label>
              <select
                value={filters.region}
                onChange={(e) => handleFilterChange('region', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white"
              >
                <option value="">Select Region</option>
                <option value="North">North</option>
                <option value="South">South</option>
                <option value="East">East</option>
                <option value="West">West</option>
              </select>
            </div>

            {/* Branch */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Branch
              </label>
              <select
                value={filters.branch}
                onChange={(e) => handleFilterChange('branch', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white"
              >
                <option value="">Select Branch</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Chennai">Chennai</option>
              </select>
            </div>

            {/* User ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User ID
              </label>
              <input
                type="text"
                placeholder="Enter User ID"
                value={filters.userId}
                onChange={(e) => handleFilterChange('userId', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Site Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Type
              </label>
              <select
                value={filters.siteType}
                onChange={(e) => handleFilterChange('siteType', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white"
              >
                <option value="">Select Site Type</option>
                <option value="Branch">Branch</option>
                <option value="ATM">ATM</option>
                <option value="Online">Online</option>
              </select>
            </div>

            {/* Report Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report Type
              </label>
              <select
                value={filters.reportType}
                onChange={(e) => handleFilterChange('reportType', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white"
              >
                <option value="">Select Report Type</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes/Description
              </label>
              <input
                type="text"
                placeholder="Search in notes"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors">
              <Search className="w-4 h-4" />
              Submit
            </button>
            <button
              onClick={() => {
                setFilters({
                  fromDate: '',
                  toDate: '',
                  region: '',
                  branch: '',
                  userId: '',
                  siteType: '',
                  reportType: '',
                })
                setSearchTerm('')
                setCurrentPage(1)
              }}
              className="flex items-center gap-2 px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
            >
              Clear
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-6 py-2 bg-success-600 hover:bg-success-700 text-white rounded-lg font-medium transition-colors ml-auto"
            >
              <Download className="w-4 h-4" />
              Export to Excel
            </button>
          </div>
        </div>

        {/* Column Visibility */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Show/Hide Columns
          </h3>
          <div className="flex flex-wrap gap-3">
            {Object.keys(visibleColumns).map((key) => (
              <label
                key={key}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={visibleColumns[key]}
                  onChange={() => toggleColumn(key)}
                  className="w-4 h-4 text-primary-600 rounded cursor-pointer"
                />
                <span className="text-sm text-gray-700 capitalize">
                  {key
                    .replace(/([A-Z])/g, ' $1')
                    .trim()}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">
            Showing{' '}
            <span className="font-semibold text-gray-900">
              {paginatedData.length}
            </span>{' '}
            of{' '}
            <span className="font-semibold text-gray-900">
              {sortedData.length}
            </span>{' '}
            results
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  {visibleColumns.refId && (
                    <th className="px-4 py-3 text-left">
                      <button
                        onClick={() => handleSort('refId')}
                        className="flex items-center gap-2 text-xs font-semibold text-gray-900 hover:text-primary-600 transition-colors"
                      >
                        Ref ID
                        <ArrowUpDown className="w-4 h-4" />
                      </button>
                    </th>
                  )}
                  {visibleColumns.collectivePeriod && (
                    <th className="px-4 py-3 text-left">
                      <button
                        onClick={() => handleSort('collectivePeriod')}
                        className="flex items-center gap-2 text-xs font-semibold text-gray-900 hover:text-primary-600 transition-colors"
                      >
                        Period
                        <ArrowUpDown className="w-4 h-4" />
                      </button>
                    </th>
                  )}
                  {visibleColumns.transactionId && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">
                      Transaction ID
                    </th>
                  )}
                  {visibleColumns.agreedAmount && (
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-900">
                      Agreed Amt
                    </th>
                  )}
                  {visibleColumns.outwardAmount && (
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-900">
                      Outward Amt
                    </th>
                  )}
                  {visibleColumns.customerCharge && (
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-900">
                      Charge
                    </th>
                  )}
                  {visibleColumns.customerCompensation && (
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-900">
                      Compensation
                    </th>
                  )}
                  {visibleColumns.feedback && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">
                      Feedback
                    </th>
                  )}
                  {visibleColumns.paymentAmount && (
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-900">
                      Payment
                    </th>
                  )}
                  {visibleColumns.reversalAmount && (
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-900">
                      Reversal
                    </th>
                  )}
                  {visibleColumns.date && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">
                      Date
                    </th>
                  )}
                  {visibleColumns.description && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">
                      Description
                    </th>
                  )}
                  {visibleColumns.reportId && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">
                      Report ID
                    </th>
                  )}
                  {visibleColumns.transactionType && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">
                      Type
                    </th>
                  )}
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedData.length > 0 ? (
                  paginatedData.map((tx, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {visibleColumns.refId && (
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          {tx.refId}
                        </td>
                      )}
                      {visibleColumns.collectivePeriod && (
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {tx.collectivePeriod}
                        </td>
                      )}
                      {visibleColumns.transactionId && (
                        <td className="px-4 py-3 text-sm text-gray-700 font-mono">
                          {tx.transactionId}
                        </td>
                      )}
                      {visibleColumns.agreedAmount && (
                        <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium">
                          ₹{tx.agreedAmount.toLocaleString()}
                        </td>
                      )}
                      {visibleColumns.outwardAmount && (
                        <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium">
                          ₹{tx.outwardAmount.toLocaleString()}
                        </td>
                      )}
                      {visibleColumns.customerCharge && (
                        <td className="px-4 py-3 text-sm text-gray-700 text-right">
                          ₹{tx.customerCharge}
                        </td>
                      )}
                      {visibleColumns.customerCompensation && (
                        <td className="px-4 py-3 text-sm text-gray-700 text-right">
                          ₹{tx.customerCompensation}
                        </td>
                      )}
                      {visibleColumns.feedback && (
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                              tx.feedback
                            )}`}
                          >
                            {tx.feedback}
                          </span>
                        </td>
                      )}
                      {visibleColumns.paymentAmount && (
                        <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium">
                          ₹{tx.paymentAmount.toLocaleString()}
                        </td>
                      )}
                      {visibleColumns.reversalAmount && (
                        <td className="px-4 py-3 text-sm text-gray-700 text-right">
                          ₹{tx.reversalAmount}
                        </td>
                      )}
                      {visibleColumns.date && (
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {tx.date}
                        </td>
                      )}
                      {visibleColumns.description && (
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {tx.description}
                        </td>
                      )}
                      {visibleColumns.reportId && (
                        <td className="px-4 py-3 text-sm text-gray-700 font-mono">
                          {tx.reportId}
                        </td>
                      )}
                      {visibleColumns.transactionType && (
                        <td
                          className={`px-4 py-3 text-sm ${getTransactionTypeColor(
                            tx.transactionType
                          )}`}
                        >
                          {tx.transactionType}
                        </td>
                      )}
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 hover:bg-red-50 rounded-lg text-red-600 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={Object.values(visibleColumns).filter(Boolean)
                        .length + 1}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      No transactions found. Try adjusting your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-gray-50 border-t border-gray-200 px-4 py-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Page{' '}
                <span className="font-semibold text-gray-900">{currentPage}</span>{' '}
                of{' '}
                <span className="font-semibold text-gray-900">{totalPages}</span>
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.max(1, p - 1))
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
