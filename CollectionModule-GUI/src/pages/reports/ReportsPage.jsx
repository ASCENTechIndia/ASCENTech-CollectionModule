import { BarChart3, Grid2X2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <BarChart3 size={48} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Coming Soon</h2>
          <p className="text-gray-600">Reports page template. Implement with Charts component.</p>

          <div className="mt-6 flex justify-center gap-3">
            <Link
              to="/reports/demo-grid"
              className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700"
            >
              <Grid2X2 size={16} />
              Open Demo Grid Report
            </Link>
            <Link
              to="/reports/demo-grid-tailwind"
              className="inline-flex items-center gap-2 rounded-lg border border-primary-300 bg-white px-4 py-2.5 text-sm font-semibold text-primary-700 transition hover:bg-primary-50"
            >
              <Grid2X2 size={16} />
              Open Tailwind Grid
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
