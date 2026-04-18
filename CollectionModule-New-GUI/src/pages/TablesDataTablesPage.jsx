import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'

const basicRows = [
  ['Tiger Nixon', 'System Architect', 'Edinburgh', 61, '2011/04/25', '$320,800'],
  ['Garrett Winters', 'Accountant', 'Tokyo', 63, '2011/07/25', '$170,750'],
  ['Ashton Cox', 'Junior Technical Author', 'San Francisco', 66, '2009/01/12', '$86,000'],
  ['Cedric Kelly', 'Senior Javascript Developer', 'Edinburgh', 22, '2012/03/29', '$433,060'],
  ['Airi Satou', 'Accountant', 'Tokyo', 33, '2008/11/28', '$162,700'],
  ['Brielle Williamson', 'Integration Specialist', 'New York', 61, '2012/12/02', '$372,000'],
  ['Herrod Chandler', 'Sales Assistant', 'San Francisco', 59, '2012/08/06', '$137,500'],
  ['Rhona Davidson', 'Integration Specialist', 'Tokyo', 55, '2010/10/14', '$327,900'],
  ['Colleen Hurst', 'Javascript Developer', 'San Francisco', 39, '2009/09/15', '$205,500'],
  ['Sonya Frost', 'Software Engineer', 'Edinburgh', 23, '2008/12/13', '$103,600'],
  ['Jena Gaines', 'Office Manager', 'London', 30, '2008/12/19', '$90,560'],
  ['Quinn Flynn', 'Support Lead', 'Edinburgh', 22, '2013/03/03', '$342,000'],
  ['Charde Marshall', 'Regional Director', 'San Francisco', 36, '2008/10/16', '$470,600'],
  ['Haley Kennedy', 'Senior Marketing Designer', 'London', 43, '2012/12/18', '$313,500'],
  ['Tatyana Fitzpatrick', 'Regional Director', 'London', 19, '2010/03/17', '$385,750'],
  ['Michael Silva', 'Marketing Designer', 'London', 66, '2012/11/27', '$198,500'],
  ['Paul Byrd', 'Chief Financial Officer', 'New York', 64, '2010/06/09', '$725,000'],
  ['Gloria Little', 'Systems Administrator', 'New York', 59, '2009/04/10', '$237,500'],
  ['Bradley Greer', 'Software Engineer', 'London', 41, '2012/10/13', '$132,000'],
  ['Dai Rios', 'Personnel Lead', 'Edinburgh', 35, '2012/09/26', '$217,500'],
]

const productRows = [
  ['MacBook Pro 16"', 'Laptops', '$2,499', 45],
  ['iPhone 15 Pro', 'Phones', '$1,199', 128],
  ['iPad Pro 12.9"', 'Tablets', '$1,099', 67],
  ['AirPods Pro 2', 'Audio', '$249', 234],
  ['Apple Watch Ultra 2', 'Wearables', '$799', 89],
  ['Magic Keyboard', 'Accessories', '$299', 156],
  ['Studio Display', 'Monitors', '$1,599', 23],
  ['Mac Mini M2', 'Desktops', '$599', 78],
]

const userRows = [
  ['Sarah Johnson', 'sarah.johnson@example.com', 'Admin', 'Active', 'Jan 15, 2024'],
  ['Michael Chen', 'michael.chen@example.com', 'Editor', 'Active', 'Feb 22, 2024'],
  ['Emily Davis', 'emily.davis@example.com', 'Viewer', 'Pending', 'Mar 10, 2024'],
  ['David Wilson', 'david.wilson@example.com', 'Editor', 'Inactive', 'Apr 05, 2024'],
  ['Lisa Anderson', 'lisa.anderson@example.com', 'Admin', 'Active', 'May 18, 2024'],
  ['James Rodriguez', 'james.rodriguez@example.com', 'Viewer', 'Active', 'Jun 30, 2024'],
  ['Emma Thompson', 'emma.thompson@example.com', 'Editor', 'Active', 'Jul 12, 2024'],
  ['Robert Kim', 'robert.kim@example.com', 'Admin', 'Pending', 'Aug 25, 2024'],
  ['Sophia Martinez', 'sophia.martinez@example.com', 'Viewer', 'Active', 'Sep 08, 2024'],
  ['William Brown', 'william.brown@example.com', 'Editor', 'Inactive', 'Oct 20, 2024'],
]

const orderRows = [
  ['#ORD-7245', 'James Rodriguez', 'MacBook Pro 16"', '$2,499.00', 'Jan 15, 2026', 'Delivered'],
  ['#ORD-7244', 'Emma Thompson', 'iPhone 15 Pro Max', '$1,199.00', 'Jan 14, 2026', 'Processing'],
  ['#ORD-7243', 'Robert Kim', 'AirPods Pro 2', '$249.00', 'Jan 14, 2026', 'Shipped'],
  ['#ORD-7242', 'Sophia Martinez', 'Apple Watch Ultra 2', '$799.00', 'Jan 13, 2026', 'Cancelled'],
  ['#ORD-7241', 'William Brown', 'iPad Pro 12.9"', '$1,099.00', 'Jan 12, 2026', 'Delivered'],
  ['#ORD-7240', 'Olivia Garcia', 'Magic Keyboard', '$299.00', 'Jan 11, 2026', 'Delivered'],
  ['#ORD-7239', 'Daniel Lee', 'Studio Display', '$1,599.00', 'Jan 10, 2026', 'Shipped'],
  ['#ORD-7238', 'Sarah Johnson', 'Mac Mini M2 Pro', '$1,299.00', 'Jan 09, 2026', 'Processing'],
  ['#ORD-7237', 'Michael Chen', 'HomePod 2', '$299.00', 'Jan 08, 2026', 'Delivered'],
  ['#ORD-7236', 'Emily Davis', 'AirTag 4-Pack', '$99.00', 'Jan 07, 2026', 'Delivered'],
  ['#ORD-7235', 'David Wilson', 'MacBook Air M3', '$1,299.00', 'Jan 06, 2026', 'Refunded'],
  ['#ORD-7234', 'Lisa Anderson', 'Apple TV 4K', '$179.00', 'Jan 05, 2026', 'Delivered'],
]

function SectionCard({ title, subtitle, children, actions }) {
  return (
    <div className="card mb-4">
      <div className="card-header d-flex justify-content-between align-items-center gap-3">
        <div>
          <h5 className="card-title mb-1">{title}</h5>
          {subtitle ? <p className="card-subtitle mb-0">{subtitle}</p> : null}
        </div>
        {actions}
      </div>
      <div className="card-body">{children}</div>
    </div>
  )
}

function DataTableControls({ search, onSearch, pageSize, onPageSizeChange, total }) {
  return (
    <div className="datatable-toolbar d-flex flex-wrap gap-3 justify-content-between align-items-center mb-3">
      <div className="datatable-search-shell">
        <span className="datatable-search-icon">
          <i className="bi bi-search" />
        </span>
        <input
          className="datatable-search-input"
          type="text"
          placeholder="Search table data..."
          value={search}
          onChange={(event) => onSearch(event.target.value)}
        />
        {search ? (
          <button className="datatable-search-clear" type="button" onClick={() => onSearch('')} aria-label="Clear search">
            <i className="bi bi-x-lg" />
          </button>
        ) : null}
      </div>

      <div className="datatable-toolbar-meta d-flex align-items-center gap-3 flex-wrap">
        <div className="datatable-result-chip">
          <i className="bi bi-list-ul" />
          <span>{total} matching rows</span>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="text-muted small text-nowrap">Rows per page</span>
          <select className="form-select form-select-sm datatable-page-size" value={pageSize} onChange={(event) => onPageSizeChange(Number(event.target.value))}>
          {[5, 10, 15].map((value) => (
            <option value={value} key={value}>{value}</option>
          ))}
          </select>
        </div>
      </div>
    </div>
  )
}

function PaginatedTable({ rows, columns, pageSize, search, onSearch, page, setPage, setPageSize, sortable = false }) {
  const [sortIndex, setSortIndex] = useState(0)
  const [sortDirection, setSortDirection] = useState('asc')

  const filteredRows = useMemo(() => {
    const term = search.trim().toLowerCase()
    const filtered = term
      ? rows.filter((row) => row.some((cell) => String(cell).toLowerCase().includes(term)))
      : rows

    if (!sortable) {
      return filtered
    }

    const sorted = [...filtered].sort((left, right) => {
      const leftValue = String(left[sortIndex])
      const rightValue = String(right[sortIndex])
      const comparison = leftValue.localeCompare(rightValue, undefined, { numeric: true, sensitivity: 'base' })
      return sortDirection === 'asc' ? comparison : -comparison
    })

    return sorted
  }, [rows, search, sortDirection, sortIndex, sortable])

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const start = (currentPage - 1) * pageSize
  const visibleRows = filteredRows.slice(start, start + pageSize)

  return (
    <>
      <DataTableControls search={search} onSearch={onSearch} pageSize={pageSize} onPageSizeChange={setPageSize} total={filteredRows.length} />
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={column.label} onClick={() => {
                  if (!sortable || column.sortable === false) return
                  if (sortIndex === index) {
                    setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'))
                  } else {
                    setSortIndex(index)
                    setSortDirection('asc')
                  }
                }} style={{ cursor: column.sortable === false ? 'default' : 'pointer' }}>
                  {column.label}
                  {sortable && column.sortable !== false ? <span className="ms-1 text-muted">{sortIndex === index ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}</span> : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row, rowIndex) => (
              <tr key={`${rowIndex}-${row.join('-')}`}>
                {row.map((cell) => (
                  <td key={String(cell)}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mt-3">
        <div className="text-muted small">
          Showing {filteredRows.length === 0 ? 0 : start + 1}-{Math.min(start + pageSize, filteredRows.length)} of {filteredRows.length}
        </div>
        <nav>
          <ul className="pagination pagination-sm mb-0">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" type="button" onClick={() => setPage((value) => Math.max(1, value - 1))}>
                <i className="bi bi-chevron-left" />
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => index + 1).slice(0, 5).map((value) => (
              <li className={`page-item ${value === currentPage ? 'active' : ''}`} key={value}>
                <button className="page-link" type="button" onClick={() => setPage(value)}>{value}</button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" type="button" onClick={() => setPage((value) => Math.min(totalPages, value + 1))}>
                <i className="bi bi-chevron-right" />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}

function TablesDataTablesPage() {
  const [basicSearch, setBasicSearch] = useState('')
  const [searchOnlySearch, setSearchOnlySearch] = useState('')
  const [userSearch, setUserSearch] = useState('')
  const [orderSearch, setOrderSearch] = useState('')
  const [basicPage, setBasicPage] = useState(1)
  const [searchOnlyPage, setSearchOnlyPage] = useState(1)
  const [userPage, setUserPage] = useState(1)
  const [orderPage, setOrderPage] = useState(1)
  const [basicPageSize, setBasicPageSize] = useState(10)
  const [searchOnlyPageSize, setSearchOnlyPageSize] = useState(8)
  const [userPageSize, setUserPageSize] = useState(5)
  const [orderPageSize, setOrderPageSize] = useState(5)

  const basicColumns = [
    { label: 'Name' },
    { label: 'Position' },
    { label: 'Office' },
    { label: 'Age' },
    { label: 'Start Date' },
    { label: 'Salary' },
  ]

  const searchOnlyColumns = [
    { label: 'Product' },
    { label: 'Category' },
    { label: 'Price' },
    { label: 'Stock' },
  ]

  const userColumns = [
    { label: 'User' },
    { label: 'Email' },
    { label: 'Role' },
    { label: 'Status' },
    { label: 'Joined' },
    { label: 'Actions', sortable: false },
  ]

  const orderColumns = [
    { label: 'Order ID' },
    { label: 'Customer' },
    { label: 'Product' },
    { label: 'Amount' },
    { label: 'Date' },
    { label: 'Status' },
    { label: 'Actions', sortable: false },
  ]

  return (
    <div className="main-content page-tables-datatables">
      <div className="page-header">
        <h1 className="page-title">DataTables</h1>
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-item">Home</Link>
          <span className="breadcrumb-item">Tables</span>
          <span className="breadcrumb-item active">DataTables</span>
        </nav>
      </div>

      <SectionCard
        title="Basic DataTable"
        subtitle="Search, pagination, and column sorting with React state"
      >
        <PaginatedTable
          rows={basicRows}
          columns={basicColumns}
          pageSize={basicPageSize}
          search={basicSearch}
          onSearch={setBasicSearch}
          page={basicPage}
          setPage={setBasicPage}
          setPageSize={setBasicPageSize}
          sortable
        />
      </SectionCard>

      <div className="row g-4 mb-1">
        <div className="col-lg-6">
          <SectionCard title="Fixed Columns" subtitle="Compact action column, sortable name and city columns">
            <PaginatedTable
              rows={[
                ['Unity Butler', '5384', 'San Francisco', <button className="btn btn-sm btn-primary" type="button">View</button>],
                ['Howard Hatfield', '7198', 'London', <button className="btn btn-sm btn-primary" type="button">View</button>],
                ['Hope Fuentes', '6318', 'San Francisco', <button className="btn btn-sm btn-primary" type="button">View</button>],
                ['Vivian Harrell', '9422', 'Edinburgh', <button className="btn btn-sm btn-primary" type="button">View</button>],
                ['Timothy Mooney', '7580', 'Tokyo', <button className="btn btn-sm btn-primary" type="button">View</button>],
                ['Jackson Bradshaw', '1042', 'New York', <button className="btn btn-sm btn-primary" type="button">View</button>],
                ['Olivia Liang', '2120', 'Singapore', <button className="btn btn-sm btn-primary" type="button">View</button>],
                ['Bruno Nash', '6222', 'London', <button className="btn btn-sm btn-primary" type="button">View</button>],
              ]}
              columns={[
                { label: 'Name' },
                { label: 'Ext.' },
                { label: 'City' },
                { label: 'Action', sortable: false },
              ]}
              pageSize={6}
              search={''}
              onSearch={() => {}}
              page={1}
              setPage={() => {}}
              setPageSize={() => {}}
              sortable
            />
          </SectionCard>
        </div>

        <div className="col-lg-6">
          <SectionCard title="Search Only" subtitle="Searchable table without pagination controls">
            <PaginatedTable
              rows={productRows}
              columns={searchOnlyColumns}
              pageSize={searchOnlyPageSize}
              search={searchOnlySearch}
              onSearch={setSearchOnlySearch}
              page={searchOnlyPage}
              setPage={setSearchOnlyPage}
              setPageSize={setSearchOnlyPageSize}
              sortable
            />
          </SectionCard>
        </div>
      </div>

      <SectionCard
        title="User Management DataTable"
        subtitle="Manage users with avatars, roles, and status indicators"
        actions={<button className="btn btn-primary btn-sm" type="button"><i className="bi bi-plus-lg me-1" /> Add User</button>}
      >
        <div className="table-responsive">
          <div className="mb-3">
            <div className="users-search" style={{ maxWidth: '360px', width: '100%' }}>
              <i className="bi bi-search" />
              <input
                type="text"
                placeholder="Search users..."
                value={userSearch}
                onChange={(event) => setUserSearch(event.target.value)}
              />
            </div>
          </div>
          <table className="table align-middle">
            <thead>
              <tr>
                {userColumns.map((column) => (
                  <th key={column.label}>{column.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {userRows
                .filter((row) => row.some((cell) => String(cell).toLowerCase().includes(userSearch.trim().toLowerCase())))
                .slice((userPage - 1) * userPageSize, userPage * userPageSize)
                .map((row) => (
                  <tr key={row[0]}>
                    <td>
                      <div className="table-user">
                        <div className="table-user-avatar rounded-circle d-inline-flex align-items-center justify-content-center bg-primary-subtle text-primary fw-semibold" style={{ width: '40px', height: '40px' }}>
                          {row[0].split(' ').map((part) => part[0]).join('').slice(0, 2)}
                        </div>
                        <div className="table-user-name">{row[0]}</div>
                      </div>
                    </td>
                    <td>{row[1]}</td>
                    <td><span className="badge badge-soft-primary">{row[2]}</span></td>
                    <td>
                      <span className={`badge ${row[3] === 'Active' ? 'badge-soft-success' : row[3] === 'Pending' ? 'badge-soft-warning' : 'badge-soft-danger'}`}>{row[3]}</span>
                    </td>
                    <td>{row[4]}</td>
                    <td>
                      <div className="table-actions">
                        <button className="btn btn-icon btn-sm btn-light" type="button" title="Edit"><i className="bi bi-pencil" /></button>
                        <button className="btn btn-icon btn-sm btn-light" type="button" title="Delete"><i className="bi bi-trash" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mt-3">
          <div className="text-muted small">Showing {Math.min(userRows.length, (userPage - 1) * userPageSize + 1)}-{Math.min(userRows.length, userPage * userPageSize)} of {userRows.length}</div>
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className={`page-item ${userPage === 1 ? 'disabled' : ''}`}>
                <button type="button" className="page-link" onClick={() => setUserPage((value) => Math.max(1, value - 1))}><i className="bi bi-chevron-left" /></button>
              </li>
              {Array.from({ length: Math.ceil(userRows.length / userPageSize) }, (_, index) => index + 1).map((value) => (
                <li className={`page-item ${userPage === value ? 'active' : ''}`} key={value}>
                  <button type="button" className="page-link" onClick={() => setUserPage(value)}>{value}</button>
                </li>
              ))}
              <li className={`page-item ${userPage >= Math.ceil(userRows.length / userPageSize) ? 'disabled' : ''}`}>
                <button type="button" className="page-link" onClick={() => setUserPage((value) => Math.min(Math.ceil(userRows.length / userPageSize), value + 1))}><i className="bi bi-chevron-right" /></button>
              </li>
            </ul>
          </nav>
        </div>
      </SectionCard>

      <SectionCard
        title="Order Management DataTable"
        subtitle="Track and manage customer orders"
        actions={
          <div className="d-flex gap-2">
            <button className="btn btn-outline-secondary btn-sm" type="button">
              <i className="bi bi-download me-1" /> Export
            </button>
            <button className="btn btn-primary btn-sm" type="button">
              <i className="bi bi-plus-lg me-1" /> New Order
            </button>
          </div>
        }
      >
        <PaginatedTable
          rows={orderRows.map((row) => [
            <a href="#" className="fw-medium" onClick={(event) => event.preventDefault()}>{row[0]}</a>,
            row[1],
            row[2],
            row[3],
            row[4],
            <span
              className={`badge ${row[5] === 'Delivered' ? 'badge-soft-success' : row[5] === 'Processing' ? 'badge-soft-warning' : row[5] === 'Shipped' ? 'badge-soft-info' : row[5] === 'Cancelled' ? 'badge-soft-danger' : 'badge-soft-secondary'}`}
            >
              {row[5]}
            </span>,
            <div className="table-actions">
              <button className="btn btn-icon btn-sm btn-light" type="button" title="View"><i className="bi bi-eye" /></button>
              <button className="btn btn-icon btn-sm btn-light" type="button" title="Edit"><i className="bi bi-pencil" /></button>
            </div>,
          ])}
          columns={orderColumns}
          pageSize={orderPageSize}
          search={orderSearch}
          onSearch={setOrderSearch}
          page={orderPage}
          setPage={setOrderPage}
          setPageSize={setOrderPageSize}
          sortable
        />
      </SectionCard>
    </div>
  )
}

export default TablesDataTablesPage
