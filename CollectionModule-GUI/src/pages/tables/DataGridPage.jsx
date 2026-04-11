import { useState } from 'react'
import { Card, Badge, Button } from '../../components/ui'
import { Search, Download, Filter, ChevronDown } from 'lucide-react'

// Sample data similar to your image
const TABLE_DATA = [
  {
    id: 1,
    zoneName: 'Chandigarh Zone',
    notVisits: 18600,
    notVisitsPercent: '526.46',
    paidCount: 2309,
    paidPercent: '11.8763',
    fullyPaid: 1861,
    fullyPaidPercent: '10.0054',
    partialCount: 348,
    partialPaidPercent: '1.8710',
    unpaidCount: 16375,
    unpaidPercent: '88.0376',
    npaCount: 16,
    npaPercent: '0.0860',
    allocationAmount: '10236182656.56',
    notDummyBranches: '3.44',
    inCountColumns: {
      paidAmount: 0,
      paidPercent: 0,
      fullyPaidAmount: 0,
      fullyPaidPercent: 0,
      partialAmount: 0,
      partialPercent: 0,
      unpaidAmount: 0,
      unpaidPercent: 0,
      npaAmount: 0,
      npaPercent: 0,
    }
  },
  {
    id: 2,
    zoneName: 'Delhi Zone',
    notVisits: 25411,
    notVisitsPercent: '531.83',
    paidCount: 2591,
    paidPercent: '10.1964',
    fullyPaid: 2250,
    fullyPaidPercent: '8.8544',
    partialCount: 341,
    partialPaidPercent: '1.3419',
    unpaidCount: 27820,
    unpaidPercent: '89.8036',
    npaCount: 0,
    npaPercent: '0',
    allocationAmount: '13057830112.65',
    notDummyBranches: '4.39',
    inCountColumns: {
      paidAmount: 0,
      paidPercent: 0,
      fullyPaidAmount: 0,
      fullyPaidPercent: 0,
      partialAmount: 0,
      partialPercent: 0,
      unpaidAmount: 0,
      unpaidPercent: 0,
      npaAmount: 0,
      npaPercent: 0,
    }
  },
  {
    id: 3,
    zoneName: 'Mumbai Zone',
    notVisits: 8050,
    notVisitsPercent: '576.65',
    paidCount: 571,
    paidPercent: '7.0932',
    fullyPaid: 450,
    fullyPaidPercent: '5.5901',
    partialCount: 121,
    partialPaidPercent: '1.5031',
    unpaidCount: 7479,
    unpaidPercent: '92.9068',
    npaCount: 0,
    npaPercent: '0',
    allocationAmount: '636559241.18',
    notDummyBranches: '0.21',
    inCountColumns: {
      paidAmount: 0,
      paidPercent: 0,
      fullyPaidAmount: 0,
      fullyPaidPercent: 0,
      partialAmount: 0,
      partialPercent: 0,
      unpaidAmount: 0,
      unpaidPercent: 0,
      npaAmount: 0,
      npaPercent: 0,
    }
  },
]

export default function DataGridPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredData, setFilteredData] = useState(TABLE_DATA)
  const [showFilters, setShowFilters] = useState(false)

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    const filtered = TABLE_DATA.filter(item =>
      item.zoneName.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredData(filtered)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Data Grid</h1>
        </div>

        {/* Search and Filters Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by zone name..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Filter size={18} />
                Filters
              </button>
            </div>
            {showFilters && (
              <div className="flex gap-2 pt-2 border-t border-gray-200">
                <Badge variant="primary" className="cursor-pointer">High Value</Badge>
                <Badge variant="secondary" className="cursor-pointer">Pending</Badge>
                <Badge variant="outline" className="cursor-pointer">Verified</Badge>
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Header */}
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 sticky left-0 bg-gray-50 z-10 border-r border-gray-200">Zone Name</th>
                
                {/* In Count Section */}
                <th colSpan="10" className="px-6 py-4 text-center text-sm font-semibold text-gray-900 border-r border-gray-200">
                  In Count
                </th>
                
                {/* In Value Section */}
                <th colSpan="10" className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                  In Value
                </th>
              </tr>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 sticky left-0 bg-gray-50 z-10 border-r border-gray-200"></th>
                
                {/* Count Headers */}
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 border-r border-gray-100">Not Visits</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 border-r border-gray-100">Not Visits %</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 border-r border-gray-100">Paid C</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 border-r border-gray-100">Paid %</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 border-r border-gray-100">Fully Paid</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 border-r border-gray-100">Fully Paid %</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 border-r border-gray-100">Partial Count</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 border-r border-gray-100">Partial %</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 border-r border-gray-100">Unpaid Count</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 border-r border-gray-200">NPA Count</th>
                
                {/* Value Headers */}
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 border-r border-gray-100">Allocation</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 border-r border-gray-100">Paid Amount</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 border-r border-gray-100">Paid %</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 border-r border-gray-100">Fully Paid Amount</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 border-r border-gray-100">Fully Paid %</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 border-r border-gray-100">Partial Amount</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 border-r border-gray-100">Partial %</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 border-r border-gray-100">Unpaid Amount</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 border-r border-gray-100">Unpaid %</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">NPA %</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {filteredData.map((row, idx) => (
                <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 sticky left-0 bg-white hover:bg-gray-50 z-10 border-r border-gray-200">
                    {row.zoneName}
                  </td>
                  
                  {/* Count Values */}
                  <td className="px-4 py-4 text-center text-sm text-gray-700 border-r border-gray-100">{row.notVisits.toLocaleString()}</td>
                  <td className="px-4 py-4 text-center text-sm text-gray-700 border-r border-gray-100">{row.notVisitsPercent}</td>
                  <td className="px-4 py-4 text-center text-sm text-gray-700 border-r border-gray-100">{row.paidCount}</td>
                  <td className="px-4 py-4 text-center text-sm text-gray-700 border-r border-gray-100">{row.paidPercent}</td>
                  <td className="px-4 py-4 text-center text-sm text-gray-700 border-r border-gray-100">{row.fullyPaid}</td>
                  <td className="px-4 py-4 text-center text-sm text-gray-700 border-r border-gray-100">{row.fullyPaidPercent}</td>
                  <td className="px-4 py-4 text-center text-sm text-gray-700 border-r border-gray-100">{row.partialCount}</td>
                  <td className="px-4 py-4 text-center text-sm text-gray-700 border-r border-gray-100">{row.partialPaidPercent}</td>
                  <td className="px-4 py-4 text-center text-sm text-gray-700 border-r border-gray-100">{row.unpaidCount.toLocaleString()}</td>
                  <td className="px-4 py-4 text-center text-sm text-gray-700 border-r border-gray-200">{row.npaCount}</td>
                  
                  {/* Value Values */}
                  <td className="px-4 py-4 text-center text-sm text-gray-700 border-r border-gray-100">{row.allocationAmount}</td>
                  <td className="px-4 py-4 text-center text-sm text-gray-700 border-r border-gray-100">0</td>
                  <td className="px-4 py-4 text-center text-sm text-gray-700 border-r border-gray-100">0</td>
                  <td className="px-4 py-4 text-center text-sm text-gray-700 border-r border-gray-100">0</td>
                  <td className="px-4 py-4 text-center text-sm text-gray-700 border-r border-gray-100">0</td>
                  <td className="px-4 py-4 text-center text-sm text-gray-700 border-r border-gray-100">0</td>
                  <td className="px-4 py-4 text-center text-sm text-gray-700 border-r border-gray-100">0</td>
                  <td className="px-4 py-4 text-center text-sm text-gray-700 border-r border-gray-100">0</td>
                  <td className="px-4 py-4 text-center text-sm text-gray-700 border-r border-gray-100">0</td>
                  <td className="px-4 py-4 text-center text-sm text-gray-700">0</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* No Results */}
        {filteredData.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-gray-500 font-medium">No results found</p>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your search criteria</p>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-sm text-gray-600">
          <span>Showing {filteredData.length} of {TABLE_DATA.length} results</span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-white transition-colors text-gray-700">← Previous</button>
            <span className="px-3 py-1">1</span>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-white transition-colors text-gray-700">Next →</button>
          </div>
        </div>
        </div>

        {/* Legend */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Column Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-blue-600 mb-2 flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-200 rounded"></div>
                In Count Section
              </h4>
              <p className="text-sm text-gray-600">Shows the number of transactions in different statuses (Paid, Pending, Unpaid, NPA)</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-green-600 mb-2 flex items-center gap-2">
                <div className="w-3 h-3 bg-green-200 rounded"></div>
                In Value Section
              </h4>
              <p className="text-sm text-gray-600">Shows the monetary values corresponding to each transaction status</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
