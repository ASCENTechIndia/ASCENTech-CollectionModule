import { useMemo, useState } from 'react'
import { useNotification } from '../context/useNotification'

function flattenHeaders(headers = []) {
  const leafColumns = []
  const headerRows = []

  headers.forEach((header) => {
    const children = Array.isArray(header.children) ? header.children : []
    if (children.length > 0) {
      headerRows.push({
        ...header,
        children,
      })

      children.forEach((child) => {
        leafColumns.push({
          ...child,
          groupName: header.displayName,
        })
      })
    } else {
      leafColumns.push({
        ...header,
        groupName: null,
      })
    }
  })

  return { headerRows, leafColumns }
}

function getCellText(value) {
  if (value === null || value === undefined) return ''
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return String(value)
  if (Array.isArray(value)) return value.map(getCellText).join(' ')
  if (typeof value === 'object') {
    if ('props' in value && value.props?.children !== undefined) {
      return getCellText(value.props.children)
    }
    return ''
  }
  return String(value)
}

export function ReusableGroupedDataGrid({
  rows = [],
  headers = [],
  title = '',
  pageSize: initialPageSize = 10,
  className = '',
  searchPlaceholder = 'Search...',
}) {
  const { showError } = useNotification()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [sortField, setSortField] = useState('')
  const [sortDirection, setSortDirection] = useState('asc')

  const { headerRows, leafColumns } = useMemo(() => flattenHeaders(headers), [headers])

  const filteredRows = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return rows

    return rows.filter((row) =>
      leafColumns.some((column) => {
        const cellValue = row?.[column.field]
        return getCellText(cellValue).toLowerCase().includes(term)
      })
    )
  }, [rows, search, leafColumns])

  const sortedRows = useMemo(() => {
    if (!sortField) return filteredRows

    const sorted = [...filteredRows].sort((leftRow, rightRow) => {
      const leftValue = leftRow?.[sortField]
      const rightValue = rightRow?.[sortField]

      const leftText = getCellText(leftValue)
      const rightText = getCellText(rightValue)
      const leftNumber = Number(leftText)
      const rightNumber = Number(rightText)

      if (!Number.isNaN(leftNumber) && !Number.isNaN(rightNumber) && leftText !== '' && rightText !== '') {
        return sortDirection === 'asc' ? leftNumber - rightNumber : rightNumber - leftNumber
      }

      const comparison = leftText.localeCompare(rightText, undefined, {
        numeric: true,
        sensitivity: 'base',
      })

      return sortDirection === 'asc' ? comparison : -comparison
    })

    return sorted
  }, [filteredRows, sortDirection, sortField])

  const totalPages = Math.max(1, Math.ceil(sortedRows.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const start = (currentPage - 1) * pageSize
  const visibleRows = sortedRows.slice(start, start + pageSize)

  const handleSort = (field) => {
    if (!field) return

    if (sortField === field) {
      setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'))
      return
    }

    setSortField(field)
    setSortDirection('asc')
  }

  const handleExportCSV = () => {
    try {
      const header = leafColumns.map((column) => `"${column.displayName || column.field}"`).join(',')
      const csvRows = sortedRows.map((row) =>
        leafColumns
          .map((column) => `"${getCellText(row?.[column.field]).replace(/"/g, '""')}"`)
          .join(',')
      )

      const csv = [header, ...csvRows].join('\n')
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

  const tableClassName = `table table-striped table-hover align-middle ${className}`

  return (
    <div className="datagrid-wrapper">
      {(title || leafColumns.length > 0) && (
        <div className="datatable-toolbar d-flex flex-wrap gap-3 justify-content-between align-items-center mb-3">
          <div>
            {title ? <h5 className="mb-0">{title}</h5> : null}
          </div>
          <div className="datatable-toolbar-meta d-flex align-items-center gap-3 flex-wrap">
            <div className="datatable-result-chip">
              <i className="bi bi-list-ul" />
              <span>{sortedRows.length} results</span>
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
            <button className="btn btn-outline-secondary btn-sm" type="button" onClick={handleExportCSV} title="Export to CSV">
              <i className="bi bi-download me-1" /> CSV
            </button>
          </div>
        </div>
      )}

      <div className="datatable-toolbar d-flex flex-wrap gap-3 justify-content-between align-items-center mb-3">
        <div className="datatable-search-shell" style={{ flex: '1', minWidth: '250px' }}>
          <span className="datatable-search-icon">
            <i className="bi bi-search" />
          </span>
          <input
            className="datatable-search-input"
            type="text"
            placeholder={searchPlaceholder}
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
      </div>

      <div className="table-responsive">
        <table className={tableClassName}>
          <thead>
            {headerRows.length > 0 ? (
              <>
                <tr>
                  {headers.map((header, index) => {
                    const children = Array.isArray(header.children) ? header.children : []
                    return (
                      <th
                        key={header.displayName || index}
                        colSpan={children.length || 1}
                        rowSpan={children.length ? 1 : 2}
                        className={`table-secondary ${header.className || ''}`}
                      >
                        {header.displayName || header.label || header.field}
                      </th>
                    )
                  })}
                </tr>
                <tr>
                  {leafColumns.map((column, index) => (
                    <th
                      key={column.field || index}
                      onClick={() => handleSort(column.field)}
                      className={`table-light ${column.className || ''}`}
                      style={{
                        cursor: column.sortable === false ? 'default' : 'pointer',
                        userSelect: 'none',
                      }}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <span>{column.displayName || column.label || column.field}</span>
                        {column.sortable !== false && (
                          <span className="ms-1 text-muted small">
                            {sortField === column.field ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </>
            ) : (
              <tr>
                {leafColumns.map((column, index) => (
                  <th
                    key={column.field || index}
                    onClick={() => handleSort(column.field)}
                    className={`table-light ${column.className || ''}`}
                    style={{
                      cursor: column.sortable === false ? 'default' : 'pointer',
                      userSelect: 'none',
                    }}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <span>{column.displayName || column.label || column.field}</span>
                      {column.sortable !== false && (
                        <span className="ms-1 text-muted small">
                          {sortField === column.field ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            )}
          </thead>
          <tbody>
            {visibleRows.length > 0 ? (
              visibleRows.map((row, rowIndex) => (
                <tr key={`${currentPage}-${rowIndex}`}>
                  {leafColumns.map((column, cellIndex) => {
                    const content = column.render ? column.render(row?.[column.field], row, rowIndex, cellIndex) : row?.[column.field]
                    return (
                      <td key={`${rowIndex}-${cellIndex}`} className={column.className || ''}>
                        {content}
                      </td>
                    )
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={leafColumns.length || 1} className="text-center text-muted py-4">
                  <i className="bi bi-inbox" /> No data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mt-3">
          <div className="text-muted small">
            {sortedRows.length === 0
              ? 'No results'
              : `${start + 1}–${Math.min(start + pageSize, sortedRows.length)} of ${sortedRows.length}`}
          </div>
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" type="button" onClick={() => setPage(Math.max(1, currentPage - 1))}>
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => index + 1)
                .slice(Math.max(0, currentPage - 2), Math.min(totalPages, currentPage + 1))
                .map((pageNumber) => (
                  <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                    <button className="page-link" type="button" onClick={() => setPage(pageNumber)}>
                      {pageNumber}
                    </button>
                  </li>
                ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" type="button" onClick={() => setPage(Math.min(totalPages, currentPage + 1))}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  )
}

export default ReusableGroupedDataGrid
