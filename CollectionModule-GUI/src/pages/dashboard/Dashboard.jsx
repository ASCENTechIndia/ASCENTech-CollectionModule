import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const DASHBOARD_CARDS = [
  {
    title: 'Daily Visit Dashboard',
    href: '/Dashboard/FrmDailyVisit',
  },
  {
    title: 'Active Agent Dashboard',
    href: '/Dashboard/FrmActiveAgents',
  },
  {
    title: 'Disposition Dashboard',
    href: '/Dashboard/FrmNewDashboard2',
  },
]

const Dashboard = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-[calc(100vh-112px)] bg-gradient-to-br from-gray-50 via-white to-primary-50/40 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-soft backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600">
            Dashboards
          </p>
        </div>

        <div className="flex flex-col gap-4">
        {DASHBOARD_CARDS.map((card) => (
          <button
            key={card.title}
            type="button"
            onClick={() => navigate(card.href)}
            className="group flex w-full items-center justify-between rounded-2xl border border-gray-200 bg-white px-5 py-5 text-left shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-hard focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:px-6"
          >
            <span className="flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600 ring-1 ring-primary-100 transition-colors group-hover:bg-primary-100">
                <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
              <span className="text-base font-semibold text-gray-900 sm:text-lg md:text-xl">
                {card.title}
              </span>
            </span>

            <span className="hidden text-sm font-medium text-primary-600 transition-transform duration-200 group-hover:translate-x-1 sm:inline-flex">
              Open
            </span>
          </button>
        ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard