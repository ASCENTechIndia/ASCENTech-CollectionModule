import { MapPin } from 'lucide-react'

export default function BranchListPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Branch Management</h1>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <MapPin size={48} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Coming Soon</h2>
          <p className="text-gray-600">Branch management page template. Implement with DataTable component.</p>
        </div>
      </div>
    </div>
  )
}
