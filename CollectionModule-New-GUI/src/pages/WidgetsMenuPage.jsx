import { useParams } from 'react-router-dom'
import WidgetsCardsPage from './WidgetsCardsPage'
import WidgetsBannersPage from './WidgetsBannersPage'
import WidgetsChartsPage from './WidgetsChartsPage'
import WidgetsAppsPage from './WidgetsAppsPage'
import WidgetsDataPage from './WidgetsDataPage'

const widgetPagesMap = {
  'widgets-cards': WidgetsCardsPage,
  'widgets-banners': WidgetsBannersPage,
  'widgets-charts': WidgetsChartsPage,
  'widgets-apps': WidgetsAppsPage,
  'widgets-data': WidgetsDataPage,
}

function WidgetsMenuPage() {
  const { widgetPage } = useParams()
  const PageComponent = widgetPagesMap[widgetPage]

  if (PageComponent) {
    return <PageComponent />
  }

  if (!widgetPage) {
    return (
      <div className="main-content page-widgets-module">
        <div className="page-header">
          <h1 className="page-title">Widgets</h1>
          <nav className="breadcrumb">
            <span className="breadcrumb-item">Home</span>
            <span className="breadcrumb-item active">Widgets</span>
          </nav>
        </div>
        <div className="card">
          <div className="card-body">
            <p className="mb-0 text-muted">Select a Widgets page from the sidebar.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="main-content page-widgets-module">
      <div className="page-header">
        <h1 className="page-title">Widgets</h1>
        <nav className="breadcrumb">
          <span className="breadcrumb-item">Home</span>
          <span className="breadcrumb-item">Widgets</span>
          <span className="breadcrumb-item active">Not Found</span>
        </nav>
      </div>
      <div className="card">
        <div className="card-body">
          <p className="mb-0 text-muted">Select a Widgets page from the sidebar.</p>
        </div>
      </div>
    </div>
  )
}

export default WidgetsMenuPage
