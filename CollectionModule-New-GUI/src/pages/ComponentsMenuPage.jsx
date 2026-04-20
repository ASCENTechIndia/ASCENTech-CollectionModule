import { Link, useParams } from 'react-router-dom'
import ComponentsAccordionPage from './components/ComponentsAccordionPage'
import ComponentsAlertsPage from './components/ComponentsAlertsPage'
import ComponentsBadgesPage from './components/ComponentsBadgesPage'
import ComponentsBreadcrumbsPage from './components/ComponentsBreadcrumbsPage'
import ComponentsButtonsPage from './components/ComponentsButtonsPage'
import ComponentsCardsPage from './components/ComponentsCardsPage'
import ComponentsCarouselPage from './components/ComponentsCarouselPage'
import ComponentsDropdownsPage from './components/ComponentsDropdownsPage'
import ComponentsListGroupPage from './components/ComponentsListGroupPage'
import ComponentsModalPage from './components/ComponentsModalPage'
import ComponentsNavTabsPage from './components/ComponentsNavTabsPage'
import ComponentsOffcanvasPage from './components/ComponentsOffcanvasPage'
import ComponentsPaginationPage from './components/ComponentsPaginationPage'
import ComponentsPopoversPage from './components/ComponentsPopoversPage'
import ComponentsProgressPage from './components/ComponentsProgressPage'
import ComponentsSpinnersPage from './components/ComponentsSpinnersPage'
import ComponentsToastsPage from './components/ComponentsToastsPage'
import ComponentsTooltipsPage from './components/ComponentsTooltipsPage'

const componentPages = {
  'accordion': ComponentsAccordionPage,
  'alerts': ComponentsAlertsPage,
  'badges': ComponentsBadgesPage,
  'breadcrumbs': ComponentsBreadcrumbsPage,
  'buttons': ComponentsButtonsPage,
  'cards': ComponentsCardsPage,
  'carousel': ComponentsCarouselPage,
  'dropdowns': ComponentsDropdownsPage,
  'list-group': ComponentsListGroupPage,
  'modal': ComponentsModalPage,
  'nav-tabs': ComponentsNavTabsPage,
  'offcanvas': ComponentsOffcanvasPage,
  'pagination': ComponentsPaginationPage,
  'popovers': ComponentsPopoversPage,
  'progress': ComponentsProgressPage,
  'spinners': ComponentsSpinnersPage,
  'toasts': ComponentsToastsPage,
  'tooltips': ComponentsTooltipsPage,
}

function ComponentsMenuPage() {
  const { componentPage } = useParams()
  const PageComponent = componentPages[componentPage]

  if (!PageComponent) {
    return (
      <div className="main-content page-components-module">
        <div className="page-header">
          <h1 className="page-title">Components</h1>
          <nav className="breadcrumb">
            <Link to="/" className="breadcrumb-item">Home</Link>
            <span className="breadcrumb-item active">Components</span>
          </nav>
        </div>
        <div className="card">
          <div className="card-body">
            <p className="mb-0 text-muted">Select a Components page from the sidebar.</p>
          </div>
        </div>
      </div>
    )
  }

  return <PageComponent />
}

export default ComponentsMenuPage
