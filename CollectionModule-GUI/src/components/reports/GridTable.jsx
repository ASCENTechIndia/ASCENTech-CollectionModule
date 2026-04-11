import { useMemo, useState } from 'react'
import {
  Box,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import DownloadIcon from '@mui/icons-material/Download'
import * as XLSX from 'xlsx'

function resolveField(column, columnMapping = {}) {
  if (typeof column.field === 'function') return column.field
  if (column.field) return column.field
  if (column.displayName && columnMapping[column.displayName]) {
    return columnMapping[column.displayName]
  }
  return column.key || column.displayName
}

function getValueFromPath(row, field) {
  if (typeof field === 'function') return field(row)
  if (!field) return ''

  if (field.includes('.')) {
    return field.split('.').reduce((acc, key) => acc?.[key], row) ?? ''
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

export default function GridTable({
  title,
  headers = [],
  rows = [],
  columnMapping = {},
  fullPage = true,
  containerSx = {},
}) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('')

  const leafColumns = useMemo(() => flattenColumns(headers, columnMapping), [headers, columnMapping])

  const filteredRows = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    if (!query) return rows

    return rows.filter((row) =>
      leafColumns.some((column) =>
        String(getValueFromPath(row, column.field)).toLowerCase().includes(query)
      )
    )
  }, [rows, searchTerm, leafColumns])

  const sortedRows = useMemo(() => {
    if (!orderBy) return filteredRows

    return [...filteredRows].sort((a, b) => {
      const aValue = getValueFromPath(a, orderBy)
      const bValue = getValueFromPath(b, orderBy)

      const aString = String(aValue).toLowerCase()
      const bString = String(bValue).toLowerCase()

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return order === 'asc' ? aValue - bValue : bValue - aValue
      }

      if (aString < bString) return order === 'asc' ? -1 : 1
      if (aString > bString) return order === 'asc' ? 1 : -1
      return 0
    })
  }, [filteredRows, order, orderBy])

  const paginatedRows = useMemo(() => {
    const start = page * rowsPerPage
    return sortedRows.slice(start, start + rowsPerPage)
  }, [sortedRows, page, rowsPerPage])

  const handleSort = (field) => {
    const isAsc = orderBy === field && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(field)
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

    aoa.push(leafColumns.map((col) => col.displayName))

    sortedRows.forEach((row) => {
      aoa.push(leafColumns.map((col) => getValueFromPath(row, col.field)))
    })

    const worksheet = XLSX.utils.aoa_to_sheet(aoa)
    worksheet['!merges'] = merges
    worksheet['!cols'] = leafColumns.map((col) => ({
      wch: Math.max(12, String(col.displayName).length + 4),
    }))

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report')
    XLSX.writeFile(workbook, `${String(title || 'data-grid').toLowerCase().replace(/\s+/g, '_')}.xlsx`)
  }

  const isNestedHeaders = headers.some((header) => header.children?.length)

  const groupHeaderRow = isNestedHeaders ? (
    <TableRow>
      {headers.map((group) => (
        <TableCell
          key={group.displayName}
          colSpan={group.children?.length || 1}
          align="center"
          sx={{
            bgcolor: 'primary.50',
            borderBottom: '1px solid',
            borderColor: 'divider',
            fontSize: '0.72rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: 'primary.900',
            py: 1.2,
            whiteSpace: 'nowrap',
          }}
        >
          {group.displayName}
        </TableCell>
      ))}
    </TableRow>
  ) : null

  const leafHeaderRow = (
    <TableRow>
      {leafColumns.map((column) => (
        <TableCell
          key={column.field}
          sortDirection={orderBy === column.field ? order : false}
          align={column.align || 'left'}
          sx={{
            bgcolor: 'grey.50',
            borderBottom: '1px solid',
            borderColor: 'divider',
            fontSize: '0.72rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'text.secondary',
            py: 1.15,
            whiteSpace: 'nowrap',
          }}
        >
          <TableSortLabel
            active={orderBy === column.field}
            direction={orderBy === column.field ? order : 'asc'}
            onClick={() => handleSort(column.field)}
            sx={{
              fontSize: '0.72rem',
              '& .MuiTableSortLabel-icon': { fontSize: '0.9rem' },
            }}
          >
            {column.displayName}
          </TableSortLabel>
        </TableCell>
      ))}
    </TableRow>
  )

  return (
    <Box
      sx={{
        ...(fullPage && {
          px: { xs: 1, sm: 2, md: 3 },
          pb: 3,
        }),
        ...containerSx,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden',
          boxShadow: '0 12px 30px rgba(15, 23, 42, 0.06)',
        }}
      >
        <Box
          sx={{
            px: { xs: 2, md: 3 },
            py: 2,
            display: 'flex',
            gap: 2,
            alignItems: { xs: 'stretch', md: 'center' },
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', md: 'row' },
            borderBottom: '1px solid',
            borderColor: 'divider',
            background: 'linear-gradient(90deg, rgba(240,249,255,1) 0%, rgba(255,255,255,1) 100%)',
          }}
        >
          <Box>
            {title && (
              <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 700, color: 'text.primary' }}>
                {title}
              </Typography>
            )}
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.78rem', mt: 0.25 }}>
              Theme-aligned demo table with grouped headers, search, sorting, export, and pagination.
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" justifyContent="flex-end">
            <TextField
              size="small"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setPage(0)
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: { xs: '100%', sm: 250 },
                '& .MuiInputBase-root': { fontSize: '0.85rem', borderRadius: 2 },
              }}
            />

            <IconButton
              onClick={exportToExcel}
              size="small"
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                bgcolor: 'white',
                '&:hover': { bgcolor: 'primary.50', borderColor: 'primary.200' },
              }}
              title="Export to Excel"
            >
              <DownloadIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Box>

        <TableContainer
          sx={{
            maxHeight: 560,
            overflowX: 'auto',
            '&::-webkit-scrollbar': { height: 8, width: 8 },
            '&::-webkit-scrollbar-track': { backgroundColor: '#f8fafc' },
            '&::-webkit-scrollbar-thumb': { backgroundColor: '#cbd5e1', borderRadius: 99 },
          }}
        >
          <Table stickyHeader size="small" sx={{ minWidth: '100%' }}>
            <TableHead>
              {groupHeaderRow}
              {leafHeaderRow}
            </TableHead>
            <TableBody>
              {paginatedRows.length > 0 ? (
                paginatedRows.map((row, rowIndex) => (
                  <TableRow
                    key={row.id ?? rowIndex}
                    hover
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      '&:hover': { bgcolor: 'rgba(14, 165, 233, 0.04)' },
                    }}
                  >
                    {leafColumns.map((column) => {
                      const value = getValueFromPath(row, column.field)
                      const rendered = column.render ? column.render(value, row) : value

                      return (
                        <TableCell
                          key={column.field}
                          align={column.align || 'left'}
                          sx={{
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                            py: 1.1,
                            fontSize: '0.82rem',
                            color: 'text.primary',
                            whiteSpace: 'nowrap',
                            maxWidth: 0,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            ...(column.align === 'right' && { fontWeight: 600 }),
                          }}
                        >
                          {rendered === null || rendered === undefined || rendered === '' ? '-' : rendered}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={leafColumns.length} align="center" sx={{ py: 8, color: 'text.secondary' }}>
                    No data available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={sortedRows.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10))
            setPage(0)
          }}
          rowsPerPageOptions={[5, 10, 25, 50]}
          sx={{
            borderTop: '1px solid',
            borderColor: 'divider',
            '& .MuiTablePagination-toolbar': { minHeight: 56 },
            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
              fontSize: '0.8rem',
            },
          }}
        />
      </Paper>
    </Box>
  )
}
