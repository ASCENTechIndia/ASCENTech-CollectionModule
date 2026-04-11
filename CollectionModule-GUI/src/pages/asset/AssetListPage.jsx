import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Input, Badge } from '../../components/ui'
import { DataTable } from '../../components/tables/DataTable'
import { Search, Plus, Edit, Trash2 } from 'lucide-react'

const MOCK_ASSETS = [
  {
    id: 1,
    name: 'MacBook Pro M1',
    type: 'Laptop',
    serialNumber: 'SN12345',
    status: 'active',
    assignedTo: 'John Doe',
    purchaseDate: '2023-01-15',
  },
  {
    id: 2,
    name: 'iPhone 14 Pro',
    type: 'Mobile',
    serialNumber: 'SN12346',
    status: 'active',
    assignedTo: 'Jane Smith',
    purchaseDate: '2023-06-20',
  },
  {
    id: 3,
    name: 'Dell Monitor 27"',
    type: 'Monitor',
    serialNumber: 'SN12347',
    status: 'maintenance',
    assignedTo: 'Unassigned',
    purchaseDate: '2023-03-10',
  },
]

const COLUMNS = [
  {
    key: 'name',
    label: 'Asset Name',
    sortable: true,
  },
  {
    key: 'type',
    label: 'Type',
    sortable: true,
  },
  {
    key: 'serialNumber',
    label: 'Serial Number',
  },
  {
    key: 'status',
    label: 'Status',
    render: (value) => (
      <Badge
        variant={
          value === 'active'
            ? 'success'
            : value === 'maintenance'
            ? 'warning'
            : 'danger'
        }
      >
        {value.charAt(0).toUpperCase() + value.slice(1)}
      </Badge>
    ),
  },
  {
    key: 'assignedTo',
    label: 'Assigned To',
    sortable: true,
  },
  {
    key: 'purchaseDate',
    label: 'Purchase Date',
    sortable: true,
  },
]

export default function AssetListPage() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [data, setData] = useState(MOCK_ASSETS)

  const filteredData = data.filter((asset) =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = (assetId) => {
    if (window.confirm('Are you sure you want to delete this asset?')) {
      setData(data.filter((asset) => asset.id !== assetId))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Asset Management</h1>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="mb-6">
            <div className="relative">
              <Search
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <Input
                type="text"
                placeholder="Search assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <DataTable
            columns={[
              ...COLUMNS,
              {
                key: 'actions',
                label: 'Actions',
                render: (_, row) => (
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/assets/${row.id}/edit`)}
                      className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(row.id)}
                      className="p-2 text-danger-600 hover:bg-danger-50 rounded-lg"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ),
              },
            ]}
            data={filteredData}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-sm text-gray-600 font-medium">Total Assets</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{filteredData.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-sm text-gray-600 font-medium">Active Assets</h3>
            <p className="text-3xl font-bold text-success-600 mt-2">
              {filteredData.filter((a) => a.status === 'active').length}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-sm text-gray-600 font-medium">Issues/Maintenance</h3>
            <p className="text-3xl font-bold text-warning-600 mt-2">
              {filteredData.filter((a) => a.status !== 'active').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
