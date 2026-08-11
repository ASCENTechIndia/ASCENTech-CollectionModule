import { useState, useMemo } from 'react'
import { useNotification } from '../context/useNotification'

/**
 * ReusableDataGrid Component
 * A fully self-contained data grid with built-in: sorting, searching, pagination, and CSV export
 * Just pass your data and columns - everything else is handled!
 *
 * @param {Array} rows - Array of row data (2D array)
 * @param {Array} columns - Array of column definitions
 *   Example: [
 *     { label: 'ID', sortable: true },
 *     { label: 'Name', sortable: true },
 *     { label: 'Status', sortable: true, render: (value) => <span>{value}</span> },
 *     { label: 'Actions', sortable: false, render: () => <button>Edit</button> }
 *   ]
 * @param {string} title - Optional title for the grid
 * @param {number} pageSize - Rows per page (default: 10)
 * @param {string} className - Additional CSS classes
 */
export function ReusableDataGrid({
  rows = [],
  columns = [],
  title = '',
  pageSize: initialPageSize = 10,
  className = '',
}) {
  const { showError } = useNotification()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [sortIndex, setSortIndex] = useState(-1)
  const [sortDirection, setSortDirection] = useState('asc')

  // ============ FILTER (Search) ============
  const filteredRows = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return rows

    return rows.filter((row) => {
      return columns.some((col, colIndex) => {
        const cellValue = row[colIndex]
        if (cellValue === null || cellValue === undefined) return false
        return String(cellValue).toLowerCase().includes(term)
      })
    })
  }, [rows, search, columns])

  // ============ SORT ============
  const sortedAndFilteredRows = useMemo(() => {
    if (sortIndex === -1) return filteredRows

    const sorted = [...filteredRows].sort((leftRow, rightRow) => {
      const leftValue = String(leftRow[sortIndex] || '')
      const rightValue = String(rightRow[sortIndex] || '')

      const leftNum = parseFloat(leftValue)
      const rightNum = parseFloat(rightValue)

      if (!isNaN(leftNum) && !isNaN(rightNum)) {
        return sortDirection === 'asc' ? leftNum - rightNum : rightNum - leftNum
      }

      const comparison = leftValue.localeCompare(rightValue, undefined, {
        numeric: true,
        sensitivity: 'base',
      })
      return sortDirection === 'asc' ? comparison : -comparison
    })

    return sorted
  }, [filteredRows, sortIndex, sortDirection])

  // ============ PAGINATION ============
  const totalPages = Math.max(1, Math.ceil(sortedAndFilteredRows.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const start = (currentPage - 1) * pageSize
  const visibleRows = sortedAndFilteredRows.slice(start, start + pageSize)

  // ============ HANDLERS ============
  const handleSort = (columnIndex) => {
    if (columns[columnIndex]?.sortable === false) return

    if (sortIndex === columnIndex) {
      setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortIndex(columnIndex)
      setSortDirection('asc')
    }
  }

  const handleExportCSV = () => {
    try {
      // Create CSV header
      const header = columns.map((col) => `"${col.label}"`).join(',')

      // Create CSV rows
      const csvRows = sortedAndFilteredRows.map((row) =>
        row.map((cell) => {
          // Extract text from React elements if needed
          const cellValue = typeof cell === 'object' ? (cell?.props?.children || '') : cell
          return `"${String(cellValue).replace(/"/g, '""')}"`
        }).join(',')
      )

      // Combine header and rows
      const csv = [header, ...csvRows].join('\n')

      // Create blob and download
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `report-${new Date().toISOString().split('T')[0]}.csv`
      link.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Export failed:', error)
      showError('Failed to export CSV')
    }
  }

  const tableClassName = `table table-bordered table-striped table-hover align-middle reusable-datagrid-table ${className}`

  return (
    <div className="datagrid-wrapper">
      {title ? <h6 className="mb-3 text-primary fw-semibold">{title}</h6> : null}

      {/* Toolbar */}
      <div className="datatable-toolbar d-flex flex-wrap gap-3 justify-content-between align-items-center mb-3">
        {/* Search */}
        <div className="datatable-search-shell" style={{ flex: '1', minWidth: '250px' }}>
          <span className="datatable-search-icon">
            <i className="bi bi-search" />
          </span>
          <input
            className="datatable-search-input"
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value)
              setPage(1)
            }}
          />
          {search ? (
            <button
              className="datatable-search-clear"
              type="button"
              onClick={() => {
                setSearch('')
                setPage(1)
              }}
              aria-label="Clear search"
            >
              <i className="bi bi-x-lg" />
            </button>
          ) : null}
        </div>

        {/* Meta Info & Controls */}
        <div className="datatable-toolbar-meta d-flex align-items-center gap-3 flex-wrap">
          <div className="datatable-result-chip">
            <i className="bi bi-list-ul" />
            <span>{sortedAndFilteredRows.length} results</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="text-muted small text-nowrap">Per page</span>
            <select
              className="form-select form-select-sm datatable-page-size"
              value={pageSize}
              onChange={(event) => {
                setPageSize(Number(event.target.value))
                setPage(1)
              }}
            >
              {[5, 10, 15, 25, 50].map((value) => (
                <option value={value} key={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          {/* Export Button */}
          <button
            className="btn btn-outline-secondary btn-sm"
            type="button"
            onClick={handleExportCSV}
            title="Export to CSV"
          >
            <i className="bi bi-download me-1" /> CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className={tableClassName}>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={column.label || index}
                  onClick={() => handleSort(index)}
                  style={{
                    cursor: column.sortable === false ? 'default' : 'pointer',
                    userSelect: 'none',
                  }}
                  className={column.className || ''}
                >
                  <div className="d-flex align-items-center gap-2">
                    <span>{column.label}</span>
                    {column.sortable !== false ? (
                      <span className="ms-1 text-muted small">
                        {sortIndex === index ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}
                      </span>
                    ) : null}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleRows.length > 0 ? (
              visibleRows.map((row, rowIndex) => (
                <tr key={`${currentPage}-${rowIndex}`}>
                  {row.map((cell, cellIndex) => {
                    const column = columns[cellIndex]
                    const content = column?.render ? column.render(cell, row, rowIndex, cellIndex) : cell
                    return (
                      <td key={`${rowIndex}-${cellIndex}`} className={column?.className || ''}>
                        {content}
                      </td>
                    )
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center text-muted py-4">
                  <i className="bi bi-inbox" /> No data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mt-3">
          <div className="text-muted small">
            {sortedAndFilteredRows.length === 0
              ? 'No results'
              : `${start + 1}–${Math.min(start + pageSize, sortedAndFilteredRows.length)} of ${sortedAndFilteredRows.length}`}
          </div>
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  type="button"
                  onClick={() => setPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <i className="bi bi-chevron-left" />
                </button>
              </li>

              {Array.from({ length: Math.min(5, totalPages) }, (_, index) => currentPage - 2 + index)
                .filter((pageNum) => pageNum > 0)
                .map((pageNum) => (
                  <li className={`page-item ${pageNum === currentPage ? 'active' : ''}`} key={pageNum}>
                    <button className="page-link" type="button" onClick={() => setPage(pageNum)}>
                      {pageNum}
                    </button>
                  </li>
                ))}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <li className="page-item disabled">
                  <span className="page-link">...</span>
                </li>
              )}

              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  type="button"
                  onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  <i className="bi bi-chevron-right" />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  )
}

export default ReusableDataGrid
