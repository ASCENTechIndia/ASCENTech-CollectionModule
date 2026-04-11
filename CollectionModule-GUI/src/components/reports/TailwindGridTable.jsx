import { useMemo, useState } from 'react'
import * as XLSX from 'xlsx'

function resolveField(column, columnMapping = {}) {
  if (typeof column.field === 'function') return column.field
  if (column.field) return column.field
  if (column.displayName && columnMapping[column.displayName]) return columnMapping[column.displayName]
  return column.key || column.displayName
}

function getValue(row, field) {
  if (typeof field === 'function') return field(row)
  if (!field) return ''

  if (String(field).includes('.')) {
    return String(field)
      .split('.')
      .reduce((acc, key) => acc?.[key], row) ?? ''
  }

  return row?.[field] ?? ''
}

function flattenColumns(headers = [], columnMapping = {}) {
  const columns = []

  headers.forEach((group) => {
    if (group.children?.length) {
      group.children.forEach((child) => {
        columns.push({
          ...child,
          field: resolveField(child, columnMapping),
          groupName: group.displayName,
        })
      })
      return
    }

    columns.push({
      ...group,
      field: resolveField(group, columnMapping),
    })
  })

  return columns
}

export default function TailwindGridTable({
  title = 'Data Grid',
  headers = [],
  rows = [],
  columnMapping = {},
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [orderBy, setOrderBy] = useState('')
  const [order, setOrder] = useState('asc')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const columns = useMemo(() => flattenColumns(headers, columnMapping), [headers, columnMapping])
  const hasGroupedHeaders = headers.some((header) => header.children?.length)

  const filteredRows = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    if (!query) return rows

    return rows.filter((row) =>
      columns.some((column) => String(getValue(row, column.field)).toLowerCase().includes(query))
    )
  }, [rows, columns, searchTerm])

  const sortedRows = useMemo(() => {
    if (!orderBy) return filteredRows

    return [...filteredRows].sort((a, b) => {
      const aValue = getValue(a, orderBy)
      const bValue = getValue(b, orderBy)

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return order === 'asc' ? aValue - bValue : bValue - aValue
      }

      const aString = String(aValue).toLowerCase()
      const bString = String(bValue).toLowerCase()

      if (aString < bString) return order === 'asc' ? -1 : 1
      if (aString > bString) return order === 'asc' ? 1 : -1
      return 0
    })
  }, [filteredRows, orderBy, order])

  const paginatedRows = useMemo(() => {
    const start = page * rowsPerPage
    return sortedRows.slice(start, start + rowsPerPage)
  }, [sortedRows, page, rowsPerPage])

  const totalPages = Math.max(1, Math.ceil(sortedRows.length / rowsPerPage))

  const handleSort = (field) => {
    const isAsc = orderBy === field && order === 'asc'
    setOrderBy(field)
    setOrder(isAsc ? 'desc' : 'asc')
  }

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new()
    const hasGroupedHeaders = headers.some((header) => header.children?.length)

    const aoa = []
    const merges = []

    if (hasGroupedHeaders) {
      const groupRow = []
      let colIndex = 0

      headers.forEach((group) => {
        const span = group.children?.length || 1
        groupRow.push(group.displayName)

        for (let i = 1; i < span; i += 1) {
          groupRow.push('')
        }

        if (span > 1) {
          merges.push({
            s: { r: 0, c: colIndex },
            e: { r: 0, c: colIndex + span - 1 },
          })
        }

        colIndex += span
      })

      aoa.push(groupRow)
    }

    aoa.push(columns.map((col) => col.displayName))

    sortedRows.forEach((row) => {
      aoa.push(columns.map((col) => getValue(row, col.field)))
    })

    const worksheet = XLSX.utils.aoa_to_sheet(aoa)
    worksheet['!merges'] = merges
    worksheet['!cols'] = columns.map((col) => ({
      wch: Math.max(12, String(col.displayName).length + 4),
    }))

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report')
    XLSX.writeFile(workbook, `${String(title).toLowerCase().replace(/\s+/g, '_')}.xlsx`)
  }

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
         </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setPage(0)
              }}
              placeholder="Search..."
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100 sm:w-64"
            />
            <button
              type="button"
              onClick={exportToExcel}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700"
            >
              Export Excel
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse text-xs">
            <thead>
              {hasGroupedHeaders && (
                <tr className="bg-primary-800 text-white">
                  {headers.map((group) => (
                    <th
                      key={group.displayName}
                      colSpan={group.children?.length || 1}
                      className="border-r border-primary-700 px-2 py-2 text-center font-semibold uppercase tracking-wide last:border-r-0"
                    >
                      {group.displayName}
                    </th>
                  ))}
                </tr>
              )}

              <tr className="bg-primary-700 text-white">
                {columns.map((column) => (
                  <th
                    key={column.field}
                    className="border-r border-primary-600 px-2 py-2 text-left font-semibold uppercase tracking-wide last:border-r-0"
                  >
                    <button
                      type="button"
                      onClick={() => handleSort(column.field)}
                      className="inline-flex items-center gap-1"
                    >
                      {column.displayName}
                      <span className="text-[10px]">
                        {orderBy === column.field ? (order === 'asc' ? '▲' : '▼') : '↕'}
                      </span>
                    </button>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {paginatedRows.length > 0 ? (
                paginatedRows.map((row, rowIndex) => (
                  <tr key={row.id ?? rowIndex} className="border-b border-gray-100 hover:bg-primary-50/40">
                    {columns.map((column) => {
                      const value = getValue(row, column.field)
                      const rendered = column.render ? column.render(value, row) : value

                      return (
                        <td
                          key={column.field}
                          className="border-r border-gray-100 px-2 py-2 text-gray-700 last:border-r-0"
                        >
                          {rendered === null || rendered === undefined || rendered === '' ? '-' : rendered}
                        </td>
                      )
                    })}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-10 text-center text-sm text-gray-500">
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-2 border-t border-gray-200 bg-gray-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-600">
            Showing {sortedRows.length === 0 ? 0 : page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, sortedRows.length)} of {sortedRows.length}
          </p>

          <div className="flex items-center gap-3">
            <label className="text-xs text-gray-600">
              Rows:
              <select
                className="ml-2 rounded border border-gray-300 bg-white px-2 py-1 text-xs"
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value, 10))
                  setPage(0)
                }}
              >
                {[5, 10, 25, 50].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </label>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setPage((prev) => Math.max(0, prev - 1))}
                disabled={page === 0}
                className="rounded border border-gray-300 bg-white px-2 py-1 text-xs disabled:cursor-not-allowed disabled:opacity-50"
              >
                Prev
              </button>
              <span className="text-xs text-gray-600">
                {page + 1} / {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setPage((prev) => Math.min(totalPages - 1, prev + 1))}
                disabled={page >= totalPages - 1}
                className="rounded border border-gray-300 bg-white px-2 py-1 text-xs disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
